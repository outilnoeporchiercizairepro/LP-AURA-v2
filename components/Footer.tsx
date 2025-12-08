import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#01040f] border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">AURA</h2>
          <p className="text-gray-500 text-sm">Formation IA Avancée pour opérateurs d'élite.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
          <a href="mailto:contact@aura-formation.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-900/50 text-center">
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} AURA Formation. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;