import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

const FAQ: React.FC = () => {
  const { utmSourceLabel } = useTracking();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/30min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

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
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-transparent">
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

        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              key={idx}
              className={`group relative rounded-2xl bg-surface border transition-all duration-300 overflow-hidden ${openIndex === idx
                ? 'border-primary/40 shadow-lg shadow-primary/10'
                : 'border-slate-800 hover:border-slate-700'
                }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 ${openIndex === idx ? 'opacity-100' : 'opacity-0'
                } ${idx % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`} />

              <button
                onClick={() => toggleFAQ(idx)}
                className="relative z-10 w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <h3 className={`font-bold text-lg transition-colors duration-300 flex-1 ${openIndex === idx ? 'text-white' : 'text-gray-200'
                  }`}>
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${openIndex === idx
                    ? 'bg-gradient-to-br from-primary to-secondary'
                    : 'bg-white/5'
                    }`}
                >
                  <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${openIndex === idx ? 'text-white' : 'text-gray-400'
                    }`} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            <ShinyButton
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Poser mes questions
            </ShinyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
