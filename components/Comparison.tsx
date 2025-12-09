import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Comparison: React.FC = () => {
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
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <XCircle className="text-red-500 w-8 h-8" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AURA</span> n'est pas pour toi si...
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
            <div className="mt-8">
              <button className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-400 rounded-full font-semibold transition-all border border-red-500/20">
                Ce n'est pas pour moi
              </button>
            </div>
          </motion.div>

          {/* Positive Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-3xl bg-green-950/20 border-2 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AURA</span> est pour toi si...
            </h3>
            <ul className="space-y-5 text-gray-300">
              <li className="flex gap-4 items-start">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Tu veux construire une vraie expertise long-terme.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Tu es prêt à passer à l'action et à implémenter chaque semaine.</span>
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
            <div className="mt-8">
              <a
                href="https://calendly.com/aura-academie/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-center rounded-full font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transform hover:-translate-y-1"
              >
                Je suis prêt, je réserve mon appel
              </a>
            </div>
          </motion.div>

        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="mb-4">
            <p className="text-red-500 font-bold text-lg mb-2 animate-pulse">
              ⚠️ PLACES LIMITÉES - Seulement 15 places disponibles ce mois-ci
            </p>
            <p className="text-gray-400 text-sm">
              Ne laisse pas passer cette opportunité de transformer ta vie avec l'IA
            </p>
          </div>
          <a
            href="https://calendly.com/aura-academie/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-white rounded-full font-bold text-xl transition-all shadow-[0_0_30px_rgba(234,75,113,0.4)] hover:shadow-[0_0_50px_rgba(234,75,113,0.6)] transform hover:-translate-y-1 hover:scale-105"
          >
            Je réserve ma place maintenant 🚀
          </a>
          <p className="text-gray-500 text-xs mt-4">
            Les autres prennent déjà de l'avance. Et toi ?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;