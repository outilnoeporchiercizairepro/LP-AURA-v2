import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const features = [
    "12 semaines de formation intensive",
    "Accès à vie aux replays et mises à jour",
    "4 experts dédiés pour répondre à tes questions",
    "Communauté Discord privée & entraide",
    "Templates Notion, n8n et code prêts à l'emploi",
    "Sessions Live Q&A hebdomadaires"
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            Comment rejoindre <span className="text-primary">AURA</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#020617] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Top border accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          
          <h3 className="text-2xl font-bold text-white mb-2">Parcours complet AURA</h3>
          <p className="text-gray-400 mb-8">La formation de référence pour les opérateurs IA.</p>

          <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-left max-w-2xl mx-auto mb-10">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                   <Check className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="text-gray-300 text-sm md:text-base">{feat}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 mb-8 border border-slate-800/50">
             <p className="text-slate-300 text-sm mb-1 uppercase tracking-wide font-medium">Prix de la formation</p>
             <p className="text-3xl font-bold text-white">Sur candidature</p>
             <p className="text-sm text-gray-500 mt-2">Investissement sur devis après appel de qualification.</p>
          </div>

          <button className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-primary to-primary-hover hover:to-primary text-white rounded-full font-bold text-lg transition-all shadow-[0_0_25px_rgba(234,75,113,0.3)] hover:shadow-[0_0_40px_rgba(234,75,113,0.5)] transform hover:-translate-y-1">
            Candidater à AURA
          </button>
          
          <p className="mt-6 text-xs text-gray-500">
            Places limitées pour garantir la qualité du suivi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;