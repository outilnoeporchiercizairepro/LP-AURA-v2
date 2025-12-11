import { useEffect } from 'react';
import { useTracking } from '../contexts/TrackingContext';

export const useTrackClicks = () => {
  const { trackClick } = useTracking();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        const element = (target.closest('a') || target.closest('button') || target) as HTMLElement;
        const elementId = element.id || element.className || 'unknown';
        const elementText = element.textContent?.trim() || '';
        const elementType = element.tagName.toLowerCase();

        trackClick(elementId, elementText, elementType);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [trackClick]);
};
