import React, { useMemo } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';

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
  const features = [
    "Plus de 50h de cours structurés",
    "Exercices pratiques et projets concrets",
    "Channels Discord actifs et réactifs",
    "Calls de groupe réguliers avec la team",
    "Accès à vie aux replays et mises à jour",
    "Templates et ressources prêts à l'emploi"
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 flex items-center justify-center gap-3 flex-wrap">
            Comment rejoindre <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="inline h-10 md:h-14" />
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
          
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2 flex-wrap">Académie <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="inline h-8" /></h3>
          <p className="text-gray-400 mb-8">Une académie complète avec cours, exercices, communauté et accompagnement live.</p>

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

          <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-slate-800/50 text-left">
             <h4 className="text-xl font-bold text-white mb-4">Un appel de 30 minutes pour faire le point sur ta situation et déterminer si une collaboration est pertinente.</h4>

             <div className="mb-6">
               <p className="text-secondary font-semibold mb-4 text-lg">Déroulé de l'appel :</p>
               <div className="space-y-4">
                 <div className="flex gap-3">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                     <span className="text-primary font-bold text-sm">1</span>
                   </div>
                   <p className="text-gray-300 text-sm md:text-base">Un membre de la team AURA analyse précisément ta situation actuelle.</p>
                 </div>
                 <div className="flex gap-3">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                     <span className="text-primary font-bold text-sm">2</span>
                   </div>
                   <p className="text-gray-300 text-sm md:text-base">Il te présente AURA, ce que tu vas recevoir et comment cela s'applique à ton cas.</p>
                 </div>
                 <div className="flex gap-3">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                     <span className="text-primary font-bold text-sm">3</span>
                   </div>
                   <p className="text-gray-300 text-sm md:text-base">Tu décides si tu veux avancer et si tu es prêt à commencer.</p>
                 </div>
                 <div className="flex gap-3">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                     <span className="text-primary font-bold text-sm">4</span>
                   </div>
                   <p className="text-gray-300 text-sm md:text-base">Si ton profil correspond et qu'il reste une place, tu peux rejoindre la communauté immédiatement.</p>
                 </div>
               </div>
             </div>

             <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
               <p className="text-xs md:text-sm text-gray-400 italic">
                 <span className="font-semibold text-secondary">Note :</span> Ce n'est pas un appel de vente déguisé. C'est un échange transparent pour voir si AURA est le bon levier pour ta croissance.
               </p>
             </div>
          </div>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block w-full md:w-auto px-12 py-5 bg-gradient-to-r from-primary to-primary-hover hover:to-primary text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_25px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_40px_rgba(234,75,113,0.6)]"
          >
            <span className="relative z-10">Réserver mon appel</span>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
          </a>
          
          <p className="mt-6 text-xs text-gray-500">
            Places limitées pour garantir la qualité du suivi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;