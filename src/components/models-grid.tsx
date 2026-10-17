'use client';

import { ModelCard } from './models-model-card';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const carModels = [
  {
    name: 'Phantom GT',
    description: 'Aceleración brutal con un diseño que rompe las reglas de la aerodinámica.',
    price: '$295,000',
    imageUrl: '/images/phantom.png',
    badge: 'Flagship'
  },
  {
    name: 'Veloce EV',
    description: 'Electrodeportividad pura. Más de 3,000 millas en un solo carga.',
    price: '$125,000',
    imageUrl: '/images/veloce-ev.png'
  },
  {
    name: 'Apex S7',
    description: 'Turbo-híbrido de pista. El GT3 más rápido jamás construido.',
    price: '$198,000',
    imageUrl: '/images/apex.png',
    badge: 'Limited'
  },
  {
    name: 'Obsidian',
    description: 'SUV ultra-deportivo. Elegancia y rendimiento sin compromisos.',
    price: '$245,000',
    imageUrl: '/images/obsidian.png',
    badge: 'New Arrival'
  },
  {
    name: 'Catalyst',
    description: 'Híbrido deportivo de alto rendimiento. Eficiencia y potencia.',
    price: '$165,000',
    imageUrl: '/images/catalyst.png'
  },
  {
    name: 'Horizon',
    description: 'GT de lujo con conducción autónoma de nivel 3 integrada.',
    price: '$285,000',
    imageUrl: '/images/horizon.png',
    badge: 'Award Winner'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delay: i * 0.1,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function ModelsGrid() {
  const ref = useRef(null);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-red-950/30" />

      {/* Section header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-full text-orange-400 font-bold uppercase tracking-wider text-sm mb-6 animate-fade-in">
            Nuestra Colección Exclusiva
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-red-400 tracking-tighter mb-8">
            MODELOS 2026
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Ingeniería de precisión y belleza atemporal. Descubra la nueva generación 
            de autos diseñados para aquellos que no se conforman con lo ordinario.
          </p>
        </motion.div>
      </div>

      {/* Grid container */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1800px] mx-auto px-6"
      >
        {carModels.map((model, index) => (
          <motion.div
            key={model.name}
            layout_id={`model-${index}`}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            custom={index}
          >
            <ModelCard {...model} />
          </motion.div>
        ))}
      </motion.div>

      {/* Background glow decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[120%] h-[120%] bg-radial-gradient from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[80%] h-[80%] bg-red-600/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
