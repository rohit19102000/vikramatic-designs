'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioProjects } from '@/lib/portfolio-data';

gsap.registerPlugin(ScrollTrigger);

const filters = ['All', 'Branding', 'Video', 'UI', 'Web', 'Automation'];

// ── Case Study Modal ──
function Modal({ project, onClose }: { project: typeof portfolioProjects[0] | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-xl" />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border border-white/10"
        style={{ background: '#111111' }}
      >
        {/* Header */}
        <div className={`h-48 bg-gradient-to-br ${project.bgGradient} flex items-end p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div>
            <span className="text-xs tracking-widest uppercase mb-2 block" style={{ color: project.color }}>
              {project.category} — Case Study
            </span>
            <h2 className="font-display font-bold text-[#F0F0F0] text-2xl md:text-3xl">{project.title}</h2>
          </div>
        </div>

        {/* Metric highlight */}
        <div className="px-8 py-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-3xl" style={{ color: project.color }}>
              {project.metric}
            </span>
            <span className="text-[#888888] text-sm">{project.metricLabel}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {[
            { label: 'The Challenge', text: project.challenge },
            { label: 'Our Approach', text: project.approach },
            { label: 'The Outcome', text: project.outcome },
          ].map(({ label, text }) => (
            <div key={label}>
              <h3 className="font-display font-semibold text-[#F0F0F0] text-sm uppercase tracking-widest mb-3">
                {label}
              </h3>
              <p className="text-[#888888] font-body leading-relaxed text-sm">{text}</p>
            </div>
          ))}

          {/* Tools */}
          <div>
            <h3 className="font-display font-semibold text-[#F0F0F0] text-sm uppercase tracking-widest mb-3">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#888888]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-[#E94560] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#d13a52] transition-colors"
          >
            Start a Similar Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Project Card ──
function ProjectCard({
  project,
  onClick,
}: {
  project: typeof portfolioProjects[0];
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    gsap.to(cardRef.current, { rotateX: y, rotateY: x, transformPerspective: 900, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden cursor-none border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {/* Card background */}
      <div className={`h-64 bg-gradient-to-br ${project.bgGradient} flex items-center justify-center relative`}>
        {/* Category icon */}
        <span className="text-5xl opacity-20 font-display font-bold text-white select-none">
          {project.category.charAt(0)}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0D0D0D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
            <div
              className="font-display font-bold text-2xl mb-1"
              style={{ color: project.color }}
            >
              {project.metric}
            </div>
            <p className="text-[#888888] text-xs">{project.metricLabel}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-[#F0F0F0] text-xs border border-white/20 px-4 py-2 rounded-full">
              View Case Study
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="p-5 bg-[#111111]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[#888888] text-xs uppercase tracking-widest mb-1">{project.category}</p>
            <h3 className="font-display font-semibold text-[#F0F0F0] text-base">{project.title}</h3>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
            style={{ background: `${project.color}20` }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3M8 2v5" stroke={project.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.tags.includes(activeFilter.toLowerCase()));

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 md:py-40 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="line-decor" />
            <span className="text-[#E94560] text-xs tracking-[0.3em] uppercase font-body">Selected Work</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display font-bold text-[#F0F0F0] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Work That<br />
              <span className="text-gradient">Speaks Results.</span>
            </h2>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-10 border-b border-white/5 pb-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
