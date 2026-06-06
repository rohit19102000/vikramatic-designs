'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your brand, audience, and competitive landscape. We ask the uncomfortable questions others avoid.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="8" />
        <path d="M16 8V6M16 26v-2M8 16H6M26 16h-2M10.34 10.34l-1.42-1.42M23.08 23.08l-1.42-1.42M10.34 21.66l-1.42 1.42M23.08 8.92l-1.42 1.42" />
      </svg>
    ),
    color: '#E94560',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We synthesize insights into a clear creative brief and strategic roadmap. No fluff — just direction.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 26l8-8 4 4 8-12" />
        <circle cx="26" cy="6" r="2" />
      </svg>
    ),
    color: '#F5A623',
    duration: '1 week',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Concepts come to life. We iterate rapidly with structured feedback loops — three rounds, always on time.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="14" y="14" width="12" height="12" rx="2" />
        <path d="M11 11h2v2h-2z" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: '#E94560',
    duration: '2–4 weeks',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Launch-ready assets, files, and systems handed over with full documentation. We don\'t disappear.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 16l6 6 14-12" />
        <circle cx="22" cy="10" r="6" strokeDasharray="3 3" />
      </svg>
    ),
    color: '#F5A623',
    duration: '1 week',
  },
  {
    number: '05',
    title: 'Optimize',
    description: 'Post-launch monitoring, A/B testing, and refinement. We track what moves the needle.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 6v4M16 22v4M6 16h4M22 16h4" />
        <circle cx="16" cy="16" r="6" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: '#E94560',
    duration: 'Ongoing',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } }
      );

      if (prefersReduced) return;

      // Horizontal scroll pin on desktop
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth - window.innerWidth;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (track) {
              track.style.transform = `translateX(-${self.progress * totalWidth}px)`;
            }
          },
        });

        // Animate step cards as they come into view
        const stepEls = track.querySelectorAll('.process-step-inner');
        stepEls.forEach((step, i) => {
          gsap.fromTo(
            step,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                once: true,
              }
            }
          );
        });
      });

      // Mobile: vertical stagger
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '.process-step-inner',
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: trackRef.current, start: 'top 75%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-40">
        {/* Heading (outside scroll track) */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="line-decor" />
            <span className="text-[#E94560] text-xs tracking-[0.3em] uppercase font-body">How We Work</span>
          </div>
          <h2 className="font-display font-bold text-[#F0F0F0] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            From Vision<br />
            <span className="text-gradient">to Reality.</span>
          </h2>
        </div>

        {/* Scroll Track */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-0 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0" style={{ zIndex: 0 }}>
            {/* Decorative connecting dots between steps */}
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="process-step relative flex-shrink-0 md:w-[320px] md:px-10 py-8 first:pl-0"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 right-0 w-10 h-px"
                  style={{ background: `linear-gradient(to right, ${step.color}60, ${steps[index + 1].color}60)` }}
                />
              )}

              <div className="process-step-inner glass rounded-2xl p-7 border border-white/5 h-full">
                {/* Number */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-display font-bold text-5xl opacity-15 select-none"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                  <span className="text-[#555555] text-xs tracking-widest uppercase">{step.duration}</span>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${step.color}15`, color: step.color }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-[#F0F0F0] text-xl mb-3"
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#888888] font-body text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center gap-1 mt-6 text-xs" style={{ color: step.color }}>
                    <span>Then</span>
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                      <path d="M0 5h18M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[#555555]">{steps[index + 1].title}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
