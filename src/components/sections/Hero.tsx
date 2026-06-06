'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

// ── Dynamically import Three.js canvas — browser only, no SSR ───
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0D0D0D]" />,
});

// ── Scramble Text Hook ──────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
const WORDS = ['Branding.', 'Motion.', 'UI Design.', 'Web Dev.'];

function useScramble(words: string[], interval = 2800) {
  const [displayText, setDisplayText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scramble = (target: string, onDone: () => void) => {
      if (prefersReduced) { setDisplayText(target); onDone(); return; }
      let iteration = 0;
      const maxIterations = target.length * 3;
      const id = setInterval(() => {
        setDisplayText(
          target.split('').map((char, idx) => {
            if (idx < Math.floor(iteration / 3)) return char;
            if (char === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        iteration++;
        if (iteration > maxIterations) {
          clearInterval(id);
          setDisplayText(target);
          onDone();
        }
      }, 30);
    };

    const timer = setInterval(() => {
      const nextIndex = (wordIndex + 1) % words.length;
      setWordIndex(nextIndex);
      scramble(words[nextIndex], () => {});
    }, interval);

    return () => clearInterval(timer);
  }, [wordIndex, words, interval]);

  return displayText;
}

// ── Main Hero ───────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrambledWord = useScramble(WORDS);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Entrance animation timeline
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      headlineRef.current,
      { y: 120, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' }
    )
    .fromTo(
      subRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
      '-=0.5'
    )
    .fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Canvas Background — dynamically loaded, no SSR */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas mousePos={mousePos} />
      </div>

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-[#0D0D0D]/40 to-[#0D0D0D]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Pre-heading */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="block w-8 h-px bg-[#E94560]" />
          <span className="text-[#E94560] font-body text-xs tracking-[0.3em] uppercase">Full-Service Creative Studio</span>
          <span className="block w-8 h-px bg-[#E94560]" />
        </div>

        {/* Main Headline */}
        <div className="overflow-hidden mb-4">
          <h1
            ref={headlineRef}
            className="font-display font-bold leading-[0.9] text-[#F0F0F0]"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              letterSpacing: '-0.02em',
            }}
          >
            We Build Brands
          </h1>
        </div>
        <div className="overflow-hidden mb-10">
          <div
            className="font-display font-bold leading-[0.9]"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="text-gradient">That Move People</span>
          </div>
        </div>

        {/* Cycling word */}
        <p
          ref={subRef}
          className="font-body text-[#888888] text-lg md:text-xl mb-4"
        >
          Specializing in{' '}
          <span className="font-display font-semibold text-[#F5A623] tabular-nums inline-block min-w-[160px] text-left">
            {scrambledWord}
          </span>
        </p>

        <p className="font-body text-[#666666] text-sm mb-12 max-w-md mx-auto">
          From concept to launch — we craft digital experiences that convert, inspire, and endure.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#portfolio"
            data-magnetic
            className="group flex items-center gap-3 bg-[#E94560] hover:bg-transparent border border-[#E94560] text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(233,69,96,0.5)]"
          >
            View Our Work
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            data-magnetic
            className="flex items-center gap-2 text-[#F0F0F0] border border-white/10 hover:border-white/30 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white/5"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 scroll-indicator"
        aria-label="Scroll down"
      >
        <span className="text-[#555555] text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="scroll-line" />
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-24 left-6 md:left-12 z-10 hidden md:block">
        <div className="text-[#333333] text-xs tracking-widest">
          EST. 2017 — CREATIVE STUDIO
        </div>
      </div>
      <div className="absolute bottom-24 right-6 md:right-12 z-10 hidden md:block">
        <div className="text-[#333333] text-xs tracking-widest">
          01 / 07
        </div>
      </div>
    </section>
  );
}
