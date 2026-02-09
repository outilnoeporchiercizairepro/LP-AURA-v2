import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Target, Handshake } from 'lucide-react';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

interface TimelineStep {
  day: string;
  title: string;
  icon: React.ReactNode;
  isHighlight?: boolean;
}

const Timeline: React.FC = () => {
  const { utmSourceLabel } = useTracking();

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/30min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

  const steps: TimelineStep[] = [
    {
      day: 'J0',
      title: "J'intègre AURA",
      icon: <img src="/aura.png" alt="AURA" className="h-6 w-auto brightness-0 invert" />
    },
    {
      day: 'J7',
      title: "Je comprends les bases des systèmes IA et leurs cas d'usage concrets",
      icon: <Lightbulb className="w-5 h-5 text-white" strokeWidth={2} />
    },
    {
      day: 'J14',
      title: "Je maîtrise n8n et les fondamentaux du vibe coding",
      icon: <Code className="w-5 h-5 text-white" strokeWidth={2} />
    },
    {
      day: 'J21',
      title: "J'ai une offre structurée et une méthode claire pour prospecter",
      icon: <Target className="w-5 h-5 text-white" strokeWidth={2} />
    },
    {
      day: 'J30',
      title: "Je signe mon premier client",
      icon: <Handshake className="w-6 h-6 text-white" strokeWidth={2} />,
      isHighlight: true
    }
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Je vends ma première infrastructure à 3k minimum
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Une roadmap claire et progressive pour passer de débutant à opérateur IA en 30 jours
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Steps container */}
            <div className="flex justify-between items-start">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3 }}
                  className="flex flex-col items-center relative"
                  style={{ width: '20%' }}
                >
                  {/* Day badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.5, type: "spring", stiffness: 300 }}
                    className={`mb-6 px-4 py-1.5 rounded-full font-bold text-sm border ${step.isHighlight
                      ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-[0_0_30px_rgba(250,12,249,0.5)]'
                      : 'bg-card text-white border-slate-700'
                      }`}
                  >
                    {step.day}
                  </motion.div>

                  {/* Circle node with line */}
                  <div className="relative flex items-center justify-center w-full">
                    {/* Line segment - only on the right side of each node (except last) */}
                    {idx < steps.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.15 + 0.3 }}
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                        style={{
                          width: 'calc(100% + 1px)',
                          marginLeft: step.isHighlight ? '40px' : '28px'
                        }}
                      />
                    )}

                    {/* Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.4, type: "spring", stiffness: 200 }}
                      className={`relative z-10 flex items-center justify-center rounded-full border-4 ${step.isHighlight
                        ? 'w-20 h-20 bg-gradient-to-br from-primary to-secondary border-primary/50 shadow-[0_0_40px_rgba(250,12,249,0.6)]'
                        : 'w-14 h-14 bg-card border-slate-700'
                        }`}
                    >
                      {step.icon}
                      {step.isHighlight && (
                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      )}
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className={`mt-6 text-center text-sm leading-relaxed max-w-[160px] ${step.isHighlight ? 'text-white font-semibold' : 'text-gray-400'
                    }`}>
                    {step.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Continuous vertical line - centered on circles (w-12 = 48px, so center at 24px) */}
            <div className="absolute top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" style={{ left: '24px' }} />

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-center gap-4"
                >
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                    className={`relative z-10 flex-shrink-0 flex items-center justify-center rounded-full border-4 ${step.isHighlight
                      ? 'w-12 h-12 bg-gradient-to-br from-primary to-secondary border-primary/50 shadow-[0_0_30px_rgba(250,12,249,0.6)]'
                      : 'w-12 h-12 bg-card border-slate-700'
                      }`}
                  >
                    {step.icon}
                    {step.isHighlight && (
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 py-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${step.isHighlight
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-card text-gray-300 border border-slate-700'
                      }`}>
                      {step.day}
                    </span>
                    <p className={`text-sm leading-relaxed ${step.isHighlight ? 'text-white font-semibold' : 'text-gray-400'
                      }`}>
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <ShinyButton
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Démarrer mon parcours
          </ShinyButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
