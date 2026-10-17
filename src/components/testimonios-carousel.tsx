'use client';

import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'CEO TechVentures',
    content: '"La experiencia de compra en VELoCE Motors fue impecable. Desde el asesoramiento personalizado hasta la entrega impecable del Porsche Panamera. Sin dudas, el mejor servicio que he recibido en mi carrera profesional."',
    image: 'https://images.unsplash.com/photo-1472099645588-56eb81f2962b?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    role: 'Directora de Marketing Global',
    content: '"Buscaba un auto que combinara elegancia y rendimiento deportivo. El equipo de VELoCE me ayudó a elegir el BMW M8 Competition. Profesionales expertos en lo que hacen."',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 3,
    name: 'Roberto Silva',
    role: 'Arquitecto de Interiores',
    content: '"Como profesional que exige lo mejor en cada aspecto de mi vida, VELoCE Motors representó perfectamente las expectativas. El servicio es impecable y el trato digno y personalizado."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1nd774f11d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 4,
    name: 'Sofia Castellanos',
    role: 'Fotógrafa de Moda',
    content: '"El Mercedes-Maybach S-Class adquirido a través de VELoCE es simplemente perfecto. El proceso de compraventa fue transparente y sin complicaciones. Altamente recomendado."',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69ceb7?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export default function TestimoniosCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-play functionality
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section id="testimonios" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[10vh] left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[8rem] -left-[8rem] w-[35rem] h-[35rem] bg-gradient-to-br from-orange-500/12 to-red-600/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-[-8rem] w-[30rem] h-[30rem] bg-gradient-to-bl from-red-600/10 to-orange-500/10 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7a3.984 3.984 0 00-7.968 0v7c-2.502.38-5.233-.836-7.115-2.717L3 21h9v-5c0-2.206 1.794-4 4-4s4 1.794 4 4v5h9l-3-4.5a9.984 9.984 0 01-7.146 4.25z" />
            </svg>
            <span className="font-playfair text-3xl md:text-4xl font-bold italic text-white tracking-wide">
              Clientes felices
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4 px-4">
            Las mejores experiencias en un lugar. Lo que dicen nuestros clientes sobre VELoCE Motors.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-white/10"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-600/20 to-orange-500/20 opacity-50 blur-3xl"></div>

            {/* Quote Icon */}
            <div className="absolute top-6 left-8 text-orange-400/30">
              <svg className="w-12 h-12 lg:w-16 lg:h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7a3.984 3.984 0 00-7.968 0v7c-2.502.38-5.233-.836-7.115-2.717L3 21h9v-5c0-2.206 1.794-4 4-4s4 1.794 4 4v5h9l-3-4.5a9.984 9.984 0 01-7.146 4.25z" />
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <p className="text-xl lg:text-2xl font-light text-gray-200 leading-relaxed px-4 mb-8 min-h-[140px] flex items-center">
                "{testimonialsData[currentIndex].content}"
              </p>

              {/* Client Info */}
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonialsData[currentIndex].image || 'https://images.unsplash.com/photo-1472099645588-56eb81f2962b?auto=format&fit=crop&q=80&w=200&h=200'}
                    alt={testimonialsData[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-500/30"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-lg">{testimonialsData[currentIndex].name}</h4>
                    <p className="text-gray-400 text-sm">{testimonialsData[currentIndex].role}</p>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-6">
                  {/* Previous Button */}
                  <button
                    onClick={prevSlide}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 text-white transition-all duration-300"
                    aria-label="Testimonio anterior"
                  >
                    <motion.svg
                      initial={{ x: -4, rotate: 90 }}
                      whileTap={{ x: 4, rotate: 180 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </motion.svg>
                  </button>

                  {/* Dots Navigation */}
                  <div className="flex items-center gap-3">
                    {testimonialsData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                          index === currentIndex
                            ? 'bg-orange-400 w-8'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                        aria-label={`Ir a testimonio ${index + 1}`}
                      >
                        {/* Animated glow on active dot */}
                        {index === currentIndex && (
                          <span className="absolute inset-0 rounded-full bg-orange-400 blur-sm opacity-75 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 text-white transition-all duration-300"
                    aria-label="Testimonio siguiente"
                  >
                    <motion.svg
                      initial={{ x: 4, rotate: -90 }}
                      whileTap={{ x: -4, rotate: -180 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                initial={{ x: '100%' }}
                animate={{ x: ['100%', `${((currentIndex - testimonialsData.length + 1) / testimonialsData.length) * 100}%`] }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl px-8 py-6 border border-white/5 backdrop-blur-sm">
            <div className="text-center">
              <div className="font-playfair text-4xl font-bold text-white mb-1">4.9<span className="text-orange-400">★</span></div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Promedio Rating</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="font-playfair text-4xl font-bold text-white mb-1">5</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Desde Estrellas</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="font-playfair text-4xl font-bold text-orange-400 mb-1">3.8K+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Clientes</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="font-playfair text-4xl font-bold text-white mb-1">15+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Años de Excelencia</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );\n}\n"