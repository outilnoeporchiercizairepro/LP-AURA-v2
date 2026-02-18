import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

const Pricing: React.FC = () => {
  const { utmSourceLabel } = useTracking();

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/30min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 flex items-center justify-center gap-3 flex-wrap">
            Comment rejoindre <img src="/aura.png" alt="AURA" className="inline h-10 md:h-14" />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-slate-800/50 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider">Offert · 15 min</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Un appel stratégique offert pour analyser ton profil et définir tes objectifs avec toi.</h4>
            <p className="text-gray-400 text-sm mb-6">Cet appel n'est pas accessible à tout le monde. On l'offre aux profils qui comprennent les enjeux de l'IA et qui sont prêts à passer à l'action.</p>

            <div className="mb-6">
              <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wider">Ce qu'on fait ensemble :</p>
              <div className="space-y-3">
                {[
                  'On analyse ton profil, ta situation actuelle et ce que tu veux construire.',
                  'On fixe des objectifs concrets et on vérifie que tu comprends les enjeux.',
                  'On évalue si AURA est le bon cadre pour t\'aider à les atteindre.',
                  'Si le profil correspond et qu\'il reste une place, tu peux rejoindre immédiatement.',
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mt-0.5">
                      <span className="text-primary font-bold text-xs">{i + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-gray-400 italic">
                <span className="font-semibold text-secondary">Note :</span> Ce n'est pas un appel de vente déguisé. C'est un échange honnête pour voir si le fit est bon — dans les deux sens.
              </p>
            </div>
          </div>

          <ShinyButton
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto"
          >
            Réserver mon appel stratégique
          </ShinyButton>

          <p className="mt-6 text-xs text-gray-500">
            Places limitées pour garantir la qualité du suivi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
