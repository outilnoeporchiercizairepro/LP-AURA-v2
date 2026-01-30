import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';

const Comparison: React.FC = () => {
  const { getCalendlyUrl } = useTracking();
  return (
    <section className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Negative Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-red-950/20 border-2 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 flex-wrap">
              <XCircle className="text-red-500 w-8 h-8" />
              <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="inline h-8" /> n'est pas pour toi si...
            </h3>
            <ul className="space-y-5 text-gray-300">
              <li className="flex gap-4 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>Tu cherches une solution magique pour gratter 500€.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>Tu n'es pas prêt à investir du temps pour apprendre la technique.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>Tu attends que tout te tombe tout cuit dans la bouche.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>Tu es pas prêt à investir sur toi-même pour changer de vie.</span>
              </li>
            </ul>
          </motion.div>

          {/* Positive Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-3xl bg-green-950/20 border-2 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 flex-wrap">
              <CheckCircle className="text-green-500 w-8 h-8" />
              <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="inline h-8" /> est pour toi si...
            </h3>
            <ul className="space-y-5 text-gray-300">
              <li className="flex gap-4 items-start">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Tu veux construire une vraie expertise long-terme.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Tu es prêt à passer à l'action et à être actif chaque semaine.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Tu comprends que l'IA est la révolution industrielle de notre siècle.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Tu veux rejoindre une communauté d'élite bienveillante.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={getCalendlyUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_30px_rgba(234,75,113,0.6)]"
          >
            <span className="relative z-10">Vérifier mon éligibilité</span>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;