import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#020617]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          FAQ
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              key={idx} 
              className={`border rounded-2xl bg-surface overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-secondary/30 bg-surface/80' : 'border-slate-800'}`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-semibold text-lg transition-colors ${openIndex === idx ? 'text-secondary' : 'text-gray-200'}`}>
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-secondary' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-slate-800/50 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;