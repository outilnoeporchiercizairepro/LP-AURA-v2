import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, Layout, Database } from 'lucide-react';

const WhatIsAISystem: React.FC = () => {
  const components = [
    {
      icon: <Workflow className="w-8 h-8" />,
      title: 'n8n',
      description: 'Le moteur d\'automatisation'
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: 'Interface graphique',
      description: 'Plus de valeur pour le client'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Base de données',
      description: 'Une infra complète et dédiée'
    }
  ];

  return (
    <section className="py-20 bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
            C'est quoi un système IA ?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {components.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-surface/50 border border-slate-800"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 text-gray-400"
          >
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-lg font-semibold text-white">+</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            <span className="text-primary font-semibold">n8n</span> + une{' '}
            <span className="text-secondary font-semibold">interface graphique</span> par dessus qui ajoute plus de valeur au client + une{' '}
            <span className="text-primary font-semibold">base de données</span> dédiée pour avoir une infra complète
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsAISystem;
