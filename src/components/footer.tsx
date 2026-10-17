'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4 text-playfair">VELoCE MOTORS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Autos deportivos de alto rendimiento diseñados para los más exigentes.
              Experiencia exclusiva en personalización y venta de modelos únicos.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">ENLAZES RÁPIDOS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#inicio" className="hover:text-orange-400 transition-colors">Inicio</a></li>
              <li><a href="#modelos" className="hover:text-orange-400 transition-colors">Modelos</a></li>
              <li><a href="#caracteristicas" className="hover:text-orange-400 transition-colors">Características</a></li>
              <li><a href="#testimonios" className="hover:text-orange-400 transition-colors">Testimonios</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Cookies</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">CONTACTO</h4>
            <p className="text-sm text-gray-400 mb-2">info@velocemotors.com</p>
            <p className="text-sm text-gray-400">+34 900 123 456</p>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.102-5.838c-1.925 0-3.496 1.571-3.496 3.496s1.571 3.497 3.496 3.497 3.497-1.571 3.497-3.496-1.572-3.497-3.497-3.497z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 VELoCE MOTORS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
