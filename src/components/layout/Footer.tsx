'use client';

const footerLinks = {
  Services: ['Brand Identity', 'Video & Motion', 'UI Design', 'Web Development', 'Automation', 'Social Media'],
  Company: ['About', 'Portfolio', 'Process', 'Testimonials', 'Contact'],
};

const socials = [
  { name: 'Instagram', href: '#', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.49 0 2.87.41 4.06 1.13L17.5 4.69A9.89 9.89 0 0012 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-1.53-.38-2.97-1.06-4.22L17.5 9.5c.32.79.5 1.63.5 2.5 0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7zm0 2a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3.5a1 1 0 100 2 1 1 0 000-2z' },
  { name: 'LinkedIn', href: '#', icon: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
  { name: 'Behance', href: '#', icon: 'M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H8.251c2.938 0 4.814-1.002 4.814-3.87 0-1.901-1.405-3.083-3.312-3.083H5.904V12h-2.44v7.988zm1.838-1.596v-4.597h1.63c.872 0 2.015.21 2.015 2.179 0 2.006-1.143 2.418-2.08 2.418H6.304z' },
  { name: 'Twitter/X', href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4 L28 4 L16 28 Z" stroke="#E94560" strokeWidth="2" fill="rgba(233,69,96,0.1)" />
                  <path d="M10 14 L22 14" stroke="#F5A623" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-display font-semibold text-[#F0F0F0] text-xl tracking-wider">
                Vikramatic Designs
              </span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed max-w-xs mb-6">
              We build brands that move people. A full-service creative studio crafting digital experiences that leave lasting impressions.
            </p>
            <p className="text-[#E94560] font-display text-sm tracking-widest uppercase">
              We Build Brands That Move People
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-[#F0F0F0] text-sm tracking-wider uppercase mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#888888] text-sm hover:text-[#E94560] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#555555] text-xs">
            © 2025 Vikramatic Designs. All rights reserved. Crafted with ♥ and caffeine.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-[#555555] hover:text-[#E94560] transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
