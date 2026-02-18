import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Brain, Zap, Code2, Database, Cpu, Rocket, Shield, TrendingUp, Wrench, BookOpen, Network, Star } from 'lucide-react';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

interface Module {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: string[];
  objective: string;
  isBonus?: boolean;
  isCommunity?: boolean;
}

const modules: Module[] = [
  {
    number: '00',
    title: 'Écosystème Aura',
    subtitle: 'Communauté & accompagnement',
    icon: <Users className="w-5 h-5" />,
    isCommunity: true,
    items: [
      'Coachings de groupe hebdomadaires',
      'Communauté WhatsApp active',
      'Communauté Skool structurée',
      'Accompagnement stratégique continu',
    ],
    objective: 'Évoluer dans un environnement encadré et orienté résultats.',
  },
  {
    number: '01',
    title: 'Onboarding & Méthodologie',
    subtitle: 'Démarrer efficacement',
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      'Comprendre la structure de la formation',
      'Adopter une méthode claire',
      'Organiser son apprentissage',
      'Suivre sa progression',
    ],
    objective: 'Démarrer efficacement dès le premier jour.',
  },
  {
    number: '02',
    title: 'Mindset & Performance',
    subtitle: 'Fondations mentales',
    icon: <Brain className="w-5 h-5" />,
    items: [
      'Discipline et productivité',
      'Gestion de l\'énergie',
      'Résilience face aux obstacles',
      'Du consommateur au créateur',
    ],
    objective: 'Installer une posture d\'exécution durable.',
  },
  {
    number: '03',
    title: 'Fondamentaux de l\'IA',
    subtitle: 'Compréhension stratégique',
    icon: <Cpu className="w-5 h-5" />,
    items: [
      'Fonctionnement de l\'IA',
      'Large Language Models (LLMs)',
      'Données et structuration (JSON)',
      'APIs, Fine-tuning, RAG, MCPs',
    ],
    objective: 'Maîtriser les briques conceptuelles avant la pratique.',
  },
  {
    number: '04',
    title: 'Automatisation avec N8N',
    subtitle: 'Workflows & agents IA',
    icon: <Zap className="w-5 h-5" />,
    items: [
      'Workflows automatisés complets',
      'Intégrations IA avancées',
      'Agents IA autonomes',
      'Projet complet d\'Agent IA',
    ],
    objective: 'Construire des systèmes automatisés exploitables en production.',
  },
  {
    number: '05',
    title: 'Vibecoding & Développement',
    subtitle: 'Interfaces & applications',
    icon: <Code2 className="w-5 h-5" />,
    items: [
      'Logique vibecoding',
      'Création d\'interfaces modernes',
      'Outils spécialisés (Cursor, Bolt…)',
      'Structuration d\'applications',
    ],
    objective: 'Relier IA, automatisation et front-end.',
  },
  {
    number: '06',
    title: 'Base de données – Supabase',
    subtitle: 'Couche data d\'un système IA',
    icon: <Database className="w-5 h-5" />,
    items: [
      'Création et gestion de données',
      'Connexion à N8N',
      'Connexion aux interfaces',
      'Stockage et extensions',
    ],
    objective: 'Structurer la couche data d\'un système complet.',
  },
  {
    number: '07',
    title: 'Infrastructures IA',
    subtitle: 'Assemblage des briques',
    icon: <Network className="w-5 h-5" />,
    items: [
      'IA + Automatisation + BDD + Interface',
      'Cas concrets orientés métiers',
      'Architecture système complète',
      'Patterns d\'intégration avancés',
    ],
    objective: 'Construire un système IA complet de A à Z.',
  },
  {
    number: '08',
    title: 'Déploiement en production',
    subtitle: 'Du prototype au réel',
    icon: <Rocket className="w-5 h-5" />,
    items: [
      'Architecture cible',
      'Sécurité et bonnes pratiques',
      'Scalabilité',
      'Mise en ligne via solution dédiée',
    ],
    objective: 'Rendre un système exploitable dans le monde réel.',
  },
  {
    number: '09',
    title: 'RGPD & Sécurité',
    subtitle: 'Conformité et protection',
    icon: <Shield className="w-5 h-5" />,
    items: [
      'Principes du RGPD',
      'Sécurisation des bases de données',
      'Protection des infrastructures',
      'Conformité réglementaire',
    ],
    objective: 'Construire des systèmes conformes et sécurisés.',
  },
  {
    number: '10',
    title: 'Monétisation',
    subtitle: 'Vendre des systèmes IA',
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      'Niche, offre et pricing',
      'Acquisition clients (Inbound / Outbound)',
      'Positionnement & image de marque',
      'Closing, onboarding, bases fiscales',
    ],
    objective: 'Vendre des systèmes IA de manière structurée et récurrente.',
  },
  {
    number: '11',
    title: 'Boîte à outils IA',
    subtitle: 'Outils complémentaires',
    icon: <Wrench className="w-5 h-5" />,
    items: [
      'Outils de création',
      'Outils de recherche',
      'Outils de développement',
      'Opportunités de monétisation',
    ],
    objective: 'Élargir les possibilités et rester à la pointe.',
  },
  {
    number: '12',
    title: 'Ressources & Contenus',
    subtitle: 'Supports complémentaires',
    icon: <Star className="w-5 h-5" />,
    items: [
      'Replays des sessions live',
      'Ressources téléchargeables',
      'Contenus additionnels',
      'Mises à jour continuelles',
    ],
    objective: 'Accéder à tous les supports pour aller plus loin.',
  },
  {
    number: '13',
    title: 'Audit & Networking',
    subtitle: 'En évolution continue',
    icon: <Network className="w-5 h-5" />,
    isBonus: true,
    items: [
      'Analyser les besoins d\'une entreprise',
      'Identifier des opportunités',
      'Développer son réseau stratégique',
      'Approche consultant senior',
    ],
    objective: 'Devenir un interlocuteur de référence pour les entreprises.',
  },
];

const Content: React.FC = () => {
  const { utmSourceLabel } = useTracking();

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/appel-strategique-ia-15min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

  const [expandAll, setExpandAll] = useState(false);

  return (
    <section id="content" className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
              Programme 2026
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3 flex-wrap">
            Contenu de la formation <img src="/aura.png" alt="AURA" className="inline h-10 md:h-14" />
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            14 modules complets pour concevoir, déployer et vendre des systèmes IA en production
          </p>

          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-primary/60 border border-primary/30" />
              Modules techniques
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-400">
              <div className="w-3 h-3 rounded-full bg-blue-500/60 border border-blue-500/30" />
              Communauté incluse
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <div className="w-3 h-3 rounded-full bg-amber-500/60 border border-amber-500/30" />
              Bonus
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-end mb-4"
        >
          <button
            onClick={() => setExpandAll(!expandAll)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4"
          >
            {expandAll ? 'Tout réduire' : 'Tout développer'}
          </button>
        </motion.div>

        <div className="space-y-3">
          {modules.map((module, idx) => (
            <ExpandableModule key={module.number} module={module} index={idx} forceOpen={expandAll} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <ShinyButton
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Accéder au programme complet
          </ShinyButton>
        </motion.div>
      </div>
    </section>
  );
};

const ExpandableModule: React.FC<{ module: Module; index: number; forceOpen: boolean }> = ({ module, index, forceOpen }) => {
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = forceOpen || localOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
        ${module.isCommunity
          ? 'border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50 hover:bg-blue-500/10'
          : module.isBonus
            ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10'
            : 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700/60 hover:bg-slate-900/60'
        }`}
      onClick={() => setLocalOpen(!localOpen)}
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold
            ${module.isCommunity
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : module.isBonus
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-800/80 text-gray-400 border border-slate-700/50'
            }`}>
            {module.number}
          </div>

          <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
            ${module.isCommunity
              ? 'bg-blue-500/15 text-blue-400'
              : module.isBonus
                ? 'bg-amber-500/15 text-amber-400'
                : 'bg-slate-800/60 text-gray-400 group-hover:text-white transition-colors'
            }`}>
            {module.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-base leading-tight">{module.title}</h3>
              {module.isBonus && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider border border-amber-500/30">
                  Bonus
                </span>
              )}
              {module.isCommunity && (
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-wider border border-blue-500/30">
                  Inclus
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-0.5">{module.subtitle}</p>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-slate-800/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {module.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                        ${module.isCommunity ? 'bg-blue-400' : module.isBonus ? 'bg-amber-400' : 'bg-primary'}`} />
                      {item}
                    </div>
                  ))}
                </div>
                <div className={`flex items-start gap-2 px-3 py-2.5 rounded-xl text-xs
                  ${module.isCommunity
                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                    : module.isBonus
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
                      : 'bg-primary/5 border border-primary/15 text-gray-300'
                  }`}>
                  <span className="font-semibold flex-shrink-0">Objectif :</span>
                  <span className="ml-1">{module.objective}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Content;
