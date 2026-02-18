import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

const Team: React.FC = () => {
  const { utmSourceLabel } = useTracking();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/appel-strategique-ia-15min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Noé",
      role: "Spécialiste en Déploiement & Vente",
      desc: "Expert du closing et de la stratégie commerciale. Il t'apprend à vendre tes solutions IA et à développer ton activité rapidement qu'elle soit en ligne ou en physique.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765226175618-b7yhs6.png",
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
      name: "Imrane",
      role: "Ingénieur IA et Cloud",
      desc: "Développeur expert en IA et automatisation. Co-Fondateur de VeliosAI, il te guide dans la création d'applications IA robustes et la mise en production de tes projets.",
      image: "https://qixufxuiscypehxupiqh.supabase.co/storage/v1/object/public/images/public/1765226180802-v4ll0w.png",
      color: "from-secondary/20 to-secondary/5"
    }
  ];

  const offsetBase = (team.length - 1) / 2;

  return (
    <section id="team" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
              Team
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3 flex-wrap">
            L'Équipe
            <img src="/aura.png" alt="AURA" className="inline h-10 md:h-14" />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            3 experts aux compétences complémentaires pour vous accompagner de A à Z.
          </p>
        </motion.div>

        {/* --- DESKTOP FAN DECK (ANIMATION AVANCÉE) --- */}
        <div ref={containerRef} className="hidden lg:flex justify-center items-center h-[500px] w-full relative -mt-10 perspective-[1000px]">
          {team.map((member, index) => {
            const offset = index - offsetBase;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            let animateState = {
              x: 0,
              y: 100,
              rotate: 0,
              scale: 0.9,
              zIndex: index,
              opacity: 0,
              filter: 'brightness(1)',
            };

            if (isInView) {
              animateState = {
                x: offset * 240,
                y: 0,
                rotate: offset * 2,
                scale: 1,
                zIndex: index,
                opacity: 1,
                filter: 'brightness(1) blur(0px)',
              };

              if (isAnyHovered) {
                if (isHovered) {
                  animateState = {
                    x: offset * 240,
                    y: -40,
                    rotate: 0,
                    scale: 1.15,
                    zIndex: 50,
                    opacity: 1,
                    filter: 'brightness(1.1) drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
                  };
                } else {
                  const pushAside = index < hoveredIndex ? -30 : 30;
                  animateState = {
                    x: (offset * 240) + pushAside,
                    y: 10,
                    rotate: offset * 2,
                    scale: 0.98,
                    zIndex: index,
                    opacity: 0.8,
                    filter: 'brightness(0.7) blur(1px)',
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
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000]/95" />

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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent" />

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
          <ShinyButton
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuter avec la team
          </ShinyButton>
        </motion.div>

      </div>
    </section>
  );
};

export default Team;
