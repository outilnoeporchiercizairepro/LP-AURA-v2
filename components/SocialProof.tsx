import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  // Placeholders for written reviews
  const writtenReviews = [
    { name: "Marc D.", role: "Étudiant en Droit", text: "J'ai vendu ma première infra à 3200€. Ça m'a largement remboursé le coût de la formation et j'ai pu commencer à scale mon activité." },
    { name: "Sophie L.", role: "Freelance Automation", text: "Je savais faire des workflows n8n mais je savais pas comment les vendre. La stratégie commerciale de Noé m'a permis de trouver des clients rapidement." },
    { name: "Thomas R.", role: "Développeur Freelance", text: "J'ai rentabilisé la formation en 3 semaines en signant mon premier contrat d'agent IA. Le ROI est juste dingue." },
    { name: "Sarah M.", role: "Fondatrice d'Agence", text: "L'approche de Lionel sur le mindset a tout changé. Je ne vends plus du temps, je vends de la valeur. Mes tarifs ont doublé." },
    { name: "Kevin L.", role: "Étudiant en Marketing", text: "La partie infra de Baptiste est du niveau de ce qu'on voit en grande entreprise. Solide. J'ai pu déployer des agents en production dès la semaine 4." },
    { name: "Julie B.", role: "Consultante IA", text: "Avant AURA, je regardais l'IA de loin. Aujourd'hui, je facture 5k€ par mission d'intégration. La formation m'a donné les compétences techniques ET commerciales." },
    { name: "Alexandre P.", role: "Ex-Marketeur", text: "J'ai pivoté complètement. De marketeur à dev IA en 3 mois. Mon premier client m'a payé 4500€ pour automatiser son acquisition. Je suis libre maintenant." },
    { name: "Camille T.", role: "Entrepreneur", text: "Les sessions business avec Noé m'ont ouvert les yeux. Je vendais trop bas, j'avais le syndrome de l'imposteur. Maintenant je sais positionner mes offres à leur juste valeur." },
    { name: "David M.", role: "Étudiant en Immobilier", text: "Le réseau AURA vaut déjà la formation. J'ai trouvé mes premiers clients via la communauté. On se serre les coudes, on partage nos contrats." },
    { name: "Emma R.", role: "Designer reconvertie", text: "Je pensais qu'il fallait être développeur depuis 10 ans. Faux. Lionel m'a montré que le mindset compte plus que les années d'XP. Mon premier projet facturé 2800€." }
  ];

  // Duplicate reviews for infinite loop
  const duplicatedReviews = [...writtenReviews, ...writtenReviews];

  const ReviewCard = ({ review }: { review: typeof writtenReviews[0] }) => (
    <div className="flex-shrink-0 w-[90vw] md:w-[400px] px-3">
      <div className="p-8 rounded-2xl bg-surface/50 border border-slate-800 relative h-full">
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
  );

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

        {/* Written Reviews Infinite Carousel */}
        <div className="relative overflow-hidden -mx-4">
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              },
            }}
          >
            {duplicatedReviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </motion.div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none z-10" />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://calendly.com/aura-academie/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_30px_rgba(234,75,113,0.6)]"
          >
            <span className="relative z-10">Rejoindre la communauté</span>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default SocialProof;