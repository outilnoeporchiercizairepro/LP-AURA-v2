import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Target, Handshake } from 'lucide-react';

interface TimelineStep {
  day: string;
  title: string;
  icon: React.ReactNode;
  isHighlight?: boolean;
}

const Timeline: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      day: 'J0',
      title: "J'intègre AURA",
      icon: <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="h-6 w-auto brightness-0 invert" />
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
    <section className="py-24 bg-surface/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

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
                    className={`mb-6 px-4 py-1.5 rounded-full font-bold text-sm border ${
                      step.isHighlight
                        ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-[0_0_30px_rgba(234,75,113,0.5)]'
                        : 'bg-card text-white border-slate-700'
                    }`}
                  >
                    {step.day}
                  </motion.div>

                  {/* Circle node */}
                  <div className="relative flex items-center justify-center w-full">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.4, type: "spring", stiffness: 200 }}
                      className={`relative z-10 flex items-center justify-center rounded-full border-4 ${
                        step.isHighlight
                          ? 'w-20 h-20 bg-gradient-to-br from-primary to-secondary border-primary/50 shadow-[0_0_40px_rgba(234,75,113,0.6)]'
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
                  <p className={`mt-6 text-center text-sm leading-relaxed max-w-[160px] ${
                    step.isHighlight ? 'text-white font-semibold' : 'text-gray-400'
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
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-center gap-5"
                >
                  {/* Circle node */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      className={`relative z-10 flex-shrink-0 flex items-center justify-center rounded-full border-4 ${
                        step.isHighlight
                          ? 'w-14 h-14 bg-gradient-to-br from-primary to-secondary border-primary/50 shadow-[0_0_30px_rgba(234,75,113,0.6)]'
                          : 'w-12 h-12 bg-card border-slate-700'
                      }`}
                    >
                      {step.icon}
                      {step.isHighlight && (
                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                      step.isHighlight
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'bg-card text-gray-300 border border-slate-700'
                    }`}>
                      {step.day}
                    </span>
                    <p className={`text-sm leading-relaxed ${
                      step.isHighlight ? 'text-white font-semibold' : 'text-gray-400'
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
          <a
            href="https://calendly.com/aura-academie/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,75,113,0.4)] hover:shadow-[0_6px_30px_rgba(234,75,113,0.6)]"
          >
            <span className="relative z-10">Démarrer mon parcours</span>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-lg"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
