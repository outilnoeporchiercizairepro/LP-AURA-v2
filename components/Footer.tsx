import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <img src="/aura.png" alt="AURA" className="h-10 mx-auto md:mx-0 mb-2" />
          <p className="text-gray-500 text-sm">La seule formation IA créée par des experts.</p>
        </div>

        <div>
          <Link
            to="/cgv"
            className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
          >
            Conditions Générales de Vente
          </Link>
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
