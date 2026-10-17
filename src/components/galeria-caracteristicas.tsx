'use client';

import { motion } from 'framer-motion';

interface FeatureProps {
  modelName: string;
  price: string;
  image?: string;
}

const featuresData = [
  {
    name: 'Porsche Panamera Turbo S',
    modelCode: 'panamera-turbo',
    price: 'USD 239,500',
    description: 'El deportivo elegante por excelencia. Combinando lujo de primera clase con una respuesta eléctrica asombrosa y un equilibrio perfecto en la conducción.',
    specs: {
      hp: 620,
      engine: 'V8 Twin-Turbo',
      acceleration: '3.0s (0-100 km/h)',
      topSpeed: '330 km/h'
    }
  },
  {
    name: 'Mercedes-Benz S-Class',
    modelCode: 's-class',
    price: 'USD 145,000',
    description: 'El estándar en lujo y tecnología. La versión Maybach ofrece todavía más exclusividad y confort de clase mundial.',
    specs: {
      hp: 496,
      engine: 'V8 Biturbo',
      acceleration: '4.5s (0-100 km/h)',
      topSpeed: '250 km/h'
    }
  },
  {
    name: 'BMW M760i xDrive',
    modelCode: 'bmw-m760i',
    price: 'USD 189,000',
    description: 'Poder puro de Mercedes-AMG integrado en la elegante arquitectura BMW. Tecnología V12 con un rendimiento asombroso.',
    specs: {
      hp: 536,
      engine: 'V12 Twin-Turbo',
      acceleration: '4.0s (0-100 km/h)',
      topSpeed: '280 km/h'
    }
  },
  {
    name: 'Audi RS7 Performance',
    modelCode: 'audi-rs7',
    price: 'USD 158,900',
    description: 'La versión deportiva de la elegante Audi A7. Tecnología Quattro con un sistema de transmisión S tronic.',
    specs: {
      hp: 600,
      engine: 'V8 Twin-Turbo',
      acceleration: '3.5s (0-100 km/h)',
      topSpeed: '295 km/h'
    }
  },
  {
    name: 'Mercedes-AMG GT Black Series',
    modelCode: 'amg-gt-black-series',
    price: 'USD 343,100',
    description: 'La edición especial más codiciada de AMG. Diseño extremadamente agresivo con tecnología de ingeniería de élite.',
    specs: {
      hp: 720,
      engine: 'V8 Twin-Turbo',
      acceleration: '3.1s (0-100 km/h)',
      topSpeed: '325 km/h'
    }
  },
  {
    name: 'Ferrari Roma Spider',
    modelCode: 'ferrari-roma-spider',
    price: 'USD 256,400',
    description: 'El nuevo GT convertible de Ferrari. Elegancia del diseño italiano con un rendimiento impresionante en todas las condiciones.',
    specs: {
      hp: 612,
      engine: 'V8 Turbo',
      acceleration: '3.1s (0-100 km/h)',
      topSpeed: '330 km/h'
    }
  },
];

export default function GaleriaCaracteristicas() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.8,
        damping: 12,
      },
    },
  };

  return (
    <section id="galeria" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[15vh] left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/15 to-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-[-10rem] w-[35rem] h-[35rem] bg-gradient-to-bl from-red-600/8 to-orange-500/8 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nuestras <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">Firmas</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Colecciona las joyas más exclusivas del mercado. Cada modelo representa el máximo apogeo del ingeniería y diseño automotriz.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.modelName}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/90 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500"
            >
              {/* Model Card Header */}
              <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Image Container */}
              <motion.div
                className="relative h-[38rem] lg:h-full overflow-hidden"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image */}
                <img
                  src={`https://images.unsplash.com/photo-${feature.modelCode === 'panamera-turbo' ? '-1578916449064-3e61d62be697' : 
                               feature.modelCode === 's-class' || feature.modelCode === 'amg-gt-black-series' || 
                               feature.modelCode === 'audi-rs7' ? '-1552589336-12071b6a2df7' :
                               feature.modelCode === 'bmw-m760i' ? '-1555956291-e4d11e3f4212' :
                               feature.modelCode === 'ferrari-roma-spider' ? 'https://images.unsplash.com/photo-1503376780353-1e86b31c4638?w=1000&auto=format&fit=crop&q=60':
                               feature.modelCode === 'roma-spider' ? 'https://images.unsplash.com/photo-1563720293-a915dffb8b2a?auto=format&fit=crop&q=80&w=1000'=}/images/photos`}
                  alt={feature.name}
                  width={800}
                  height={800}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-125 hover:z-40"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Model Name & Price */}
                <motion.div className="absolute bottom-0 left-0 right-0 z-30">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-1 pl-6">
                    {feature.name}
                  </h3>
                  <p className="text-orange-400 font-medium text-lg pl-6">
                    {feature.price}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 px-6 pb-4 pt-1">
                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Potencia</div>
                      <motion.div className="text-xl font-bold text-white font-mono" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}>
                        {feature.specs.hp} hp
                      </motion.div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Motor</div>
                      <div className="text-sm font-medium text-gray-200">
                        {feature.specs.engine}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">0-100 km/h</div>
                      <motion.div className="text-xl font-bold text-red-400 font-mono" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                        {feature.specs.acceleration}
                      </motion.div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Velocidad Max</div>
                      <motion.div className="text-xl font-bold text-orange-400 font-mono" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                        {feature.specs.topSpeed}
                      </motion.div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 z-40"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                      ¡Disponible!
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Description */}
              <div className="p-6 bg-gradient-to-b from-black/90 to-gray-900/95 border-t border-white/10">
                <motion.p 
                  className="text-gray-300 leading-relaxed line-clamp-2"
                  initial={{ opacity: 0.7 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {feature.description}
                </motion.p>

                {/* Action Button */}
                <motion.button 
                  className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Ver Detalles</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              {/** Image */}
              {/* Decorative corners for premium feel */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-orange-500/20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-red-500/20 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-indigo-900/20 to-purple-900/10 rounded-3xl p-8 lg:p-12 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-diagonal/[0.04]"></div>

          <h3 className="text-2xl lg:text-3xl font-playfair font-semibold text-white mb-4">
            ¿Interesado en nuestro inventario?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de asesores puede ayudarte a encontrar el automotor que mejor se adapte a tus necesidades y presupuesto. Contáctanos hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px -5px rgba(255,69,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Agendar Cita</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[5000ms]"
                aria-hidden="true"
              />
            </motion.button>

            {/* Social Media */}
            <div className="flex gap-3 ml-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500/20 border border-white/20 flex items-center justify-center text-white transition-colors group p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/20 flex items-center justify-center text-blue-400 transition-colors group p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.024.047 1.791.21 2.422.466.66.258 1.21.594 1.672 1.029.435.423.748.974.905 1.62.157.64.16 1.208.16 1.776 0 .568-.013 1.136-.16 1.776-.157.646-.47 1.197-.905 1.62-.435.423-.986.759-1.672 1.029-.63.258-1.397.421-2.422.468-1.024.047-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.025-.047-1.792-.21-2.422-.468-.686-.27-1.237-.606-1.672-1.029-.435-.423-.748-.974-.905-1.62C3.052 10.68 3.05 10.112 3.05 9.544c0-.568.013-1.136.16-1.776.157-.646.47-1.197.905-1.62.435-.423.986-.759 1.672-1.029.63-.258 1.397-.421 2.422-.468 1.024-.047 1.378-.06 3.808-.06m0-2c-2.506 0-2.858.013-3.911.06-1.093.049-1.886.225-2.555.49-.718.282-1.316.658-1.832 1.155-.517.497-.865 1.16-.016 1.89.85.73 1.992 1.013 3.811.013H12V2zm2.856 2c-1.408 0-1.76.013-2.813.06-1.093.047-1.886.223-2.555.49-.686.282-1.284.658-1.8 1.155-.497.497-.845 1.16-.016 1.89.83.73 1.972 1.013 3.791.013H15V12h-3.748v2.274c0 .282.003.565.016.85 0 .27.02.54.053.8.347.218.74.39 1.15.508.062.027.126.06.19.087v.39c0 .047-.01.093-.027.137-.17.373-.507.667-.89.837l-.16.137c-.363.29-.813.45-.84.45v.4h1.748a2 2 0 0 0 1.973-2V10c0-.282-.003-.565-.016-.85 0-.27-.02-.54-.053-.8-.347-.218-.74-.39-1.15-.508a1.9 1.9 0 0 0-.19-.087v-.39c0-.047.01-.093.027-.137.17-.373.507-.667.89-.837l.16-.137c.363-.29.813-.45.84-.45v-.4H15c-1.34 0-3.218 1.688-3.564 1.87z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}