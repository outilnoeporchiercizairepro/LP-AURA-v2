import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Review {
  id?: string;
  name: string;
  title: string;
  text: string;
}

const SocialProof: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultReviews: Review[] = [
    {
      name: "Caroline",
      title: "Une excellente academy pour structurer et faire évoluer ses projets",
      text: "L'Aura Academy propose des modules très clairs et parfaitement structurés, qui évoluent constamment grâce à une croissance rapide et à une équipe élargie d'experts dans différents domaines. Les différents workflows (prospection, automation, génération de leads, contenus réseaux, vidéos, etc.) sont expliqués étape par étape de manière simple et compréhensible. Le contenu est régulièrement mis à jour et soutenu par des ressources concrètes comme des PDF, des templates et des cas d'usage pratiques. La communauté est très active, ce qui permet d'obtenir rapidement des réponses à ses questions ou des retours sur ses partages. Les sessions live sont idéales pour résoudre des problèmes, corriger des erreurs et savoir quelles sont les prochaines étapes à suivre."
    },
    {
      name: "Marjorie",
      title: "Aura + accompagnement",
      text: "Quand des talents dans chaque domaine de l'IA et de l'automatisation se rencontrent et bien ça donne ça ! Je recommande à 1000% aussi bien sur la formation Aura que sur l'accompagnement que j'ai pris en plus."
    },
    {
      name: "Mehdi",
      title: "Très bonne formation",
      text: "Très bonne formation et super accompagnement. Je recommande fortement pour ceux qui veulent se former à l'automatisation"
    },
    {
      name: "Guy Salvatore",
      title: "Prêt pour lancer ton Agence ?",
      text: "Cette formation va te permettre de lancer une agence IA opérationnelle : workflows complets (prospection, automation, lead generation, contenu réseaux, vidéos, ...), mais surtout comment structurer ton offre, faire des audits clients, monétiser tes services et construire une infrastructure scalable. Explications claires, ressources concrètes (pdf, templates, cas d'usage concrets), contenu remis à jour qui couvre fondamentaux et patterns avancés."
    },
    {
      name: "Remy Catala",
      title: "Très compétant et a l'écoute surtout !",
      text: "Très compétant et a l'écoute surtout !"
    },
    {
      name: "Amine",
      title: "Excellente formation !",
      text: "La formation est d'une grande qualité, accessible aussi bien aux débutants qu'aux profils intermédiaires. Baptiste et Imrane fournissent un contenu d'une grande valeur, à la fois sur le plan technique et pédagogique. Ils transmettent énormément de contenu technique et business et les vidéos sont accompagnées de pdf et templates. Leurs conseils et lives sont précieux. La formation est constamment mise à jour et enrichie. Je recommande cette formation sans aucune réserve."
    },
    {
      name: "Ossmane Baali",
      title: "Incroyable communauté !",
      text: "C'est la meilleure communauté IA que ça soit dans le monde francophone ou dans le monde anglophone, on apprend énormément de choses !"
    },
    {
      name: "Mathieu",
      title: "Super expérience",
      text: "Super expérience avec Baptiste et Imrane des gens super sérieux et compétent"
    }
  ];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, title, text')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setReviews(data);
      } else {
        setReviews(defaultReviews);
      }
    } catch (err) {
      console.error('Error loading testimonials:', err);
      setReviews(defaultReviews);
    } finally {
      setLoading(false);
    }
  };

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0].charAt(0) + parts[1].charAt(0);
    }
    return name.substring(0, 2).toUpperCase();
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <div className="flex-shrink-0 w-[90vw] md:w-[350px] px-3">
      <div
        onClick={() => setSelectedReview(review)}
        className="h-[240px] p-5 rounded-xl bg-white border border-gray-200 relative shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-primary/30 flex flex-col"
      >
        <div className="flex items-start justify-between mb-3">
          <svg className="trustpilot-stars-svg" height="18" width="90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 96">
            <path fill="#00b67a" d="M0 0h96v96H0zM104 0h96v96h-96zM208 0h96v96h-96zM312 0h96v96h-96zM416 0h96v96h-96z"></path>
            <path fill="#ffffff" d="M48 64.7L62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z"></path>
          </svg>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded text-xs text-gray-600">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-green-600">
              <path fillRule="evenodd" clipRule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"></path>
            </svg>
            <span className="font-medium">Vérifié</span>
          </div>
        </div>

        <h4 className="text-gray-900 font-bold text-sm mb-2 line-clamp-2">{review.title}</h4>
        <p className="text-gray-700 text-sm leading-relaxed flex-1 line-clamp-3">{review.text}</p>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-auto">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-white">
            {getInitials(review.name)}
          </div>
          <span className="text-gray-900 font-semibold text-sm">{review.name}</span>
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Aucun avis pour le moment
          </div>
        ) : (
          <div className="relative overflow-hidden -mx-4">
            <motion.div
              className="flex"
              animate={{
                x: ["0%", "-66.66%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
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
        )}

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

      <AnimatePresence>
        {selectedReview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedReview(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <svg className="trustpilot-stars-svg" height="20" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 96">
                          <path fill="#00b67a" d="M0 0h96v96H0zM104 0h96v96h-96zM208 0h96v96h-96zM312 0h96v96h-96zM416 0h96v96h-96z"></path>
                          <path fill="#ffffff" d="M48 64.7L62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z"></path>
                        </svg>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded text-xs text-gray-600">
                          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-600">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"></path>
                          </svg>
                          <span className="font-medium">Vérifié</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedReview.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed mb-6">{selectedReview.text}</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white">
                      {getInitials(selectedReview.name)}
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">{selectedReview.name}</p>
                      <p className="text-gray-500 text-sm">Membre Aura Academy</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SocialProof;