import React from 'react';
import Hero from '../components/Hero';
import Audience from '../components/Audience';
import SocialProof from '../components/SocialProof';
import Team from '../components/Team';
import Benefits from '../components/Benefits';
import Content from '../components/Content';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Audience />
      <SocialProof />
      <Team />
      <Benefits />
      <Content />
      <Comparison />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Home;
