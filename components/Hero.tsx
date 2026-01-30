import React, { useState } from 'react';
import { BookOpen, CheckCircle, RefreshCw, Users, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';

const Hero: React.FC = () => {
  const { getCalendlyUrl } = useTracking();
  const youtubeVideoId = 'ZS2fa-1I0uo';
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMonth = new Date().toLocaleDateString('fr-FR', { month: 'long' });

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10 opacity-60" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          3 places restantes pour le mois de {currentMonth}
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight"
        >
          Maîtrise les systèmes IA, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary">
             indispensables pour 2026.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed"
        >
          Apprends à créer, déployer et vendre tes solutions IA grâce à une roadmap claire guidée par 4 experts.
        </motion.p>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 w-full max-w-4xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            {isPlaying ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                title="Vidéo de présentation AURA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                  alt="Aperçu vidéo"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/30 transition-colors"
                  onClick={handlePlayClick}
                >
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-white uppercase tracking-widest">Vidéo de présentation</p>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Bullet Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium text-gray-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary"><BookOpen className="w-4 h-4" /></div>
            <span>+50h de cours</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary"><CheckCircle className="w-4 h-4" /></div>
            <span>Validation de ton offre par nos experts</span>
          </div>
          <div className="flex items-center gap-2.5">
             <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary"><RefreshCw className="w-4 h-4" /></div>
            <span>Mises à jour hebdomadaires</span>
          </div>
          <div className="flex items-center gap-2.5">
             <div className="p-1.5 rounded-lg bg-primary/10 text-primary"><Users className="w-4 h-4" /></div>
            <span>Coaching de groupe</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href={getCalendlyUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_30px_rgba(234,75,113,0.6)]"
          >
            <span className="relative z-10">Je réserve mon appel stratégique</span>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
          </a>
          <a
            href="#team"
            className="w-full sm:w-auto px-8 py-4 border border-slate-700 hover:border-secondary text-gray-300 hover:text-white rounded-lg font-semibold text-lg transition-colors bg-white/5 backdrop-blur-sm"
          >
            Découvrir la team AURA
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;