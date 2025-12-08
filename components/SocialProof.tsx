import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  // Placeholders for video testimonials
  const videoTestimonials = [1, 2, 3];
  
  // Placeholders for written reviews
  const writtenReviews = [
    { name: "Thomas R.", role: "Développeur Freelance", text: "J'ai rentabilisé la formation en 3 semaines en signant mon premier contrat d'agent IA." },
    { name: "Sarah M.", role: "Fondatrice d'Agence", text: "L'approche de Lionel sur le mindset a tout changé. Je ne vends plus du temps, je vends de la valeur." },
    { name: "Kevin L.", role: "CTO Startup", text: "La partie infra de Baptiste est du niveau de ce qu'on voit en grande entreprise. Solide." }
  ];

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

        {/* Written Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {writtenReviews.map((review, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 + (idx * 0.1) }}
               className="p-8 rounded-2xl bg-surface/50 border border-slate-800 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{review.text}"</p>
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
        </div>

      </div>
    </section>
  );
};

export default SocialProof;