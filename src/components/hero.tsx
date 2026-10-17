// Use client directive to enable hooks and interactivity on the client side.
// The Hero section is the main visual entrance with premium design elements, gradient effects, and call-to-action buttons that drive user engagement.
// Includes smooth fade-in animations using IntersectionObserver that can be reused across sections.

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
    onExploreModels?: () => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const heroContent = [
<span>Velocidad</span>,
<span>Pasión</span>,<span>Innovación</span>,
<span>{' '}</span>,
];

// Animated background particles for premium feel
function ParticleBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3 + 's',
    scale: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-orange-400/20 to-red-500/20"
          style={{
            left: `${p.left}%`,
            width: p.scale * 80 + 'px',
            height: p.scale * 80 + 'px',
            top: '-10%',
          }}
          initial={{ opacity: 0.4, y: -120 }}
          animate={{
            y: ['110%', '-15%'],
            x: `${Math.sin(p.id) * 30}%`,
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function Hero({ onExploreModels }: Readonly<HeroProps>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when hero is in view (can be combined with IntersectionObserver)
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Gradient backgrounds with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-purple-600/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2220%22%20height=%2220%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M1%200h2v2H2z%22%20fill=%22rgba(0,0,0,0.2)%22%20fillRule=%22evenodd%22%20style=%22width:2px;%22%20/%3E%3C/svg%3E')] opacity-20" />
      
      {/* Animated gradient orbs - creates depth and movement */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-gradient-to-tl from-red-500/20 to-orange-600/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Particle layer */}
      <ParticleBackground />

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0}
      >
        {/* Badge - Secondary CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <span className="inline-flex items-center px-6 py-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-orange-400 text-sm font-medium uppercase tracking-widest shadow-lg">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.727c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Concesionaria Oficial de Lujo
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="relative">
          <motion.span 
            initial={{ opacity: 0, y: 30 }} 
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase"
          >
            VELoCE
          </motion.span>
        </h1>

        {/* Animated subtitle words */}
        <div className="mt-8 relative">
          {heroContent.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + idx * 0.1 }}
            >
              <span className={`relative inline-block text-2xl md:text-4xl lg:text-5xl ${item === ' ' ? 'text-white/30 font-light' : ''} italic`}>
                {item === ' ' && <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 animate-shimmer" />}
                <span className={item.includes('n') ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#FF1744] to-purple-500' : 'text-white'}>
                  {item}
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description - Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-12 max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed"
        >
          Descubre una experiencia premium sin límites. Donde la ingeniería de élite se encuentra con un diseño que desafía las convenciones.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <a 
            href="#modelos"
            onClick={onExploreModels ? onExploreModels : null}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4500] to-[#FF1744] text-white font-bold uppercase tracking-widest rounded-full shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Explorar Modelos
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 animate-fade-in opacity-0 group-hover:opacity-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a 
            href="#contacto"
            className="inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Programar Test Drive
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest mb-2">Descubre más</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative border glow - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/80 to-transparent" />
    </section>
  );
}
