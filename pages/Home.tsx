import React from 'react';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Timeline from '../components/Timeline';
import Team from '../components/Team';
import Benefits from '../components/Benefits';
import Content from '../components/Content';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import ScrollToTop from '../components/ScrollToTop';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <SocialProof />
      <Timeline />
      <Team />
      <Benefits />
      <Content />
      <Comparison />
      <Pricing />
      <FAQ />
      <ScrollToTop />
    </>
  );
};

export default Home;
