import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQ: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Quel niveau technique est nécessaire ?",
      a: "Un intérêt fort pour la tech est requis. Si tu sais utiliser un ordinateur et que tu es curieux, on t'apprendra le reste. Avoir des bases en code (HTML/JS/Python) est un plus, mais pas obligatoire."
    },
    {
      q: "Puis-je suivre AURA en parallèle d'un job ?",
      a: "Oui, la formation est conçue pour être suivie en parallèle. Compte environ 5 à 8 heures par semaine pour suivre les modules et faire les exercices."
    },
    {
      q: "Est-ce que vous m'aidez à déployer en production ?",
      a: "Absolument. C'est le cœur de la promesse d'AURA. On ne fait pas juste du local, on t'apprend à mettre tes apps sur des serveurs accessibles au monde entier."
    },
    {
      q: "Est-ce que vous m'aidez à trouver des clients ?",
      a: "Le module Business (Pilier 3) est dédié à ça. On t'apprend à structurer ton offre, à pricer et à closer tes premiers clients corporate."
    },
    {
      q: "Y a-t-il un suivi après les 12 semaines ?",
      a: "Tu gardes l'accès à la communauté et aux ressources à vie. Le réseau que tu construis ici te suivra tout au long de ta carrière."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          Questions fréquentes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-center mb-16 text-lg"
        >
          Toutes les réponses à tes interrogations
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {faqs.map((faq, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-8 rounded-2xl bg-surface border transition-all duration-500 cursor-default ${
                hoveredIndex === idx
                  ? 'border-primary/40 shadow-lg shadow-primary/10 scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 ${
                hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
              } ${idx % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`} />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    hoveredIndex === idx
                      ? 'bg-gradient-to-br from-primary to-secondary'
                      : 'bg-white/5'
                  }`}>
                    <HelpCircle className={`w-6 h-6 transition-colors duration-500 ${
                      hoveredIndex === idx ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className={`font-bold text-lg transition-colors duration-500 flex-1 ${
                    hoveredIndex === idx ? 'text-white' : 'text-gray-200'
                  }`}>
                    {faq.q}
                  </h3>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0.7,
                    y: hoveredIndex === idx ? 0 : 5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-400 leading-relaxed pl-16">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <p className="text-white font-semibold text-lg mb-4">
              Encore des questions ?
            </p>
            <a
              href="https://calendly.com/aura-academie/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(234,75,113,0.3)] hover:shadow-[0_0_30px_rgba(234,75,113,0.5)] transform hover:-translate-y-1"
            >
              Réserve un appel avec la team AURA
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;