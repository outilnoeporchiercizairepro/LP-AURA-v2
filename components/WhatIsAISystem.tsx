import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Database, Bot } from 'lucide-react';

const WhatIsAISystem: React.FC = () => {
  const components = [
    {
      icon: <Bot className="w-8 h-8 text-white" />,
      title: 'Agents et Automatisations IA',
      description: ''
    },
    {
      icon: <Layout className="w-8 h-8 text-white" />,
      title: 'Interface graphique',
      description: ''
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: 'Bases de données',
      description: ''
    }
  ];

  return (
    <section className="pt-10 pb-20 bg-transparent relative overflow-hidden">
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
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
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
            className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            Un <span className="text-white font-medium">système complet</span> qui ne se contente pas d’automatiser : il <span className="text-primary font-medium">structure les données</span>, centralise les opérations et offre une <span className="text-secondary font-medium">interface claire</span> pour piloter l’activité. Résultat : <span className="text-white font-medium">moins de tâches manuelles</span>, plus de contrôle, une exécution plus rapide et une <span className="bg-aura-gradient bg-clip-text text-transparent font-bold">valeur perçue</span> qui augmente fortement côté client.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsAISystem;
