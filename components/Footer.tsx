import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#01040f] border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <img src="/design_sans_titre_-_2025-12-09t224556.947.png" alt="AURA" className="h-10 mx-auto md:mx-0 mb-2" />
          <p className="text-gray-500 text-sm">Formation IA Avancée pour opérateurs d'élite.</p>
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