import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const itemsPerView = 3;
  const maxIndex = Math.max(0, writtenReviews.length - itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

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
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {writtenReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  className="min-w-full md:min-w-[calc(33.333%-16px)] p-8 rounded-2xl bg-surface/50 border border-slate-800 relative flex-shrink-0"
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
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-surface border border-slate-700 hover:border-primary flex items-center justify-center text-white hover:text-primary transition-all shadow-lg hover:shadow-primary/20 z-10"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-surface border border-slate-700 hover:border-primary flex items-center justify-center text-white hover:text-primary transition-all shadow-lg hover:shadow-primary/20 z-10"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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