import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Target, Handshake } from 'lucide-react';

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
          <div className="relative max-w-6xl mx-auto">
            {/* Main horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2" />

            {/* Animated progress line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 -translate-y-1/2 origin-left"
            />

            {/* Animated cursor */}
            <motion.div
              initial={{ x: 0 }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-4"
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-lg shadow-cyan-400/50 border-2 border-cyan-400" />
              <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75" />
            </motion.div>

            <div className="flex justify-between items-center relative pt-32 pb-24">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center relative"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  {/* Day badge - Above timeline */}
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-white font-bold text-lg shadow-lg">
                      {step.day}
                    </div>
                  </div>

                  {/* Circle with icon - On the line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 flex items-center justify-center text-white shadow-xl"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Description - Below timeline */}
                  <div className="text-center max-w-[200px] mt-8">
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative max-w-md mx-auto pl-16">
            {/* Main vertical line */}
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-slate-800" />

            {/* Animated progress line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 origin-top"
            />

            {/* Animated cursor */}
            <motion.div
              initial={{ y: 0 }}
              whileInView={{ y: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute left-12 top-0 -translate-x-1/2 -translate-y-2 w-4 h-4"
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-lg shadow-cyan-400/50 border-2 border-cyan-400" />
              <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75" />
            </motion.div>

            <div className="space-y-16 py-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative flex items-center gap-6"
                >
                  {/* Circle with icon - On the line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute left-0 z-10 w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 flex items-center justify-center text-white shadow-xl"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="ml-32 flex-1">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-white font-bold text-sm mb-3 shadow-lg">
                      {step.day}
                    </div>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">
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
