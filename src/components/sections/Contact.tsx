'use client';

import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  brief: string;
};

const services = [
  'Brand Identity',
  'Video & Motion Graphics',
  'UI Design',
  'WordPress Web Development',
  'Workflow Automation',
  'Social Media Management',
  'Photography & Video Production',
  'Multiple Services / Not sure yet',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
      gsap.fromTo(rightRef.current, { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, source: 'vikramatic-designs-website' }),
        });
      }
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 md:py-40 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="line-decor" />
            <span className="text-[#E94560] text-xs tracking-[0.3em] uppercase font-body">Get In Touch</span>
          </div>
          <h2 className="font-display font-bold text-[#F0F0F0] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Let&apos;s Build Something<br />
            <span className="text-gradient">Remarkable.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Form */}
          <div ref={leftRef}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="form-group">
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    placeholder=" "
                    className={errors.name ? 'border-[#E94560]!' : ''}
                  />
                  <label htmlFor="name">Your Name *</label>
                  {errors.name && <p className="text-[#E94560] text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                    })}
                    type="email"
                    id="email"
                    placeholder=" "
                  />
                  <label htmlFor="email">Email Address *</label>
                  {errors.email && <p className="text-[#E94560] text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Company */}
              <div className="form-group">
                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  placeholder=" "
                />
                <label htmlFor="company">Company / Brand</label>
              </div>

              {/* Service dropdown */}
              <div className="form-group">
                <select
                  {...register('service', { required: 'Please select a service' })}
                  id="service"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-[#E94560] text-xs mt-1">{errors.service.message}</p>}
              </div>

              {/* Brief */}
              <div className="form-group">
                <textarea
                  {...register('brief', { required: 'Brief is required', minLength: { value: 30, message: 'Please add more detail (min 30 chars)' } })}
                  id="brief"
                  rows={5}
                  placeholder=" "
                />
                <label htmlFor="brief">Tell us about your project *</label>
                {errors.brief && <p className="text-[#E94560] text-xs mt-1">{errors.brief.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-[#E94560] hover:bg-[#d13a52] disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(233,69,96,0.4)]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Message Sent! We&apos;ll be in touch.
                  </>
                ) : submitStatus === 'error' ? (
                  'Something went wrong. Try again.'
                ) : (
                  <>
                    Send Your Brief
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Info */}
          <div ref={rightRef} className="space-y-8">
            {/* Direct contact */}
            <div className="glass rounded-2xl p-7">
              <h3 className="font-display font-semibold text-[#F0F0F0] text-lg mb-5">Direct Contact</h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@vikramatic.com"
                  className="flex items-center gap-3 text-[#888888] hover:text-[#E94560] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E94560]/10 group-hover:bg-[#E94560]/20 flex items-center justify-center transition-colors flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E94560" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#555555] uppercase tracking-widest">Email</p>
                    <p className="text-[#F0F0F0] text-sm group-hover:text-[#E94560] transition-colors">hello@vikramatic.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-3 text-[#888888] hover:text-[#E94560] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E94560]/10 group-hover:bg-[#E94560]/20 flex items-center justify-center transition-colors flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E94560" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.05 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#555555] uppercase tracking-widest">Phone</p>
                    <p className="text-[#F0F0F0] text-sm group-hover:text-[#E94560] transition-colors">+91 99999 99999</p>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999?text=Hi%20Vikramatic!%20I%27d%20love%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-[#25D366]/20 hover:border-[#25D366]/50 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#F0F0F0] text-sm">Chat on WhatsApp</p>
                <p className="text-[#888888] text-xs">Usually responds within 2 hours</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#888888] group-hover:text-[#25D366] transition-colors">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Availability badge */}
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <span className="availability-dot" />
              <div>
                <p className="font-semibold text-[#F0F0F0] text-sm">Currently Available</p>
                <p className="text-[#888888] text-xs">Taking on 2–3 new projects this month</p>
              </div>
            </div>

            {/* Location */}
            <div className="text-[#555555] text-xs space-y-1">
              <p>📍 Based in Mumbai, India</p>
              <p>🕐 Mon–Sat, 10am–7pm IST</p>
              <p>✈️ Available globally for remote projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
