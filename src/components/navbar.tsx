'use client';

import { useState, useEffect } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

export function NavLink({ href, children, mobile = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`relative group py-4 px-3 transition-all duration-300 hover:text-orange-500 ${
        mobile ? 'text-lg font-medium' : 'text-sm uppercase tracking-widest'
      }`}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF4500] to-[#FF1744] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileMenuLinks = [
  { href: '#', label: 'Inicio' },
  { href: '#', label: 'Modelos' },
  { href: '#', label: 'Características' },
  { href: '#', label: 'Testimonios' },
  { href: '#', label: 'Contacto' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full p-8">
        <nav className="flex-1 -mt-6 space-y-2">
          {mobileMenuLinks.map((link) => (
            <NavLink key={link.href} href={link.href} mobile>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={onClose}
          className="mt-6 w-full py-4 bg-gradient-to-r from-[#FF4500] to-[#FF1744] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity"
        >
          Cerrar Menú
        </button>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevenir hidratación SSR
  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="h-[72px]" /> {/* Placeholder para evitar scroll jump */}
      </nav>
    );
  }

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="h-[72px]">
          <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-[#FF4500] to-[#FF1744] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-shadow duration-300">
                  <span className="text-white font-bold text-xl italic">V</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4500] to-[#FF1744] opacity-0 blur-sm rounded-full group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight italic group-hover:text-orange-400 transition-colors duration-300">
                VELoCE
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-1 bg-black/50 backdrop-blur-xl rounded-full px-6 py-2.5 border border-white/10 shadow-inner">
              {['Inicio', 'Modelos', 'Características', 'Testimonios', 'Contacto'].map((link) => (
                <li key={link}>
                  <NavLink href={`#${link.toLowerCase()}`}>{link}</NavLink>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <a
              href="#contacto"
              className="hidden md:inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF4500] to-[#FF1744] text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Reservar Ahora
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[72px] right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="6" y2="18" />
            <line x1="18" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </button>

      {/* Spacer para evitar superposición */}
      {scrolled && (
        <div className={`h-[72px] w-full bg-gradient-to-b from-black/60 to-transparent transition-all duration-300`} />
      )}
    </>
  );
}
