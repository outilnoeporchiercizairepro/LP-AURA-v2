import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Copy, Plus, Trash2, ExternalLink, CheckCircle, ChevronDown, ChevronRight, Instagram, Linkedin, Youtube, Facebook, Twitter, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UTMLink {
  id: string;
  short_code: string;
  source_label: string;
  medium_label: string | null;
  campaign_label: string | null;
  term_label: string | null;
  content_label: string | null;
  full_url: string;
  notes: string | null;
  category: 'social' | 'youtube' | null;
  created_at: string;
}

const UTMLinkGenerator: React.FC = () => {
  const [links, setLinks] = useState<UTMLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['social', 'youtube']));
  const [formData, setFormData] = useState({
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
    notes: '',
    category: 'social' as 'social' | 'youtube',
  });

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('utm_links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error loading links:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateShortCode = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const generateLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.source) {
      alert('La source est obligatoire');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const shortCode = generateShortCode();
      const baseUrl = window.location.origin;

      const params = new URLSearchParams();
      params.append('utm_source', shortCode);
      if (formData.medium) params.append('utm_medium', shortCode + 'm');
      if (formData.campaign) params.append('utm_campaign', shortCode + 'c');
      if (formData.term) params.append('utm_term', shortCode + 't');
      if (formData.content) params.append('utm_content', shortCode + 'x');

      const fullUrl = `${baseUrl}/?${params.toString()}`;

      const { error } = await supabase.from('utm_links').insert({
        short_code: shortCode,
        source_label: formData.source,
        medium_label: formData.medium || null,
        campaign_label: formData.campaign || null,
        term_label: formData.term || null,
        content_label: formData.content || null,
        full_url: fullUrl,
        notes: formData.notes || null,
        category: formData.category,
        created_by: user.id,
      });

      if (error) throw error;

      setFormData({
        source: '',
        medium: '',
        campaign: '',
        term: '',
        content: '',
        notes: '',
        category: 'social',
      });
      setShowForm(false);
      loadLinks();
    } catch (error) {
      console.error('Error generating link:', error);
      alert('Erreur lors de la génération du lien');
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm('Supprimer ce lien ?')) return;

    try {
      const { error } = await supabase.from('utm_links').delete().eq('id', id);
      if (error) throw error;
      loadLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (category: 'social' | 'youtube') => {
    if (category === 'youtube') return <Youtube className="w-5 h-5 text-red-500" />;
    return <Share2 className="w-5 h-5 text-blue-400" />;
  };

  const groupedLinks = {
    social: links.filter(link => link.category === 'social' || !link.category),
    youtube: links.filter(link => link.category === 'youtube'),
  };

  if (loading) {
    return (
      <div className="bg-card border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Générateur de liens UTM</h3>
          <p className="text-sm text-gray-400">Créez des liens trackés avec des codes anonymes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Nouveau lien
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={generateLink}
            className="mb-6 p-4 bg-surface rounded-lg border border-slate-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Catégorie *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'social' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      formData.category === 'social'
                        ? 'bg-blue-500/20 border-2 border-blue-500 text-blue-400'
                        : 'bg-slate-800 border-2 border-slate-700 text-gray-400 hover:border-slate-600'
                    }`}
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">Réseaux Sociaux</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'youtube' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      formData.category === 'youtube'
                        ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                        : 'bg-slate-800 border-2 border-slate-700 text-gray-400 hover:border-slate-600'
                    }`}
                  >
                    <Youtube className="w-5 h-5" />
                    <span className="font-medium">Vidéos YouTube</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Source * <span className="text-xs text-gray-500">(ex: instagram-baptiste, youtube-imrane)</span>
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder={formData.category === 'youtube' ? 'youtube-imrane' : 'instagram-baptiste'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Medium <span className="text-xs text-gray-500">(ex: social, email, cpc)</span>
                </label>
                <input
                  type="text"
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="post-organique"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Campagne <span className="text-xs text-gray-500">(ex: lancement-2024)</span>
                </label>
                <input
                  type="text"
                  value={formData.campaign}
                  onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="promo-noel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Terme <span className="text-xs text-gray-500">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={formData.term}
                  onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="mot-clé"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contenu <span className="text-xs text-gray-500">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="variante-a"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes <span className="text-xs text-gray-500">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="Notes internes"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
              >
                Générer le lien
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {links.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <ExternalLink className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucun lien généré pour le moment</p>
          <p className="text-sm mt-1">Créez votre premier lien UTM anonyme</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(['social', 'youtube'] as const).map((category) => {
            const categoryLinks = groupedLinks[category];
            const isExpanded = expandedCategories.has(category);
            const categoryLabel = category === 'social' ? 'Réseaux Sociaux' : 'Vidéos YouTube';

            if (categoryLinks.length === 0) return null;

            return (
              <div key={category} className="border border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(category)}
                    <span className="text-white font-semibold">{categoryLabel}</span>
                    <span className="px-2 py-0.5 bg-slate-700 text-gray-300 text-xs rounded-full">
                      {categoryLinks.length}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-slate-900/30 space-y-3">
                        {categoryLinks.map((link) => (
                          <motion.div
                            key={link.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-surface rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-mono text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                                    {link.short_code}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    {new Date(link.created_at).toLocaleDateString('fr-FR', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                                  <div>
                                    <span className="text-xs text-gray-500">Source:</span>
                                    <p className="text-sm text-white truncate">{link.source_label}</p>
                                  </div>
                                  {link.medium_label && (
                                    <div>
                                      <span className="text-xs text-gray-500">Medium:</span>
                                      <p className="text-sm text-white truncate">{link.medium_label}</p>
                                    </div>
                                  )}
                                  {link.campaign_label && (
                                    <div>
                                      <span className="text-xs text-gray-500">Campagne:</span>
                                      <p className="text-sm text-white truncate">{link.campaign_label}</p>
                                    </div>
                                  )}
                                </div>

                                {link.notes && (
                                  <p className="text-xs text-gray-400 italic mb-2">{link.notes}</p>
                                )}

                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={link.full_url}
                                    readOnly
                                    className="flex-1 px-3 py-1.5 bg-card border border-slate-700 rounded text-xs text-gray-300 font-mono"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => copyToClipboard(link.full_url, link.id)}
                                  className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors relative"
                                  title="Copier le lien"
                                >
                                  {copied === link.id ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => deleteLink(link.id)}
                                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-400 mb-2">Comment ça marche ?</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Les liens générés utilisent des codes courts anonymes (ex: a1b2c3)</li>
          <li>• Personne ne peut deviner la source réelle en regardant l'URL</li>
          <li>• Dans le dashboard, vous verrez les vraies valeurs que vous avez définies</li>
          <li>• Partagez ces liens sur vos réseaux sociaux, emails, etc.</li>
        </ul>
      </div>
    </div>
  );
};

export default UTMLinkGenerator;
