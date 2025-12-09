import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccordionItem {
  title: string;
  description: string;
}

interface TabContent {
  name: string;
  items: AccordionItem[];
}

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tabs: TabContent[] = [
    {
      name: "Roadmap Aura",
      items: [
        { title: "Introduction", description: "Découvre les fondamentaux de la formation et la philosophie AURA pour devenir un opérateur IA complet." },
        { title: "Mindset de l'Early Adopter", description: "Développe la mentalité des pionniers qui réussissent dans l'IA et adoptent les nouvelles technologies avant tout le monde." },
        { title: "Choisir sa compétence IA", description: "Identifie la compétence IA qui correspond le mieux à ton profil et à tes objectifs professionnels." },
        { title: "Infrastructure IA (bases théoriques)", description: "Comprends les fondations techniques de l'IA : modèles, architectures, coûts et bonnes pratiques." },
        { title: "Automatisation (bases théoriques)", description: "Maîtrise les concepts clés de l'automatisation pour optimiser tes processus et ceux de tes clients." },
        { title: "Choix de la niche", description: "Définis ton positionnement unique sur le marché de l'IA pour te démarquer de la concurrence." },
        { title: "Apprentissage de la compétence", description: "Plonge dans l'apprentissage pratique de ta compétence choisie avec des exercices concrets." },
        { title: "Audit d'entreprise", description: "Apprends à auditer les besoins d'une entreprise pour proposer des solutions IA pertinentes." },
        { title: "Setup de l'image de marque", description: "Construis ton identité professionnelle et ta présence en ligne pour attirer tes clients idéaux." },
        { title: "Networking & Réseau d'affaires", description: "Développe ton réseau professionnel et apprends à créer des opportunités business durables." },
        { title: "Offer, Closing & Onboarding Client", description: "Structure ton offre, convertis tes prospects et embarque tes premiers clients de manière professionnelle." },
        { title: "Unboarding Client", description: "Gère la fin de mission de façon élégante pour maximiser les recommandations et les reconductions." },
        { title: "Fiscalité & Juridique", description: "Comprends les aspects légaux et fiscaux pour sécuriser ton activité d'opérateur IA." }
      ]
    },
    {
      name: "Infrastructure IA & Automatisation",
      items: [
        { title: "N8n de débutant à expert", description: "Maîtrise n8n de zéro jusqu'aux workflows les plus complexes avec des cas d'usage réels." },
        { title: "Automatisations IA avancées", description: "Crée des automatisations intelligentes qui combinent plusieurs IA et outils pour maximiser l'impact." },
        { title: "Création d'interfaces personnalisées pour IA", description: "Développe des interfaces sur-mesure pour rendre tes solutions IA accessibles et intuitives." },
        { title: "Intégration de bases de données (SQL / NoSQL / Vector DB)", description: "Connecte tes systèmes IA à des bases de données performantes pour gérer l'information à grande échelle." },
        { title: "Déploiement chez un client", description: "Déploie tes solutions chez un client en production avec les bonnes pratiques de sécurité et de maintenance." },
        { title: "Use Case complet : création d'un système IA de A à Z", description: "Réalise un projet complet de bout en bout : de la conception au déploiement d'un système IA professionnel." }
      ]
    },
    {
      name: "Vibe Coding & Développement",
      items: [
        { title: "Introduction au Vibe Coding", description: "Découvre cette approche moderne du développement assisté par IA pour coder 10x plus vite." },
        { title: "Apprentissage du développement moderne", description: "Maîtrise les bases du développement web moderne nécessaires pour créer des applications IA complètes." },
        { title: "Utilisation de Cursor et outils IA pour coder", description: "Exploite la puissance de Cursor et des assistants IA pour accélérer ton développement." },
        { title: "Compréhension des langages (JS/TS, Python, Node, etc.)", description: "Comprends les langages essentiels utilisés dans l'écosystème IA et savoir quand les utiliser." },
        { title: "MCP Server et protocoles modernes", description: "Implémente des serveurs MCP et comprends les protocoles de communication modernes pour l'IA." },
        { title: "Création d'infrastructures IA personnalisées", description: "Construis des architectures IA sur-mesure adaptées aux besoins spécifiques de tes clients." },
        { title: "Développement de micro-SaaS IA", description: "Lance ton propre micro-SaaS IA en utilisant les compétences acquises tout au long de la formation." },
        { title: "Fondamentaux IA avancés (RAG, Reasoning, Fine-tuning)", description: "Maîtrise les techniques avancées comme le RAG, le reasoning et le fine-tuning pour des solutions IA premium." }
      ]
    },
    {
      name: "Live Coaching de Groupe & Espace Communautaire",
      items: [
        { title: "Sessions de Coaching Hebdomadaires", description: "Participe à des sessions live avec la team AURA pour progresser rapidement et rester motivé." },
        { title: "Appels de groupe en direct", description: "Rejoins les calls de groupe pour échanger avec les autres membres et apprendre collectivement." },
        { title: "Travail sur cas réels et accompagnement personnalisé", description: "Bénéficie d'un accompagnement personnalisé sur tes projets et défis concrets." },
        { title: "Résolution de Problèmes Techniques", description: "Obtiens de l'aide en live pour débloquer tes problèmes techniques et avancer sans friction." },
        { title: "Débogage en live", description: "Résous tes bugs en temps réel avec l'aide des experts AURA et de la communauté." },
        { title: "Accompagnement sur les projets des membres", description: "Reçois du feedback et des conseils sur tes projets pour les amener au niveau supérieur." },
        { title: "Analyse de Cas IA & Automatisation", description: "Étudie des cas réels d'implémentation IA et automatisation pour enrichir ta compréhension." },
        { title: "Études de cas réels analysés en direct", description: "Décortique des projets IA réels pour comprendre les décisions techniques et business." },
        { title: "Accès Communautaire Discord", description: "Rejoins un Discord actif avec des channels dédiés pour chaque sujet et une communauté soudée." },
        { title: "Channels thématiques (IA, N8n, dev, projets)", description: "Accède à des espaces spécialisés pour approfondir chaque domaine avec d'autres passionnés." },
        { title: "Support entre membres", description: "Entraide-toi avec les autres membres pour progresser plus vite et créer des synergies." },
        { title: "Ressources & Updates Hebdomadaires", description: "Reçois chaque semaine de nouvelles ressources, templates et updates pour rester à la pointe." },
        { title: "Nouveaux prompts", description: "Accède régulièrement à de nouveaux prompts optimisés pour maximiser tes résultats avec l'IA." },
        { title: "Nouveaux workflows N8n", description: "Télécharge des workflows n8n prêts à l'emploi et personnalisables pour tes projets." },
        { title: "Nouveaux modules ou updates IA", description: "Bénéficie des mises à jour continues du contenu avec les dernières innovations IA." },
        { title: "Accountability & Progress Tracking", description: "Reste accountable grâce au suivi de progression et aux objectifs partagés avec la communauté." },
        { title: "Suivi de progression", description: "Visualise ton avancement dans la formation et identifie les prochaines étapes à franchir." },
        { title: "Objectifs hebdomadaires", description: "Fixe et atteins des objectifs hebdomadaires pour maintenir un rythme constant de progression." }
      ]
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setOpenIndex(null);
  };

  return (
    <section id="content" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Contenu de la formation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AURA</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Un parcours structuré et complet pour maîtriser toutes les facettes de l'IA opérationnelle
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 bg-surface/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-800">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => handleTabChange(idx)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeTab === idx
                    ? 'text-white bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {tab.name}
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content with Accordions */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {tabs[activeTab].items.map((item, idx) => (
                <div
                  key={`${activeTab}-${idx}`}
                  className={`rounded-2xl bg-surface/80 backdrop-blur-sm border overflow-hidden transition-all duration-300 ${
                    openIndex === idx
                      ? 'border-primary/30 shadow-lg shadow-primary/5'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          openIndex === idx
                            ? 'bg-gradient-to-r from-primary to-secondary text-white'
                            : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
                        }`}
                      >
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <span
                        className={`font-semibold text-base md:text-lg transition-colors ${
                          openIndex === idx ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 transition-all duration-300 ${
                        openIndex === idx ? 'rotate-180 text-primary' : 'text-gray-500 group-hover:text-gray-400'
                      }`}
                    />
                  </button>

                  {openIndex === idx && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-20">
                      <div className="border-l-2 border-primary/20 pl-6">
                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button at bottom of content */}
            <div className="mt-12 text-center">
              <a
                href="https://calendly.com/aura-academie/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(234,75,113,0.3)] hover:shadow-[0_0_30px_rgba(234,75,113,0.5)] transform hover:-translate-y-1"
              >
                Réserver mon appel découverte
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Content;
