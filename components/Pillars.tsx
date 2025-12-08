import React from 'react';
import { motion } from 'framer-motion';

const Pillars: React.FC = () => {
  const pillars = [
    {
      number: "01",
      title: "Mindset & Productivité",
      expert: "Lionel",
      desc: "L'IA est un levier. Apprends à organiser ton cerveau et ton temps pour maximiser cet effet de levier sans t'épuiser.",
      color: "text-primary"
    },
    {
      number: "02",
      title: "Infrastructure & IA",
      expert: "Baptiste",
      desc: "Comprendre les modèles, choisir la bonne architecture, gérer les coûts et la scalabilité de tes solutions.",
      color: "text-secondary"
    },
    {
      number: "03",
      title: "Déploiement & Business",
      expert: "Noé",
      desc: "Mettre tes solutions en ligne (VPS, Docker) et construire un réseau solide pour vendre tes compétences.",
      color: "text-primary"
    },
    {
      number: "04",
      title: "IA & Full-stack",
      expert: "Imrane",
      desc: "Le code glue. Connecter le front, le back et l'IA pour créer des applications SaaS complètes et robustes.",
      color: "text-secondary"
    }
  ];

  return (
    <section id="pillars" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Un système complet, en <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">4 piliers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="relative p-8 rounded-3xl bg-surface border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden group hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Background gradient effect on hover */}
              <div className={`absolute top-0 right-0 w-64 h-64 ${idx % 2 === 0 ? 'bg-primary/5' : 'bg-secondary/5'} rounded-full blur-3xl -mr-32 -mt-32 transition-opacity opacity-0 group-hover:opacity-100`} />
              
              <div className="relative z-10">
                <div className={`text-6xl font-bold mb-6 font-sans opacity-20 group-hover:opacity-40 transition-opacity ${pillar.color}`}>
                  {pillar.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className={`text-sm font-semibold mb-4 uppercase tracking-wider ${pillar.color}`}>Piloté par {pillar.expert}</p>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;