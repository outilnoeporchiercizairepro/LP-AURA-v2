import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Audience from './components/Audience';
import SocialProof from './components/SocialProof';
import Pillars from './components/Pillars';
import Team from './components/Team';
import Benefits from './components/Benefits';
import Comparison from './components/Comparison';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MediaUpload from './components/MediaUpload';

const App: React.FC = () => {
  return (
    <div className="bg-[#020617] min-h-screen text-gray-200 font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Audience />
        <SocialProof />
        <Pillars />
        <Team />
        <Benefits />
        <Comparison />
        <MediaUpload />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;