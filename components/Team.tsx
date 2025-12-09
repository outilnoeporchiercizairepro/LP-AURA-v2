
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Team: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Lionel",
      role: "Mindset & Productivité",
      desc: "Expert en développement personnel et optimisation cognitive. Il transforme ta manière de penser et de travailler pour atteindre des performances d'élite.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765225265429-2emt8w.png",
      color: "from-primary/20 to-primary/5"
    },
    {
      name: "Baptiste",
      role: "Infra & Marketing",
      desc: "Architecte des infrastructures cloud et stratégies marketing. Il te montre comment déployer à grande échelle et attirer tes premiers clients.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765224896655-ru45nc.jpeg",
      color: "from-secondary/20 to-secondary/5"
    },
    {
      name: "Noé",
      role: "Déploiement & Biz",
      desc: "Spécialiste du closing et de la stratégie commerciale. Il t'apprend à vendre tes solutions IA et à développer ton activité rapidement.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765226175618-b7yhs6.png",
      color: "from-primary/20 to-primary/5"
    },
    {
      name: "Imrane",
      role: "Ingénieur Full-stack",
      desc: "Développeur expert en IA et automatisation. Il te guide dans la création d'applications IA robustes et la mise en production de tes projets.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765226180802-v4ll0w.png",
      color: "from-secondary/20 to-secondary/5"
    }
  ];

  return (
    <section id="team" className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3 flex-wrap">
            L'Équipe
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-extrabold">
              AURA
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            4 experts aux compétences complémentaires pour vous accompagner de A à Z.
          </p>
        </motion.div>

        {/* --- DESKTOP FAN DECK (ANIMATION AVANCÉE) --- */}
        <div ref={containerRef} className="hidden lg:flex justify-center items-center h-[500px] w-full relative -mt-10 perspective-[1000px]">
          {team.map((member, index) => {
            const offset = index - 1.5; // Centers around 1.5
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            // --- CALCUL DE L'ÉTAT D'ANIMATION ---
            
            // 1. État initial (Hors champ)
            let animateState = {
                x: 0,
                y: 100,
                rotate: 0,
                scale: 0.9,
                zIndex: index,
                opacity: 0,
                filter: 'brightness(1)',
            };

            // 2. Si visible
            if (isInView) {
                // État de base (Repos) - Éventail TRÈS large pour lisibilité immédiate
                animateState = {
                    x: offset * 190, // Écartement large (visages bien visibles)
                    y: 0, // Pas d'arc vertical inutile au repos
                    rotate: offset * 2, // Rotation très subtile
                    scale: 1,
                    zIndex: index,
                    opacity: 1,
                    filter: 'brightness(1) blur(0px)',
                };

                // État interactif (Survol)
                if (isAnyHovered) {
                    if (isHovered) {
                        // LA CARTE SÉLECTIONNÉE (FOCUS DOUX)
                        animateState = {
                            x: offset * 190, // Reste à sa place horizontale
                            y: -40, // Remonte légèrement
                            rotate: 0, // Se redresse
                            scale: 1.15, // Zoom modéré (Premium, pas cartoon)
                            zIndex: 50,
                            opacity: 1,
                            filter: 'brightness(1.1) drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
                        };
                    } else {
                        // LES AUTRES CARTES (DIMMED LÉGER)
                        // On écarte à peine
                        const pushAside = index < hoveredIndex ? -20 : 20; 
                        animateState = {
                            x: (offset * 190) + pushAside, 
                            y: 10, 
                            rotate: offset * 2,
                            scale: 0.98, // Rétrécissement quasi imperceptible
                            zIndex: index,
                            opacity: 0.8, // Garde de la visibilité
                            filter: 'brightness(0.7) blur(1px)', // Flou très léger pour garder le contexte
                        };
                    }
                }
            }

            return (
              <motion.div
                key={index}
                animate={animateState}
                transition={{ 
                    type: "spring", 
                    stiffness: 120, // Plus souple
                    damping: 25,   // Moins de rebond
                    mass: 1
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '420px',
                  transformOrigin: 'center center', // Changement d'origine pour zoom plus naturel
                  cursor: 'pointer'
                }}
                className="rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 bg-slate-900 group"
              >
                {/* Image */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t ${member.color} via-transparent to-transparent opacity-40 mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/0 to-[#020617] opacity-90" />
                
                {/* Contenu Texte */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
                  <motion.div>
                     <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{member.name}</h3>
                     <p className="text-primary font-bold tracking-wide text-sm mb-3 drop-shadow-md">{member.role}</p>
                  </motion.div>

                  {/* Description détaillée (Apparaît au survol) */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0,
                        marginTop: isHovered ? 8 : 0
                    }}
                    className="overflow-hidden"
                  >
                     <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">{member.desc}</p>
                  </motion.div>
                </div>
                
                {/* Effet Shine au survol */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`} />
              </motion.div>
            );
          })}
        </div>

        {/* --- MOBILE GRID (Responsive Fallback) --- */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface border border-slate-800"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;
