import React from 'react';
import Hero from '../components/Hero';
import Audience from '../components/Audience';
import SocialProof from '../components/SocialProof';
import Pillars from '../components/Pillars';
import Team from '../components/Team';
import Benefits from '../components/Benefits';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Audience />
      <SocialProof />
      <Pillars />
      <Team />
      <Benefits />
      <Comparison />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Home;
