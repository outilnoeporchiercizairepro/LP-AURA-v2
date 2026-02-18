import React, { useMemo } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

const Benefits: React.FC = () => {
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

  const skills = [
    "Concevoir une infrastructure IA (Interface, Base de Données, Automatisations)",
    "Déployer tes apps sur un serveur privé avec une base de données dédiée",
    "Créer des automatisations complexes via n8n",
    "Structurer une offre IA vendable et trouver des clients",
    "Utiliser le VibeCoding pour créer des applications personnalisées (sans savoir coder)",
    "Comprendre en profondeur tout l'écosystème de l'IA"
  ];

  return (
    <section id="benefits" className="py-24 border-y border-slate-900 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight flex items-center gap-3 flex-wrap">
              Ce que tu sais faire après <img src="/aura.png" alt="AURA" className="inline h-10 md:h-14" />
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Tu ne te contenteras plus d’utiliser des outils. Tu sauras, rapidement, comment construire des systèmes qui se vendent plusieurs milliers d’euros depuis n’importe où.
              Des infrastructures IA personnalisées, scalables et rentables qui te rendent libre, parce que tu peux les créer vite… et les vendre cher.
            </p>
            <a href="#content" className="text-primary hover:text-primary-hover font-semibold transition-colors flex items-center gap-2 group">
              Voir le programme détaillé <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-[#000000] p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
              <ul className="space-y-6">
                {skills.map((skill, idx) => (
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200 font-medium text-lg">{skill}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <ShinyButton
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  Débloquer ces compétences
                </ShinyButton>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
