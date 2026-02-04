import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MousePointer, Clock, ExternalLink, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  timeSeriesData: Array<{
    date: string;
    clicks: number;
    sessions: number;
    avgDuration: number;
    displayLabel: string;
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
    timeSeriesData: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);
  const [utmMappings, setUtmMappings] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['chart', 'utm', 'clicks', 'sessions'])
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

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
        const { data: links } = await supabase.from('utm_links').select('*');
        const mappings: Record<string, string> = {};
        links?.forEach(link => {
          mappings[link.short_code] = link.source_label || link.short_code;
        });

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
        sessions?.forEach(session => {
          if (session.utm_source) {
            const baseCode = session.utm_source.replace(/[mctx]$/, '');
            const label = mappings[baseCode] || session.utm_source;
            utmSourceCount[label] = (utmSourceCount[label] || 0) + 1;
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

        const timeSeriesMap: Record<string, { clicks: number; sessions: number; durations: number[] }> = {};
        const isToday = dateRange === 1;

        if (isToday) {
          for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, '0');
            timeSeriesMap[hour] = { clicks: 0, sessions: 0, durations: [] };
          }

          clicks?.forEach(click => {
            const clickDate = new Date(click.created_at);
            const hour = clickDate.getHours().toString().padStart(2, '0');
            if (timeSeriesMap[hour]) {
              timeSeriesMap[hour].clicks += 1;
            }
          });

          sessions?.forEach(session => {
            const sessionDate = new Date(session.created_at);
            const hour = sessionDate.getHours().toString().padStart(2, '0');
            if (timeSeriesMap[hour]) {
              timeSeriesMap[hour].sessions += 1;
              timeSeriesMap[hour].durations.push(session.total_duration || 0);
            }
          });

          const timeSeriesData = Object.entries(timeSeriesMap)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([hour, data]) => ({
              date: hour,
              clicks: data.clicks,
              sessions: data.sessions,
              avgDuration: data.durations.length > 0
                ? Math.round(data.durations.reduce((a, b) => a + b, 0) / data.durations.length)
                : 0,
              displayLabel: `${hour}h`,
            }));

          setData({
            totalClicks,
            totalSessions,
            averageDuration: Math.round(avgDuration),
            utmSources,
            topClicks,
            recentSessions: sessions?.slice(0, 10) || [],
            timeSeriesData,
          });
        } else {
          for (let i = 0; i < dateRange; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateKey = date.toISOString().split('T')[0];
            timeSeriesMap[dateKey] = { clicks: 0, sessions: 0, durations: [] };
          }

          clicks?.forEach(click => {
            const dateKey = new Date(click.created_at).toISOString().split('T')[0];
            if (timeSeriesMap[dateKey]) {
              timeSeriesMap[dateKey].clicks += 1;
            }
          });

          sessions?.forEach(session => {
            const dateKey = new Date(session.created_at).toISOString().split('T')[0];
            if (timeSeriesMap[dateKey]) {
              timeSeriesMap[dateKey].sessions += 1;
              timeSeriesMap[dateKey].durations.push(session.total_duration || 0);
            }
          });

          const timeSeriesData = Object.entries(timeSeriesMap)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, data]) => ({
              date,
              clicks: data.clicks,
              sessions: data.sessions,
              avgDuration: data.durations.length > 0
                ? Math.round(data.durations.reduce((a, b) => a + b, 0) / data.durations.length)
                : 0,
              displayLabel: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
            }));

          setData({
            totalClicks,
            totalSessions,
            averageDuration: Math.round(avgDuration),
            utmSources,
            topClicks,
            recentSessions: sessions?.slice(0, 10) || [],
            timeSeriesData,
          });
        }
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

  const TimeSeriesChart: React.FC<{ data: AnalyticsData['timeSeriesData'] }> = ({ data }) => {
    const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number } | null>(null);

    if (data.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          Aucune donnée disponible pour afficher le graphique
        </div>
      );
    }

    const width = 800;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxClicks = Math.max(...data.map(d => d.clicks), 1);
    const maxSessions = Math.max(...data.map(d => d.sessions), 1);
    const maxDuration = Math.max(...data.map(d => d.avgDuration), 1);
    const maxValue = Math.max(maxClicks, maxSessions);
    const ySteps = 5;
    const yStepValue = Math.ceil(maxValue / ySteps);

    const clicksPath = data
      .map((d, i) => {
        const x = padding.left + (i / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - (d.clicks / maxClicks) * chartHeight;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const sessionsPath = data
      .map((d, i) => {
        const x = padding.left + (i / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - (d.sessions / maxSessions) * chartHeight;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    return (
      <div className="overflow-x-auto relative">
        <svg width={width} height={height} className="mx-auto">
          <defs>
            <linearGradient id="clicksGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sessionsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight}
            stroke="rgb(71, 85, 105)"
            strokeWidth="2"
          />

          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke="rgb(71, 85, 105)"
            strokeWidth="2"
          />

          {Array.from({ length: ySteps + 1 }).map((_, i) => {
            const value = yStepValue * i;
            const y = padding.top + chartHeight - (value / (yStepValue * ySteps)) * chartHeight;
            return (
              <g key={i}>
                <line
                  x1={padding.left - 5}
                  y1={y}
                  x2={padding.left + chartWidth}
                  y2={y}
                  stroke="rgb(71, 85, 105)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.3"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="rgb(156, 163, 175)"
                  fontSize="10"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {data.map((d, i) => {
            const x = padding.left + (i / (data.length - 1)) * chartWidth;
            const showLabel = data.length <= 24 ? i % 2 === 0 : i % Math.ceil(data.length / 7) === 0;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={padding.top + chartHeight}
                  x2={x}
                  y2={padding.top + chartHeight + 5}
                  stroke="rgb(71, 85, 105)"
                  strokeWidth="1"
                />
                {showLabel && (
                  <text
                    x={x}
                    y={padding.top + chartHeight + 20}
                    textAnchor="middle"
                    fill="rgb(156, 163, 175)"
                    fontSize="10"
                  >
                    {d.displayLabel}
                  </text>
                )}
              </g>
            );
          })}

          <path
            d={`${clicksPath} L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`}
            fill="url(#clicksGradient)"
          />

          <path
            d={clicksPath}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={sessionsPath}
            fill="none"
            stroke="rgb(236, 72, 153)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((d, i) => {
            const x = padding.left + (i / (data.length - 1)) * chartWidth;
            const yClicks = padding.top + chartHeight - (d.clicks / maxClicks) * chartHeight;
            const ySessions = padding.top + chartHeight - (d.sessions / maxSessions) * chartHeight;
            const isHovered = hoveredPoint?.index === i;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={yClicks}
                  r={isHovered ? 6 : 4}
                  fill="rgb(59, 130, 246)"
                  className="cursor-pointer transition-all"
                  onMouseEnter={(e) => setHoveredPoint({ index: i, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <circle
                  cx={x}
                  cy={ySessions}
                  r={isHovered ? 6 : 4}
                  fill="rgb(236, 72, 153)"
                  className="cursor-pointer transition-all"
                  onMouseEnter={(e) => setHoveredPoint({ index: i, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>

        {hoveredPoint !== null && (
          <div
            className="fixed z-50 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl"
            style={{
              left: `${hoveredPoint.x + 10}px`,
              top: `${hoveredPoint.y - 60}px`,
              pointerEvents: 'none',
            }}
          >
            <div className="text-xs text-gray-400 mb-1">{data[hoveredPoint.index].displayLabel}</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-white">Clics: {data[hoveredPoint.index].clicks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-sm text-white">Sessions: {data[hoveredPoint.index].sessions}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-300">Clics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-pink-500" />
            <span className="text-sm text-gray-300">Sessions</span>
          </div>
        </div>
      </div>
    );
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

        <div className="bg-card border border-slate-800 rounded-xl overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('chart')}
            className="w-full flex items-center justify-between p-6 hover:bg-surface transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Évolution temporelle</h3>
            {expandedSections.has('chart') ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.has('chart') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-slate-800">
                  <TimeSeriesChart data={data.timeSeriesData} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-card border border-slate-800 rounded-xl overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('utm')}
            className="w-full flex items-center justify-between p-6 hover:bg-surface transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Sources UTM</h3>
            {expandedSections.has('utm') ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.has('utm') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-slate-800">
                  <div className="space-y-3">
                    {data.utmSources.map((source, idx) => {
                      const percentage = data.totalSessions > 0
                        ? ((source.count / data.totalSessions) * 100).toFixed(1)
                        : '0';
                      return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-secondary" />
                            <span className="text-gray-300 font-medium">{source.source}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">{percentage}%</span>
                            <span className="text-white font-bold">{source.count}</span>
                          </div>
                        </div>
                      );
                    })}
                    {data.utmSources.length === 0 && (
                      <p className="text-gray-500 text-sm">Aucune source UTM detectee</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-card border border-slate-800 rounded-xl overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('clicks')}
            className="w-full flex items-center justify-between p-6 hover:bg-surface transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Éléments les plus cliqués</h3>
            {expandedSections.has('clicks') ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.has('clicks') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-slate-800">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-card border border-slate-800 rounded-xl overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('sessions')}
            className="w-full flex items-center justify-between p-6 hover:bg-surface transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Sessions récentes</h3>
            {expandedSections.has('sessions') ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.has('sessions') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-slate-800">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <UTMLinkGenerator />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
