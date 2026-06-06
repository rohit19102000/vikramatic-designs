'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'brand-identity',
    icon: '✦',
    title: 'Brand Identity',
    tagline: 'Identity that commands presence',
    description: 'We craft comprehensive visual identities that tell your story with clarity and impact.',
    tools: ['Illustrator', 'InDesign', 'Photoshop', 'Brand Guidelines'],
    color: '#E94560',
    span: 'md:col-span-2',
  },
  {
    id: 'video-motion',
    icon: '◈',
    title: 'Video & Motion',
    tagline: 'Stories in motion',
    description: 'Cinematic brand films, motion graphics, and social reels that captivate and convert.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema 4D'],
    color: '#F5A623',
    span: 'md:col-span-1',
  },
  {
    id: 'ui-design',
    icon: '◲',
    title: 'UI Design',
    tagline: 'Interfaces that feel inevitable',
    description: 'User-centered design systems and interfaces that delight at every interaction.',
    tools: ['Figma', 'Protopie', 'Framer', 'Design Systems'],
    color: '#E94560',
    span: 'md:col-span-1',
  },
  {
    id: 'web-dev',
    icon: '⬡',
    title: 'Web Development',
    tagline: 'Built to perform',
    description: 'High-converting WordPress sites and custom Next.js builds with pixel-perfect execution.',
    tools: ['WordPress', 'Next.js', 'WooCommerce', 'Elementor Pro'],
    color: '#F5A623',
    span: 'md:col-span-2',
  },
  {
    id: 'automation',
    icon: '⟳',
    title: 'Workflow Automation',
    tagline: 'Systems that work while you sleep',
    description: 'End-to-end automation of business processes, CRMs, and marketing funnels.',
    tools: ['Zapier', 'n8n', 'Make (Integromat)', 'Airtable'],
    color: '#E94560',
    span: 'md:col-span-1',
  },
  {
    id: 'social-media',
    icon: '◎',
    title: 'Social Media',
    tagline: 'Content that stops the scroll',
    description: 'Strategy, content creation, and community management that builds loyal audiences.',
    tools: ['Buffer', 'Canva Pro', 'CapCut', 'Meta Business'],
    color: '#F5A623',
    span: 'md:col-span-1',
  },
  {
    id: 'photography',
    icon: '⊙',
    title: 'Photography',
    tagline: 'Visuals worth a thousand sales',
    description: 'Product, brand, and editorial photography that elevates your visual presence.',
    tools: ['Lightroom', 'Capture One', 'Photoshop', 'Studio Setup'],
    color: '#F5A623',
    span: 'md:col-span-1',
  },
  {
    id: 'content',
    icon: '▣',
    title: 'Content Production',
    tagline: 'Volume without compromise',
    description: 'Scalable content systems: scripts, copy, visuals, and repurposing workflows.',
    tools: ['Notion', 'ChatGPT/Claude', 'Descript', 'Opus Clip'],
    color: '#E94560',
    span: 'md:col-span-1',
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div className={`flip-card h-[280px] ${service.span}`}>
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className="flip-card-front glass flex flex-col justify-between p-7 border border-white/5 hover:border-white/10 transition-colors group"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div>
            <span className="text-3xl mb-4 block" style={{ color: service.color }}>
              {service.icon}
            </span>
            <h3 className="font-display font-bold text-[#F0F0F0] text-xl mb-2">
              {service.title}
            </h3>
            <p className="text-[#888888] text-sm">{service.tagline}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#555555]">
            <span>Hover to explore</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back p-7 flex flex-col justify-between"
          style={{ background: `linear-gradient(135deg, ${service.color}15, rgba(255,255,255,0.03))`, border: `1px solid ${service.color}30` }}
        >
          <div>
            <p className="text-[#F0F0F0] text-sm leading-relaxed mb-5">{service.description}</p>
            <div className="space-y-1">
              <p className="text-xs text-[#888888] uppercase tracking-widest mb-2">Tools & Tech</p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${service.color}40`,
                      color: service.color,
                      background: `${service.color}10`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-semibold text-[#F0F0F0] hover:text-[#E94560] transition-colors"
          >
            Get a quote →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(
        gridRef.current?.querySelectorAll('.flip-card') || [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 md:py-40 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="line-decor" />
              <span className="text-[#E94560] text-xs tracking-[0.3em] uppercase font-body">What We Do</span>
            </div>
            <h2 className="font-display font-bold text-[#F0F0F0] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Eight Disciplines.<br />
              <span className="text-gradient">One Studio.</span>
            </h2>
          </div>
          <p className="text-[#888888] font-body max-w-sm text-sm leading-relaxed">
            Hover any card to reveal the tools and technologies behind each service.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
