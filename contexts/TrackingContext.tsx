import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

interface TrackingContextType {
  trackPageView: (path: string) => void;
  trackClick: (elementId: string, elementText: string, elementType: string) => void;
  sessionId: string;
  getCalendlyUrl: (baseUrl?: string) => string;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within TrackingProvider');
  }
  return context;
};

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId] = useState(() => {
    const existingSession = sessionStorage.getItem('tracking_session_id');
    if (existingSession) return existingSession;

    const newSession = crypto.randomUUID();
    sessionStorage.setItem('tracking_session_id', newSession);
    return newSession;
  });

  const sessionStartTime = useRef(Date.now());
  const lastPagePath = useRef<string>('');
  const pageViewCount = useRef(0);
  const hasInitialized = useRef(false);

  const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || sessionStorage.getItem('utm_source'),
      utm_medium: params.get('utm_medium') || sessionStorage.getItem('utm_medium'),
      utm_campaign: params.get('utm_campaign') || sessionStorage.getItem('utm_campaign'),
      utm_term: params.get('utm_term') || sessionStorage.getItem('utm_term'),
      utm_content: params.get('utm_content') || sessionStorage.getItem('utm_content'),
    };
  };

  const saveUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = params.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
      }
    });
  };

  const initSession = async () => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    saveUTMParams();
    const utmParams = getUTMParams();
    const entryPage = window.location.pathname;

    try {
      await supabase.from('session_data').insert({
        session_id: sessionId,
        entry_page: entryPage,
        session_start: new Date().toISOString(),
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
      });
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  const updateSession = async () => {
    const duration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
    const isBounce = pageViewCount.current <= 1;

    try {
      await supabase
        .from('session_data')
        .update({
          exit_page: lastPagePath.current,
          session_end: new Date().toISOString(),
          total_duration: duration,
          bounce: isBounce,
        })
        .eq('session_id', sessionId);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const trackPageView = async (path: string) => {
    lastPagePath.current = path;
    pageViewCount.current += 1;

    const utmParams = getUTMParams();

    try {
      await supabase.from('page_views').insert({
        session_id: sessionId,
        page_path: path,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const trackClick = async (elementId: string, elementText: string, elementType: string) => {
    try {
      await supabase.from('click_events').insert({
        session_id: sessionId,
        element_id: elementId,
        element_text: elementText,
        element_type: elementType,
        page_path: window.location.pathname,
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const getCalendlyUrl = (baseUrl: string = 'https://calendly.com/aura-academie/30min') => {
    const utmParams = getUTMParams();

    if (utmParams.utm_source) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmParams.utm_source);
      return url.toString();
    }

    return baseUrl;
  };

  useEffect(() => {
    initSession();

    const handleBeforeUnload = () => {
      updateSession();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateSession();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId]);

  return (
    <TrackingContext.Provider value={{ trackPageView, trackClick, sessionId, getCalendlyUrl }}>
      {children}
    </TrackingContext.Provider>
  );
};
