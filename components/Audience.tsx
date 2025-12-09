import React from 'react';
import { Rocket, Laptop, Code2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Audience: React.FC = () => {
  const targets = [
    {
      icon: <Rocket className="w-8 h-8 text-secondary" />,
      title: "Entrepreneurs",
      desc: "Qui veulent pivoter vers l'IA ou booster leur business existant."
    },
    {
      icon: <Laptop className="w-8 h-8 text-primary" />,
      title: "Freelances & Agences",
      desc: "Pour proposer des offres IA facturées 2x à 5x plus cher."
    },
    {
      icon: <Code2 className="w-8 h-8 text-secondary" />,
      title: "Développeurs",
      desc: "Qui souhaitent maîtriser la stack IA moderne et les agents."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Marketeurs",
      desc: "Orientés performance, cherchant à automatiser l'acquisition."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-background relative border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AURA s'adresse à ceux qui veulent <span className="text-secondary">changer de vie</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            L'IA arrive. La vague est là. On cherche des personnes motivées qui veulent se bouger, pas des spectateurs qui regardent passer les opportunités.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {targets.map((target, idx) => (
            <motion.div 
              variants={item}
              key={idx} 
              className="group p-6 rounded-2xl bg-surface border border-slate-800 hover:border-primary/50 transition-all duration-300 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block group-hover:bg-white/10 transition-colors ring-1 ring-white/10">
                {target.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{target.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{target.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://calendly.com/aura-academie/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(234,75,113,0.3)] hover:shadow-[0_0_30px_rgba(234,75,113,0.5)] transform hover:-translate-y-1"
          >
            Réserver mon appel découverte
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Audience;