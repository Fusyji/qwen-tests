'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function Estadisticas() {
  const stats = [
    { value: 500, label: 'Clientes Felices', prefix: '+' },
    { value: 85, label: 'Modelos Exclusivos (%)', suffix: '%' },
    { value: 12, label: 'Años de Experiencia', suffix: '+' },
    { value: 98, label: 'Satisfacción Clientes', suffix: '%' },
  ];

  const refs = useRef<(HTMLParagraphElement | undefined)[]>(stats.length);

  useEffect(() => {
    stats.forEach((_, index) => {
      const ref = document.createElement('span');
      ref.classList.add('stat-number');
      const span = document.createElement('span');
      span.textContent = '0';
      ref.appendChild(span);
      document.getElementById(`stat-${index}`)?.appendChild(ref);
    });
  }, []);

  return (
    <section id="estadisticas" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nuestras <span className="text-orange-400">Estatísticas</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Resultados que hablan por sí mismos. Más de una década liderando el mercado de automoción de lujo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
              id={`stat-${index}`}
            >
              <motion.div
                ref={(el) => (refs.current[index] as any = el)}
                className="inline-block text-4xl lg:text-7xl font-light font-mono tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: index * 0.1 + 1 }}
              >
                <span className="text-orange-400">&lt;</span>
                <span className="text-white">
                  {stat.prefix}{stat.value}
                </span>
                <span className="text-red-500"/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                  {String(stat.value).slice(1)}
                </span>
                <span className="text-red-500">{stat.suffix&gt;</span>}
              </motion.div>

              <h3 className="text-xl font-medium text-gray-200 mt-4 mb-2">
                {stat.label}
              </h3>

              <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-0"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: index * 0.1 + 2 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl p-8 lg:p-12 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-grid-diagonal/[0.03]"></div>
          <motion.div className="relative z-10 flex items-center justify-between text-left">
            <div className="flex-1">
              <h4 className="text-xl lg:text-2xl font-playfair font-semibold text-white mb-3">
                ¿Por qué elegir VELoCE Motors?
              </h4>
              <p className="text-gray-400 leading-relaxed">
                Con más de <span className="text-orange-400">12 años</span> en el mercado, hemos construido una reputación impecable entre los coleccionistas y conductores exigentes. Nuestro compromiso con la excelencia se refleja en cada detalle, desde la selección del inventario hasta el servicio postventa.
              </p>
            </div>
            <motion.div
              className="flex-shrink-0 ml-8"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-16 h-16 text-orange-400/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM12 22L2 17l10-5 10 5-10 5zM3 16h18v2H3zM3 9h18v2H3z"/>
              </svg>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/20 transition-colors"
            >
              <div className="text-3xl lg:text-4xl font-playfair text-orange-400 mb-1">✓</div>
              <div className="text-sm text-gray-300">Concesionario Oficial</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/20 transition-colors"
            >
              <div className="text-3xl lg:text-4xl font-playfair text-red-400 mb-1">✓</div>
              <div className="text-sm text-gray-300">Garantía Extendida</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/20 transition-colors"
            >
              <div className="text-3xl lg:text-4xl font-playfair text-orange-400 mb-1">✓</div>
              <div className="text-sm text-gray-300">Asesoramiento Premium</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Inject custom styles for stat numbers animation via head injection once
export const StatAnimationStyles = () => (
  <>
    <style jsx global>{`
      .stat-number {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      @media (prefers-reduced-motion: reduce) {
        .stat-number {
          opacity: 1 !important;
        }
      }
    `}</style>
  </>
);
