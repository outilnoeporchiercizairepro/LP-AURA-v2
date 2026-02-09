import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTracking } from '../contexts/TrackingContext';
import { TestimonialsColumn } from './ui/TestimonialsColumn';
import { ShinyButton } from './ui/ShinyButton';

interface Review {
  id?: string;
  name: string;
  title: string;
  text: string;
  image?: string;
  role: string;
}

const SocialProof: React.FC = () => {
  const { utmSourceLabel } = useTracking();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/30min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

  const defaultReviews: Review[] = [
    {
      name: "Caroline",
      title: "Une excellente academy pour structurer et faire évoluer ses projets",
      text: "L'Aura Academy propose des modules très clairs et parfaitement structurés, qui évoluent constamment grâce à une croissance rapide et à une équipe élargie d'experts. Communauté très active.",
      role: "Membre Aura"
    },
    {
      name: "Marjorie",
      title: "Aura + accompagnement",
      text: "Quand des talents dans chaque domaine de l'IA et de l'automatisation se rencontrent et bien ça donne ça ! Je recommande à 1000% aussi bien sur la formation Aura que sur l'accompagnement.",
      role: "Entrepreneuse"
    },
    {
      name: "Mehdi",
      title: "Très bonne formation",
      text: "Très bonne formation et super accompagnement. Je recommande fortement pour ceux qui veulent se former à l'automatisation. Contenu technique et business de top niveau.",
      role: "Freelance IA"
    },
    {
      name: "Guy Salvatore",
      title: "Prêt pour lancer ton Agence ?",
      text: "Cette formation va te permettre de lancer une agence IA opérationnelle : workflows complets, structuration d'offre, audits clients, et monétisation. Explications claires et ressources concrètes.",
      role: "Fondateur Agence"
    },
    {
      name: "Remy Catala",
      title: "Très compétant et a l'écoute surtout !",
      text: "L'équipe est très compétante et surtout à l'écoute ! L'accompagnement est vraiment personnalisé et permet d'avancer vite sur ses propres problématiques.",
      role: "Membre Aura"
    },
    {
      name: "Amine",
      title: "Excellente formation !",
      text: "Baptiste et Imrane fournissent un contenu d'une grande valeur, à la fois sur le plan technique et pédagogique. Leurs conseils et lives sont précieux. Formation constamment enrichie.",
      role: "Expert Automation"
    },
    {
      name: "Ossmane Baali",
      title: "Incroyable communauté !",
      text: "C'est la meilleure communauté IA que ça soit dans le monde francophone ou dans le monde anglophone, on apprend énormément de choses tous les jours !",
      role: "Client AURA"
    },
    {
      name: "Mathieu",
      title: "Super expérience",
      text: "Super expérience avec Baptiste et Imrane, des gens super sérieux et compétents qui maîtrisent vraiment leur sujet. Je recommande sans hésiter.",
      role: "Entrepreneur"
    },
    {
      name: "Thomas",
      title: "Indispensable pour 2026",
      text: "Si vous voulez prendre de l'avance, c'est ici. Les workflows d'automatisation m'ont fait gagner un temps fou dans mon business.",
      role: "Product Manager"
    }
  ];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, title, text, image, role')
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

  const firstColumn = reviews.slice(0, Math.ceil(reviews.length / 3));
  const secondColumn = reviews.slice(Math.ceil(reviews.length / 3), Math.ceil(reviews.length * 2 / 3));
  const thirdColumn = reviews.slice(Math.ceil(reviews.length * 2 / 3));

  return (
    <section id="reviews" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
              Témoignages
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">
            Ils sont passés à l'action
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Rejoins une communauté de bâtisseurs d'élite qui transforment l'IA en profit.</p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <div className="inline-block px-12 py-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden max-w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 animate-pulse"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-primary mb-3 uppercase tracking-[0.2em]">Résultats Prouvés</p>
              <p className="text-2xl md:text-4xl font-black text-white leading-tight">
                <span className="text-primary">+20 élèves</span> ont vendu leur 1ère infrastructure
              </p>
              <p className="text-xl md:text-3xl font-bold text-white mt-3">
                en <span className="text-secondary">moins de 2 mois</span> pour <span className="text-primary text-3xl md:text-4xl">3200€+</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vertical Columns Testimonials */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[760px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn || defaultReviews.slice(0, 3)} duration={25} />
            <TestimonialsColumn testimonials={secondColumn || defaultReviews.slice(3, 6)} className="hidden md:block" duration={35} />
            <TestimonialsColumn testimonials={thirdColumn || defaultReviews.slice(6, 9)} className="hidden lg:block" duration={30} />
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <ShinyButton
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Rejoindre l'élite AI
          </ShinyButton>
        </motion.div>

      </div>
    </section>
  );
};

export default SocialProof;
