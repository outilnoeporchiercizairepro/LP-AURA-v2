import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MousePointer, Clock, ExternalLink, Users } from 'lucide-react';
import UTMLinkGenerator from './UTMLinkGenerator';

interface AnalyticsData {
  totalClicks: number;
  totalSessions: number;
  averageDuration: number;
  utmSources: Array<{ source: string; count: number }>;
  topClicks: Array<{ text: string; count: number; type: string }>;
  recentSessions: Array<{
    entry_page: string;
    utm_source: string;
    utm_campaign: string;
    total_duration: number;
    bounce: boolean;
    created_at: string;
  }>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData>({
    totalClicks: 0,
    totalSessions: 0,
    averageDuration: 0,
    utmSources: [],
    topClicks: [],
    recentSessions: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);
  const [utmMappings, setUtmMappings] = useState<Record<string, any>>({});

  const decodeUtmValue = (code: string | null, type: 'source' | 'medium' | 'campaign' = 'source'): string => {
    if (!code) return '-';

    const baseCode = code.replace(/[mctx]$/, '');

    if (utmMappings[baseCode]) {
      return utmMappings[baseCode][type] || code;
    }

    return code;
  };

  useEffect(() => {
    const loadUtmMappings = async () => {
      try {
        const { data: links } = await supabase.from('utm_links').select('*');
        const mappings: Record<string, any> = {};

        links?.forEach(link => {
          mappings[link.short_code] = {
            source: link.source_label,
            medium: link.medium_label,
            campaign: link.campaign_label,
            term: link.term_label,
            content: link.content_label,
          };
        });

        setUtmMappings(mappings);
      } catch (error) {
        console.error('Error loading UTM mappings:', error);
      }
    };

    loadUtmMappings();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      console.log('Fetching analytics for date range:', dateRange, 'days, starting from:', startDate.toISOString());

      try {
        const { data: pageViews } = await supabase
          .from('page_views')
          .select('*')
          .gte('created_at', startDate.toISOString());

        const { data: sessions } = await supabase
          .from('session_data')
          .select('*')
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: false });

        const { data: clicks } = await supabase
          .from('click_events')
          .select('*')
          .gte('created_at', startDate.toISOString())
          .not('page_path', 'like', '/admin%');

        console.log('Fetched:', pageViews?.length, 'page views,', sessions?.length, 'sessions,', clicks?.length, 'clicks');

        const totalClicks = clicks?.length || 0;
        const totalSessions = sessions?.length || 0;

        const avgDuration = sessions?.reduce((acc, s) => acc + (s.total_duration || 0), 0) / (totalSessions || 1);

        const utmSourceCount: Record<string, number> = {};
        pageViews?.forEach(pv => {
          if (pv.utm_source) {
            utmSourceCount[pv.utm_source] = (utmSourceCount[pv.utm_source] || 0) + 1;
          }
        });
        const utmSources = Object.entries(utmSourceCount)
          .sort(([, a], [, b]) => b - a)
          .map(([source, count]) => ({ source, count }));

        const clickCount: Record<string, { count: number; type: string }> = {};
        clicks?.forEach(click => {
          const key = click.element_text || 'Unknown';
          if (!clickCount[key]) {
            clickCount[key] = { count: 0, type: click.element_type };
          }
          clickCount[key].count += 1;
        });
        const topClicks = Object.entries(clickCount)
          .sort(([, a], [, b]) => b.count - a.count)
          .slice(0, 10)
          .map(([text, { count, type }]) => ({ text, count, type }));

        setData({
          totalClicks,
          totalSessions,
          averageDuration: Math.round(avgDuration),
          utmSources,
          topClicks,
          recentSessions: sessions?.slice(0, 10) || [],
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Suivi des visites et des conversions</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value={1}>Aujourd'hui</option>
            <option value={7}>7 derniers jours</option>
            <option value={30}>30 derniers jours</option>
            <option value={90}>90 derniers jours</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MousePointer className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Clics totaux</h3>
            <p className="text-3xl font-bold text-white">{data.totalClicks}</p>
          </div>

          <div className="bg-card border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Nombre de sessions</h3>
            <p className="text-3xl font-bold text-white">{data.totalSessions}</p>
          </div>

          <div className="bg-card border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Durée moyenne</h3>
            <p className="text-3xl font-bold text-white">{formatDuration(data.averageDuration)}</p>
          </div>
        </div>

        <div className="bg-card border border-slate-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Sources UTM</h3>
          <div className="space-y-3">
            {data.utmSources.map((source, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-secondary" />
                  <span className="text-gray-300 font-medium">{decodeUtmValue(source.source, 'source')}</span>
                </div>
                <span className="text-white font-bold">{source.count}</span>
              </div>
            ))}
            {data.utmSources.length === 0 && (
              <p className="text-gray-500 text-sm">Aucune source UTM détectée</p>
            )}
          </div>
        </div>

        <div className="bg-card border border-slate-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Éléments les plus cliqués</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Élément</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Type</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Clics</th>
                </tr>
              </thead>
              <tbody>
                {data.topClicks.map((click, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-surface transition-colors">
                    <td className="py-3 px-4 text-gray-300">{click.text}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        {click.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-white font-semibold">{click.count}</td>
                  </tr>
                ))}
                {data.topClicks.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500 text-sm">
                      Aucun clic enregistré
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Sessions récentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Page d'entrée</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Source</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Campagne</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Durée</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium text-sm">Rebond</th>
                </tr>
              </thead>
              <tbody>
                {data.recentSessions.map((session, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-surface transition-colors">
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {new Date(session.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{session.entry_page}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{decodeUtmValue(session.utm_source, 'source')}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{decodeUtmValue(session.utm_campaign, 'campaign')}</td>
                    <td className="py-3 px-4 text-right text-gray-300 text-sm">
                      {formatDuration(session.total_duration)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {session.bounce ? (
                        <span className="inline-block px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs font-medium">
                          Oui
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium">
                          Non
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {data.recentSessions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500 text-sm">
                      Aucune session enregistrée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <UTMLinkGenerator />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
