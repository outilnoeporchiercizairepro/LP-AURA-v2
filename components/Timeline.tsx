import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Target, Handshake, ArrowRight, ChevronDown } from 'lucide-react';

interface TimelineStep {
  day: string;
  title: string;
  icon: React.ReactNode;
}

const Timeline: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      day: 'J0',
      title: "J'intègre AURA",
      icon: <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="h-8 w-auto brightness-0 invert" />
    },
    {
      day: 'J7',
      title: "Je comprends les bases des systèmes IA et leurs cas d'usage concrets",
      icon: <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />
    },
    {
      day: 'J14',
      title: "Je maîtrise n8n et les fondamentaux du vibe coding",
      icon: <Code className="w-7 h-7 text-white" strokeWidth={2} />
    },
    {
      day: 'J21',
      title: "J'ai une offre structurée et une méthode claire pour prospecter",
      icon: <Target className="w-7 h-7 text-white" strokeWidth={2} />
    },
    {
      day: 'J30',
      title: "Je signe mon premier client",
      icon: <Handshake className="w-7 h-7 text-white" strokeWidth={2} />
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Je vends ma première infrastructure à 3k minimum
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Une roadmap claire et progressive pour passer de débutant à opérateur IA en 30 jours
          </p>
        </motion.div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="flex items-center justify-between relative">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex flex-col items-center flex-1"
                  >
                    {/* Circle with icon */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg mb-6">
                      {step.icon}
                    </div>

                    {/* Day badge */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 border border-primary/30 text-primary font-bold text-sm mb-3">
                      {step.day}
                    </div>

                    {/* Description */}
                    <div className="text-center max-w-[200px]">
                      <p className="text-gray-300 text-sm font-medium leading-relaxed">
                        {step.title}
                      </p>
                    </div>
                  </motion.div>

                  {/* Arrow between steps */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                      className="flex-shrink-0 mb-32"
                    >
                      <ArrowRight className="w-10 h-10 text-secondary" strokeWidth={3} />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-6 relative"
                  >
                    {/* Circle with icon */}
                    <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-primary/30 text-primary font-bold text-xs mb-3">
                        {step.day}
                      </div>
                      <p className="text-gray-300 text-sm font-medium leading-relaxed">
                        {step.title}
                      </p>
                    </div>
                  </motion.div>

                  {/* Arrow between steps */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="flex justify-center ml-10"
                    >
                      <ChevronDown className="w-8 h-8 text-secondary" strokeWidth={3} />
                    </motion.div>
                  )}
                </React.Fragment>
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
