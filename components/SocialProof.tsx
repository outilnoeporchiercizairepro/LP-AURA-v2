import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  // Placeholders for video testimonials
  const videoTestimonials = [1, 2, 3];

  // Placeholders for written reviews
  const writtenReviews = [
    { name: "Marc D.", role: "Développeur Full-Stack", text: "J'ai vendu ma première infra à 3200€. Ça m'a largement remboursé le coût de la formation et j'ai pu commencer à scale mon activité." },
    { name: "Sophie L.", role: "Freelance Automation", text: "Je savais faire des workflows n8n mais je savais pas comment les vendre. La stratégie commerciale de Noé m'a permis de trouver des clients rapidement." },
    { name: "Thomas R.", role: "Développeur Freelance", text: "J'ai rentabilisé la formation en 3 semaines en signant mon premier contrat d'agent IA. Le ROI est juste dingue." },
    { name: "Sarah M.", role: "Fondatrice d'Agence", text: "L'approche de Lionel sur le mindset a tout changé. Je ne vends plus du temps, je vends de la valeur. Mes tarifs ont doublé." },
    { name: "Kevin L.", role: "CTO Startup", text: "La partie infra de Baptiste est du niveau de ce qu'on voit en grande entreprise. Solide. J'ai pu déployer des agents en production dès la semaine 4." },
    { name: "Julie B.", role: "Consultante IA", text: "Avant AURA, je regardais l'IA de loin. Aujourd'hui, je facture 5k€ par mission d'intégration. La formation m'a donné les compétences techniques ET commerciales." },
    { name: "Alexandre P.", role: "Ex-Marketeur", text: "J'ai pivoté complètement. De marketeur à dev IA en 3 mois. Mon premier client m'a payé 4500€ pour automatiser son acquisition. Je suis libre maintenant." },
    { name: "Camille T.", role: "Entrepreneur", text: "Les sessions business avec Noé m'ont ouvert les yeux. Je vendais trop bas, j'avais le syndrome de l'imposteur. Maintenant je sais positionner mes offres à leur juste valeur." },
    { name: "David M.", role: "Lead Dev", text: "Le réseau AURA vaut déjà la formation. J'ai trouvé mes premiers clients via la communauté. On se serre les coudes, on partage nos contrats." },
    { name: "Emma R.", role: "Designer reconvertie", text: "Je pensais qu'il fallait être développeur depuis 10 ans. Faux. Lionel m'a montré que le mindset compte plus que les années d'XP. Mon premier projet facturé 2800€." }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentIndex((prev) => (prev >= writtenReviews.length - 1 ? 0 : prev + 1));
      } else {
        const totalPages = Math.ceil(writtenReviews.length / 3);
        setCurrentIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const goToPrevious = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev <= 0 ? writtenReviews.length - 1 : prev - 1));
    } else {
      const totalPages = Math.ceil(writtenReviews.length / 3);
      setCurrentIndex((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev >= writtenReviews.length - 1 ? 0 : prev + 1));
    } else {
      const totalPages = Math.ceil(writtenReviews.length / 3);
      setCurrentIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrevious();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  const totalDots = isMobile ? writtenReviews.length : Math.ceil(writtenReviews.length / 3);

  return (
    <section id="reviews" className="py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ils sont passés à l'action
          </h2>
          <p className="text-gray-400">Rejoins une communauté de bâtisseurs.</p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-block px-4 sm:px-8 md:px-12 py-5 sm:py-6 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border-2 border-primary/40 shadow-2xl shadow-primary/20 backdrop-blur-sm relative overflow-hidden max-w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse"></div>
            <div className="relative z-10">
              <p className="text-xs sm:text-sm md:text-base font-semibold text-primary mb-2 uppercase tracking-wider">
                Résultats Prouvés
              </p>
              <p className="text-lg sm:text-xl md:text-3xl font-black text-white leading-tight">
                <span className="text-primary">+20 élèves</span> ont vendu leur 1ère infrastructure
              </p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-white mt-2">
                en <span className="text-secondary">moins de 2 mois</span> pour au minimum <span className="text-primary text-xl sm:text-2xl md:text-3xl">3200€</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-3 font-medium">
                Rejoins-les avant qu'il ne soit trop tard
              </p>
            </div>
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {videoTestimonials.map((_, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[9/16] md:aspect-[3/4] rounded-2xl bg-surface border border-slate-800 overflow-hidden group cursor-pointer hover:border-secondary/30 transition-all"
            >
              <div className="absolute inset-0 bg-slate-800/50 flex flex-col items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                 </div>
                 <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Témoignage Vidéo</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Written Reviews Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={{
              x: isMobile ? `-${currentIndex * 100}%` : `-${currentIndex * 100}%`
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex ${isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
          >
            {isMobile ? (
              writtenReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="p-8 rounded-2xl bg-surface/50 border border-slate-800 relative">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed min-h-[120px]">"{review.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: Math.ceil(writtenReviews.length / 3) }).map((_, pageIdx) => (
                <div
                  key={pageIdx}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-2"
                >
                  {writtenReviews.slice(pageIdx * 3, pageIdx * 3 + 3).map((review, idx) => (
                    <div
                      key={`${pageIdx}-${idx}`}
                      className="p-8 rounded-2xl bg-surface/50 border border-slate-800 relative"
                    >
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-6 leading-relaxed min-h-[120px]">"{review.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{review.name}</p>
                          <p className="text-gray-500 text-xs">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </motion.div>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Aller à la page ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;