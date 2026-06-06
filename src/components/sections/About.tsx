'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, suffix: '+', label: 'Years of Excellence' },
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '', label: 'Industries Served' },
  { value: 30, suffix: '+', label: 'Tools Mastered' },
];

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = counterRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (prefersReduced) {
          el.textContent = `${value}${suffix}`;
          return;
        }
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) el.textContent = `${Math.round(proxy.val)}${suffix}`;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix]);

  return (
    <div className="text-center md:text-left">
      <div className="font-display font-bold text-[#F0F0F0] mb-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <span ref={counterRef}>0{suffix}</span>
      </div>
      <p className="text-[#888888] text-sm font-body">{label}</p>
    </div>
  );
}

function TiltPhoto() {
  const photoRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !photoRef.current) return;

    const rect = photoRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20;

    gsap.to(photoRef.current, {
      rotateX: y,
      rotateY: x,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!photoRef.current) return;
    gsap.to(photoRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div
      ref={photoRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {/* Glow behind */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#E94560]/30 to-[#F5A623]/20 rounded-2xl blur-xl z-0" />
      <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10">
        <Image
          src="/founder.png"
          alt="Vikramatic — Studio Founder"
          width={480}
          height={560}
          className="object-cover w-full"
          priority
        />
        {/* Overlay label */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent">
          <p className="font-display font-semibold text-[#F0F0F0] text-lg">Vikram — Founder</p>
          <p className="text-[#E94560] text-xs tracking-widest uppercase mt-0.5">Creative Director</p>
        </div>
      </div>
      {/* Corner accent */}
      <div className="absolute top-4 right-4 z-20 w-8 h-8 border-t-2 border-r-2 border-[#F5A623]/60" />
      <div className="absolute bottom-20 left-4 z-20 w-8 h-8 border-b-2 border-l-2 border-[#F5A623]/60" />
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Stagger text blocks
      gsap.fromTo(
        textRef.current?.querySelectorAll('.reveal-item') || [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-40 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Story */}
          <div ref={textRef}>
            <div className="reveal-item flex items-center gap-3 mb-8">
              <span className="line-decor" />
              <span className="text-[#E94560] text-xs tracking-[0.3em] uppercase font-body">Our Story</span>
            </div>

            <h2 className="reveal-item font-display font-bold text-[#F0F0F0] leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              A Studio Built on<br />
              <span className="text-gradient">Bold Thinking.</span>
            </h2>

            <p className="reveal-item text-[#888888] font-body leading-relaxed mb-6 text-base">
              Vikramatic Designs was born from a simple belief: great design should do more than look beautiful — it should move, perform, and convert. Since 2017, we&apos;ve helped brands across 12 industries transform their visual identity and digital presence.
            </p>

            {/* Oversized quote */}
            <blockquote className="reveal-item relative border-l-2 border-[#E94560] pl-6 py-2 my-8">
              <p className="font-display font-semibold text-[#F0F0F0] leading-tight" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                &ldquo;Design is the silent ambassador of your brand. We make sure it speaks volumes.&rdquo;
              </p>
              <cite className="text-[#E94560] text-xs tracking-widest uppercase not-italic mt-3 block">— Vikram, Founder</cite>
            </blockquote>

            <p className="reveal-item text-[#888888] font-body leading-relaxed text-base">
              We operate at the intersection of strategy, aesthetics, and technology — delivering work that not only wins awards but drives real business outcomes.
            </p>

            {/* Stats row */}
            <div className="reveal-item mt-12 grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <AnimatedCounter key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* Right: Founder photo */}
          <div ref={rightRef} className="relative">
            <TiltPhoto />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E94560]/20 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E94560" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#F0F0F0] font-semibold text-sm">Top Rated Studio</p>
                  <p className="text-[#888888] text-xs">5.0 ★ on all platforms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
