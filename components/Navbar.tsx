import React, { useState, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

const Navbar: React.FC = () => {
  const { utmSourceLabel } = useTracking();
  const [isOpen, setIsOpen] = useState(false);

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/appel-strategique-ia-15min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

  const navLinks = [
    { name: 'Programme', href: '/#content' },
    { name: 'Résultats', href: '/#benefits' },
    { name: 'Avis', href: '/#reviews' },
    { name: 'Équipe', href: '/#team' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <img src="/aura.png" alt="AURA" className="h-8" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20"
              >
                Rejoindre AURA
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#000000] border-b border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-primary hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block mt-4 bg-aura-gradient hover:opacity-90 text-white px-5 py-3 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all"
              >
                Rejoindre AURA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
