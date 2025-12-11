
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Team: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Lionel",
      role: "Coach Mindset & Productivité",
      desc: "Expert en développement personnel et optimisation cognitive. Il transforme ta manière de penser et de travailler pour atteindre des performances d'élite.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765225265429-2emt8w.png",
      color: "from-primary/20 to-primary/5"
    },
    {
      name: "Baptiste",
      role: "Expert IA & Automatisation",
      desc: "Architecte des infrastructures IA. Co-Fondateur de VeliosAI, il vous apprend à créer des systèmes IA scalables et duplicables de A à Z.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765224896655-ru45nc.jpeg",
      color: "from-secondary/20 to-secondary/5"
    },
    {
      name: "Noé",
      role: "Spécialiste en Déploiement & Vente",
      desc: "Expert du closing et de la stratégie commerciale. Il t'apprend à vendre tes solutions IA et à développer ton activité rapidement qu'elle soit en ligne ou en physique.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765226175618-b7yhs6.png",
      color: "from-primary/20 to-primary/5"
    },
    {
      name: "Imrane",
      role: "Ingénieur IA et Cloud",
      desc: "Développeur expert en IA et automatisation. Co-Fondateur de VeliosAI, il te guide dans la création d'applications IA robustes et la mise en production de tes projets.",
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
            <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="inline h-10 md:h-14" />
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

            const isFlipped = flippedIndex === index;

            return (
              <motion.div
                key={index}
                animate={animateState}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                    mass: 1
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '420px',
                  transformOrigin: 'center center',
                  cursor: 'pointer',
                  perspective: '1000px'
                }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Face Avant */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                    className="rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 bg-slate-900"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className={`absolute inset-0 bg-gradient-to-t ${member.color} via-transparent to-transparent opacity-40 mix-blend-overlay`} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/95" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{member.name}</h3>
                      <p className="text-primary font-bold tracking-wide text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{member.role}</p>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 10
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedIndex(index);
                        }}
                        className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                      >
                        En savoir plus sur {member.name}
                      </motion.button>
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`} />
                  </div>

                  {/* Face Arrière */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                    className="rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`} />

                    <div className="relative h-full p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-primary font-semibold text-xs">{member.role}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlippedIndex(null);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        <p className="text-gray-200 text-sm leading-relaxed">{member.desc}</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedIndex(null);
                        }}
                        className="mt-4 w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* --- MOBILE GRID (Responsive Fallback) --- */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member, idx) => {
            const isMobileFlipped = flippedIndex === idx;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="relative aspect-[4/5]"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  animate={{ rotateY: isMobileFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Face Avant Mobile */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                    className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{member.name}</h3>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{member.role}</p>

                      <button
                        onClick={() => setFlippedIndex(idx)}
                        className="mt-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                      >
                        En savoir plus sur {member.name}
                      </button>
                    </div>
                  </div>

                  {/* Face Arrière Mobile */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                    className="rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`} />

                    <div className="relative h-full p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-primary font-semibold text-xs">{member.role}</p>
                        </div>
                        <button
                          onClick={() => setFlippedIndex(null)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        <p className="text-gray-200 text-sm leading-relaxed">{member.desc}</p>
                      </div>

                      <button
                        onClick={() => setFlippedIndex(null)}
                        className="mt-4 w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://calendly.com/aura-academie/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_30px_rgba(234,75,113,0.6)]"
          >
            <span className="relative z-10">Discuter avec la team</span>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Team;
