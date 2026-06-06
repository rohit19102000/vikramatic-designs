'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials, clientLogos } from '@/lib/testimonials-data';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623">
          <path d="M7 1l1.545 3.131L12 4.635 9.5 7.072 10.09 11 7 9.131 3.91 11 4.5 7.072 2 4.635l3.455-.504z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Auto-loop
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const activeTestimonial = testimonials[current];

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 md:py-40 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="line-decor" />
            <span className="text-[#E94560] text-xs tracking-[0.3em] uppercase font-body">Client Stories</span>
            <span className="line-decor" />
          </div>
          <h2 className="font-display font-bold text-[#F0F0F0] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Words That<br />
            <span className="text-gradient">Mean Everything.</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 md:p-12 relative"
            >
              {/* Giant quote mark */}
              <div
                className="font-display text-[8rem] leading-none absolute top-0 left-8 opacity-10 pointer-events-none select-none"
                style={{ color: activeTestimonial.color }}
              >
                &ldquo;
              </div>

              <StarRating count={activeTestimonial.rating} />

              <blockquote className="font-display font-medium text-[#F0F0F0] leading-relaxed mb-8 relative z-10"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${activeTestimonial.color}, ${activeTestimonial.color}88)` }}
                >
                  {activeTestimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#F0F0F0] text-sm">{activeTestimonial.author}</p>
                  <p className="text-[#888888] text-xs">{activeTestimonial.title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); resetTimer(); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    background: i === current ? '#E94560' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { prev(); resetTimer(); }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E94560] hover:text-[#E94560] transition-all"
                aria-label="Previous"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => { next(); resetTimer(); }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E94560] hover:text-[#E94560] transition-all"
                aria-label="Next"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Logo Marquee */}
        <div className="mt-20 overflow-hidden">
          <p className="text-center text-[#555555] text-xs tracking-widest uppercase mb-8">
            Trusted by ambitious brands
          </p>
          <div className="relative flex overflow-x-hidden">
            <div className="marquee-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 flex-shrink-0 opacity-30 hover:opacity-70 transition-opacity"
                >
                  <div className="w-2 h-2 rounded-full bg-[#E94560]" />
                  <span className="font-display font-semibold text-[#F0F0F0] text-sm tracking-widest">
                    {logo.abbr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
