import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItem {
  title: string;
  description: string;
}

interface TabContent {
  name: string;
  items: TimelineItem[];
}

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tabs: TabContent[] = [
    {
      name: "Roadmap Aura",
      items: [
        { title: "Introduction - Apprentissage d'une compétence IA", description: "Découvre les fondamentaux de l'IA et comment choisir la compétence IA qui te correspond. Développe la mentalité des pionniers qui réussissent avec l'IA avant tout le monde." },
        { title: "Avant de savoir vendre", description: "Comprends les prérequis essentiels avant de te lancer : mindset entrepreneurial, bases techniques et compréhension du marché de l'IA. Pose des fondations solides pour réussir." },
        { title: "Choisir une niche", description: "Identifie ta niche IA idéale et définis ton positionnement unique sur le marché. Analyse la demande, la concurrence et trouve ton angle différenciant pour te démarquer." },
        { title: "Obtenir des clients", description: "Maîtrise les stratégies d'acquisition client efficaces : prospection LinkedIn, networking, cold email et création de contenu. Génère un flux constant d'opportunités qualifiées." },
        { title: "Image de marque", description: "Construis ton identité professionnelle et ta présence en ligne. Crée un personal branding impactant qui attire naturellement tes clients idéaux et te positionne en expert." },
        { title: "Offres et prix", description: "Structure des offres IA irrésistibles et définis une tarification premium adaptée à la valeur que tu apportes. Apprends à packager tes compétences pour maximiser tes revenus." },
        { title: "Closing", description: "Convertis tes prospects en clients payants avec des techniques de closing éthiques et efficaces. Gère les objections et conclus des ventes à forte valeur ajoutée." },
        { title: "Onboarding / Déploiement", description: "Embarque tes clients de manière professionnelle et déploie tes solutions IA en production. Assure une mise en place réussie qui génère des résultats mesurables rapidement." },
        { title: "Fiscalité et juridique", description: "Comprends les aspects légaux et fiscaux pour sécuriser ton activité d'opérateur IA. Structure ton business de manière optimale et développe sereinement en toute légalité." }
      ]
    },
    {
      name: "Infrastructure IA & Automatisation",
      items: [
        { title: "Maîtrise de n8n", description: "Maîtrise n8n de zéro jusqu'aux workflows les plus complexes avec des cas d'usage réels et pratiques." },
        { title: "Automatisations Avancées", description: "Crée des automatisations intelligentes qui combinent plusieurs IA et outils pour maximiser l'impact de tes solutions." },
        { title: "Interfaces personnalisées", description: "Développe des interfaces sur-mesure pour rendre tes solutions IA accessibles, intuitives et professionnelles." },
        { title: "Bases de Données", description: "Connecte tes systèmes IA à des bases de données performantes pour gérer l'information à grande échelle." },
        { title: "Mise en Production", description: "Déploie tes solutions chez un client en production avec les bonnes pratiques de sécurité et de maintenance professionnelle." },
        { title: "Projet Complet A-Z", description: "Réalise un projet complet de bout en bout : de la conception au déploiement d'un système IA professionnel fonctionnel." }
      ]
    },
    {
      name: "Vibe Coding & IA",
      items: [
        { title: "Introduction", description: "Découvre ce qu'est le VibeCoding, cette approche révolutionnaire du développement assisté par IA. Comprends ce que tu peux construire et comment coder 10x plus vite avec cette méthodologie." },
        { title: "Les Bases du Développement", description: "Maîtrise les fondamentaux essentiels : JSON pour structurer les données, les API pour faire communiquer tes outils, et les langages clés." },
        { title: "Le Prompting", description: "Apprends l'art du prompting pour communiquer efficacement avec l'IA. Construis des prompts puissants, comprends les différents modèles IA et optimise tes interactions avec les agents." },
        { title: "Cursor", description: "Maîtrise Cursor, l'éditeur de code révolutionnaire avec IA intégrée. Présentation complète de l'outil et réalisation d'un projet concret pour développer avec l'IA comme copilote." },
        { title: "Lovable / Bolt / Replit", description: "Découvre les plateformes no-code et low-code : Lovable pour créer des sites web complets, Bolt pour des applications complexes et Replit pour le développement collaboratif en ligne." },
        { title: "Coder avec les LLMs", description: "Exploite la puissance des grands modèles de langage : Claude pour la réflexion complexe, Codex pour la génération de code avancée et Copilot pour l'assistance en temps réel." },
        { title: "Déploiement et hébergement", description: "Apprends à mettre tes applications en production : hébergement depuis les plateformes de VibeCoding, déploiement à partir du code source et gestion de versions avec GitHub." }
      ]
    },
    {
      name: "Suivi & Espace Communautaire",
      items: [
        { title: "Coaching Live Hebdo", description: "Participe à des sessions live et des appels de groupe avec la team AURA pour progresser rapidement, échanger et rester motivé." },
        { title: "Support & Accompagnement", description: "Bénéficie d'un accompagnement personnalisé sur tes projets, résous tes bugs en temps réel et obtiens de l'aide pour débloquer tes défis techniques." },
        { title: "Études de Cas Réels", description: "Analyse des cas réels d'implémentation IA et automatisation. Décortique des projets concrets pour comprendre les décisions techniques et business." },
        { title: "Communauté Discord VIP Gratuite", description: "Rejoins un Discord actif avec des channels thématiques (IA, n8n, dev, projets) et une communauté soudée pour s'entraider et progresser ensemble." },
        { title: "Ressources Hebdo", description: "Reçois chaque semaine de nouvelles ressources, prompts optimisés, workflows n8n prêts à l'emploi et les dernières updates IA." }
      ]
    }
  ];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setHoveredIndex(null);
  };

  return (
    <section id="content" className="py-24 bg-[#020617] relative overflow-hidden">
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
            Des modules structurés et complets pour maîtriser toutes les facettes du business qui nous génère 20k/mois
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => handleTabChange(idx)}
                className={`relative px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === idx
                    ? 'text-white bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-gray-300 bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50'
                }`}
              >
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="space-y-3">
                {tabs[activeTab].items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group relative p-5 rounded-xl border transition-all duration-300 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 ${
                      hoveredIndex === idx
                        ? 'border-primary/40 shadow-lg shadow-primary/10 translate-x-2'
                        : 'border-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        hoveredIndex === idx
                          ? 'bg-gradient-to-br from-primary to-secondary text-white'
                          : 'bg-slate-800/50 text-gray-400'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg mb-1.5 transition-colors ${
                          hoveredIndex === idx ? 'text-white' : 'text-gray-200'
                        }`}>
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredIndex === idx ? 'bg-primary/20' : 'bg-transparent'
                      }`}>
                        <CheckCircle2 className={`w-4 h-4 transition-all duration-300 ${
                          hoveredIndex === idx ? 'text-primary opacity-100' : 'text-gray-600 opacity-50'
                        }`} />
                      </div>
                    </div>

                    {hoveredIndex === idx && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <a
                  href="https://calendly.com/aura-academie/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_30px_rgba(234,75,113,0.6)]"
                >
                  <span className="relative z-10">Accéder au programme complet</span>
                  <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Content;
