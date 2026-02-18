'use client';

import React, { useRef, useMemo } from 'react';
import { BookOpen, CheckCircle, RefreshCw, Users } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTracking } from '../contexts/TrackingContext';
import { ShinyButton } from './ui/ShinyButton';

// GSAP SplitText is a premium plugin. Fallback provided.
// @ts-ignore
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, useGSAP);

const Hero: React.FC = () => {
  const { utmSourceLabel } = useTracking();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const microRefs = useRef<(HTMLLIElement | null)[]>([]);

  const currentMonth = new Date().toLocaleDateString('fr-FR', { month: 'long' });

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://calendly.com/aura-academie/30min';
    if (utmSourceLabel) {
      const url = new URL(baseUrl);
      url.searchParams.set('utm_source', utmSourceLabel);
      return url.toString();
    }
    return baseUrl;
  }, [utmSourceLabel]);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      document.fonts.ready.then(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Badge Animation
        if (badgeRef.current) {
          gsap.set(badgeRef.current, { autoAlpha: 0, y: -20 });
          tl.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
        }

        // Title Animation (SplitText or Fallback)
        if (typeof SplitText !== 'undefined') {
          const split = new SplitText(headerRef.current!, { type: 'lines' });
          gsap.set(split.lines, { filter: 'blur(10px)', y: 40, autoAlpha: 0 });
          tl.to(split.lines, { filter: 'blur(0px)', y: 0, autoAlpha: 1, duration: 1, stagger: 0.15 }, 0.2);
        } else {
          gsap.set(headerRef.current, { autoAlpha: 0, y: 30 });
          tl.to(headerRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0.2);
        }

        // Paragraph & CTA & Video
        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 20 });
          tl.to(paraRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.4);
        }
        if (videoRef.current) {
          gsap.set(videoRef.current, { autoAlpha: 0, scale: 0.95 });
          tl.to(videoRef.current, { autoAlpha: 1, scale: 1, duration: 1 }, 0.5);
        }

        // Micro Details (Bullet Points)
        const activeMicros = microRefs.current.filter(Boolean);
        if (activeMicros.length > 0) {
          gsap.set(activeMicros, { autoAlpha: 0, x: -10 });
          tl.to(activeMicros, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.1 }, 0.7);
        }

        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.9);
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen pt-32 pb-10 lg:pt-44 lg:pb-16 overflow-hidden bg-transparent">
      {/* Background Glows shifted to very subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/2 blur-[120px] rounded-full pointer-events-none -z-10 opacity-20" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary/2 blur-[100px] rounded-full pointer-events-none -z-10 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">

        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          3 places restantes pour {currentMonth}
        </div>

        {/* Headline */}
        <h1 ref={headerRef} className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}>
          Vas-tu laisser passer la plus grosse <br className="hidden md:block" />
          <span className="bg-aura-gradient bg-clip-text text-transparent font-bold animate-aurora bg-[length:200%_200%]">opportunité IA</span> de 2026 ?
        </h1>

        {/* Subhead */}
        <p ref={paraRef} className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10">
          Apprenez à construire des systèmes IA que les entreprises s'arrachent et générez vos premiers <span className="text-white font-medium">10 000 euros</span> par mois.
        </p>

        {/* Video Preview */}
        <div ref={videoRef} className="w-full max-w-4xl relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.tella.tv/video/vid_cmlqxus87007704k3d9e8ear2/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0"
              title="Vidéo de présentation AURA"
              allowFullScreen
              allowTransparency={true}
            />
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="mb-8 flex flex-wrap justify-center gap-8 md:gap-12 text-sm font-light text-gray-400">
          {[
            { icon: <BookOpen className="w-4 h-4" />, text: "+50h de cours" },
            { icon: <RefreshCw className="w-4 h-4" />, text: "Mises à jour continuelles" },
            { icon: <Users className="w-4 h-4" />, text: "Accompagnement" }
          ].map((item, idx) => (
            <li
              key={idx}
              ref={(el) => { microRefs.current[idx] = el; }}
              className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-primary/20 transition-colors"
            >
              <span className="text-primary/70">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center mb-10 w-full sm:w-auto text-center">
          <ShinyButton href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-lg">
            Réserver mon appel stratégique
          </ShinyButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
