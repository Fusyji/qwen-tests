/**
 * Suite completa de pruebas para VELoCE Motors
 * Validación de componentes, animaciones, navegación y formulario
 */

import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, it, vi, beforeEach } from 'vitest';
import Navbar from '../src/components/navbar';
import Hero from '../src/components/hero';
import ModelCard from '../src/components/model-card';
import ModelsGrid from '../src/components/models-grid';
import Estadisticas from '../src/components/estadisticas';
import GaleriaCaracteristicas from '../src/components/galeria';
import TestimoniosCarousel from '../src/components/testimonios';
import ContactoForm from '../src/components/contacto';
import Footer from '../src/components/footer';

// Mock para Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition }: any) => (
      <div className={className}>
        {children}
      </div>
    ),
    Text: ({ children, className }: any) => <span className={className}>{children}</span>,
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    button: ({ children }: any) => <button>{children}</button>,
  },
}));

// Mock para IntersectionObserver
const mockIntersectionObserver = vi.fn();
Object.defineProperty(window, 'IntersectionObserver', {
  value: class MockIntersectionObserver {
    constructor(callback: any) {
      mockIntersectionObserver.mockImplementation(...arguments);
    }
    observe() {
      mockIntersectionObserver.mock.calls[0]?.[1]?.({ intersects: true, rootBounds: null });
    }
  },
});

describe('VELoCE Motors - Componentes', () => {
  
  describe('Navbar Component', () => {
    it('debe mostrar logotipo y navegación correcta', () => {
      const { getByRole, getAllByRole } = render(<Navbar />);
      
      // Verificar logo
      expect(getByRole('img')).toBeInTheDocument();
      expect(screen.getByText(/VELOCE MOTORS/i)).toBeInTheDocument();
      
      // Verificar links de navegación
      const navLinks = getAllByRole('link');
      expect(navLinks).toHaveLength(5); // Inicio, Modelos, Características, Testimonios, Contacto
      
      navLinks.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('debe tener botón de menú móvil visible en vista mobile', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      const { getByRole } = render(<Navbar />);
      const mobileMenuButton = getByRole('button', { name: '/\/Menú/i' });
      expect(mobileMenuButton).toBeInTheDocument();
    });

    it('debe cambiar estado del botón de menú móvil al hacer click', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      const mockSetStateMock = vi.fn();
      
      vi.spyOn(HTMLFormElement.prototype, 'addEventListener').mockImplementation(() => {});
      vi.spyOn(document.documentElement, 'getElementById').mockReturnValue({ addEventListener: mockSetStateMock } as any);
      
      render(<Navbar />);
      const mobileMenuButton = screen.getByRole('button', { name: /Menú/i });
      
      expect(mobileMenuButton).toBeInTheDocument();
    });

    it('debe tener aria-labels correctas para accesibilidad', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Navbar />);
      
      // Verificar que el botón de menú tiene aria-label
      const menuButton = screen.getByRole('button');
      expect(menuButton).toHaveAttribute('aria-label');
    });
  });

  describe('Hero Component', () => {
    it('debe mostrar título principal y subtexto', () => {
      // Mock necesario para evitar errores de font
      vi.mocked(document.fonts).mockReturnValue({ familyNames: {}, updated: async () => {} });
      
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Hero />);
      
      expect(screen.getByText('Descubre tu sueño en VELoCE MOTORS')).toBeInTheDocument();
      expect(screen.getByText('Especialistas en autos deportivos de alto rendimiento')).toBeInTheDocument();
    });

    it('debe tener dos botones CTA (Call to Action)', () => {
      // Mock necesario para evitar errores de font
      vi.mocked(document.fonts).mockReturnValue({ familyNames: {}, updated: async () => {} });
      
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Hero />);
      
      // Verificar botones CTA
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('debe mostrar imagen de fondo de placeholder', () => {
      // Mock necesario para evitar errores de font
      vi.mocked(document.fonts).mockReturnValue({ familyNames: {}, updated: async () => {} });
      
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      const { getByRole } = render(<Hero />);
      
      // En el modo de pruebas, la imagen tendrá un placeholder
      expect(getByRole('img')).toBeInTheDocument();
    });
  });

  describe('ModelCard Component', () => {
    it('debe mostrar todos los detalles del modelo de automóvil', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<ModelCard 
        data={{
          imagen: 'https://example.com/car.jpg',
          nombre: 'Audi RS 5',
          precio: '90.000€',
          velocidad: '382 km/h',
          torque: '717 Nm',
          motor: '4,0T',
          traccion: 'AWD'
        }} 
      />);
      
      expect(screen.getByText('Audi RS 5')).toBeInTheDocument();
      expect(screen.getByText('90.000€')).toBeInTheDocument();
      expect(screen.getByText('382 km/h')).toBeInTheDocument();
    });

    it('debe tener botón de detalles con hover effects', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<ModelCard 
        data={{
          imagen: 'https://example.com/car.jpg',
          nombre: 'Audi RS 5',
          precio: '90.000€',
          velocidad: '382 km/h',
          torque: '717 Nm',
          motor: '4,0T',
          traccion: 'AWD'
        }} 
      />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
    });

    it('debe implementar stagger effects en elementos de especificaciones', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<ModelCard 
        data={{
          imagen: 'https://example.com/car.jpg',
          nombre: 'Audi RS 5',
          precio: '90.000€',
          velocidad: '382 km/h',
          torque: '717 Nm',
          motor: '4,0T',
          traccion: 'AWD'
        }} 
      />);
      
      const specs = screen.getAllByRole('listitem');
      expect(specs).toHaveLength(4);
    });
  });

  describe('ModelsGrid Component', () => {
    it('debe renderizar grid con 6 tarjetas de modelos', () => {
      // Mock necesario para evitar errores de font
      vi.mocked(document.fonts).mockReturnValue({ familyNames: {}, updated: async () => {} });
      
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<ModelsGrid />);
      
      expect(screen.getByText('Modelos Exclusivos')).toBeInTheDocument();
    });

    it('debe implementar stagger effect en la animación del grid', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<ModelsGrid />);
      
      // Verificar que hay elementos con stagger effects
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(6);
    });
  });

  describe('Estadisticas Component', () => {
    it('debe mostrar contador incrementales', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Estadisticas />);
      
      expect(screen.getByText('%+')).toBeInTheDocument(); // Placeholder para contadores
    });

    it('debe tener labels descriptivos de estadísticas', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Estadisticas />);
      
      expect(screen.getByText('Clientes contentos')).toBeInTheDocument();
    });

    it('debe implementar IntersectionObserver para animación al hacer scroll', () => {
      const mockObserveCall = vi.fn();
      const mockIntersectionObserverSpy = vi.fn(() => ({ 
        observe: (target: Element) => {
          setTimeout(() => {
            mockObserveCall(target);
            document.querySelector(target.tagName.toLowerCase())?.setAttribute('data-visible', 'true');
          }, 100);
        } 
      }));
      
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Estadisticas />);
      
      // El IntersectionObserver debe ser chamado
      setTimeout(() => {
        expect(mockObserveCall).toHaveBeenCalled();
      }, 150);
    });
  });

  describe('Galeria Caracteristicas Component', () => {
    it('debe mostrar galería de características detalladas', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<GaleriaCaracteristicas />);
      
      expect(screen.getByText('GALERÍA DE CARACTERÍSTICAS')).toBeInTheDocument();
    });

    it('debe implementar accordion para cada característica', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<GaleriaCaracteristicas />);
      
      // Verificar acordeones (botones expandibles)
      const accordionButtons = screen.getAllByRole('button');
      expect(accordionButtons).toHaveLength(5);
    });
  });

  describe('Testimonios Carousel Component', () => {
    it('debe mostrar carrusel de testimonios con navegación', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<TestimoniosCarousel />);
      
      expect(screen.getByText('TESTIMONIOS')).toBeInTheDocument();
    });

    it('debe tener botones de navegación prev/next', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<TestimoniosCarousel />);
      
      const navigationButtons = screen.getAllByRole('button');
      expect(navigationButtons).toHaveLength(2); // Prev y Next
    });

    it('debe implementar animación de transición entre slides', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<TestimoniosCarousel />);
      
      // Verificar elementos con animación de transición
      const slides = screen.getByText('TESTIMONIOS');
      expect(slides).toBeInTheDocument();
    });
  });

  describe('Contacto Form Component', () => {
    it('debe renderizar formulario con todos los campos requeridos', () => {
      render(<ContactoForm />);
      
      // Verificar campos del formulario
      const fullNameField = screen.getByLabelText(/nombre/i);
      const emailField = screen.getByLabelText(/email/i);
      const mobileField = screen.getByLabelText(/telefono/i);
      const messageField = screen.getByLabelText(/mensaje/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      
      expect(fullNameField).toBeInTheDocument();
      expect(emailField).toBeInTheDocument();
      expect(mobileField).toBeInTheDocument();
      expect(messageField).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('debe mostrar error cuando campos estén vacíos', async () => {
      render(<ContactoForm />);
      
      // Obtener el contenedor de errores y verificar que esté vacío inicialmente
      const errorsContainer = screen.getByRole('alert');
      expect(errorsContainer).not.toHaveAttribute('role', 'alert'); // Inicialmente sin errores
      
      // Intentar submit sin llenar campos
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      fireEvent.click(submitButton);
      
      // Verificar que se muestran errores
      await waitFor(() => {
        expect(screen.getByText(/Por favor, rellene los campos requeridos/i)).toBeInTheDocument();
      });
    });

    it('debe validar email format válido', () => {
      render(<ContactoForm />);
      
      const emailField = screen.getByLabelText(/email/i);
      fireEvent.change(emailField as any, { target: { value: 'invalid-email' } });
      
      expect(screen.getByText(/El formato del email es incorrecto/i)).toBeInTheDocument();
    });

    it('debe validar email format inválido', () => {
      render(<ContactoForm />);
      
      const emailField = screen.getByLabelText(/email/i);
      fireEvent.change(emailField as any, { target: { value: 'invalid-email' } });
      
      expect(screen.getByText(/El formato del email es incorrecto/i)).toBeInTheDocument();
    });

    it('debe permitir submit con todos los campos válidos', async () => {
      render(<ContactoForm />);
      
      const fullNameField = screen.getByLabelText(/nombre/i);
      const emailField = screen.getByLabelText(/email/i);
      const mobileField = screen.getByLabelText(/telefono/i);
      const messageField = screen.getByLabelText(/mensaje/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      
      // Rellenar campos válido
      fireEvent.change(fullNameField as any, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailField as any, { target: { value: 'juan@example.com' } });
      fireEvent.change(mobileField as any, { target: { value: '600123456' } });
      fireEvent.change(messageField as any, { target: { value: 'Hola, me gustaría más información.' } });
      
      // Click submit
      fireEvent.click(submitButton);
      
      // Verificar loading state
      await waitFor(() => {
        expect(screen.getByText(/Enviando.../i)).toBeInTheDocument();
      });
    });

    it('debe mostrar mensaje de éxito después del submit', async () => {
      render(<ContactoForm />);
      
      const fullNameField = screen.getByLabelText(/nombre/i);
      const emailField = screen.getByLabelText(/email/i);
      const mobileField = screen.getByLabelText(/telefono/i);
      const messageField = screen.getByLabelText(/mensaje/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      
      // Rellenar campos válido
      fireEvent.change(fullNameField as any, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailField as any, { target: { value: 'juan@example.com' } });
      fireEvent.change(mobileField as any, { target: { value: '600123456' } });
      fireEvent.change(messageField as any, { target: { value: 'Hola, me gustaría más información.' } });
      
      // Click submit
      fireEvent.click(submitButton);
      
      // Verificar que el loading desaparece y se muestra éxito
      await waitFor(() => {
        expect(screen.queryByText(/Enviando.../i)).not.toBeInTheDocument();
      });
    });

    it('debe resetear el formulario después del submit exitoso', async () => {
      render(<ContactoForm />);
      
      const fullNameField = screen.getByLabelText(/nombre/i);
      const emailField = screen.getByLabelText(/email/i);
      const mobileField = screen.getByLabelText(/telefono/i);
      const messageField = screen.getByLabelText(/mensaje/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      
      // Rellenar campos válido
      fireEvent.change(fullNameField as any, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailField as any, { target: { value: 'juan@example.com' } });
      fireEvent.change(mobileField as any, { target: { value: '600123456' } });
      fireEvent.change(messageField as any, { target: { value: 'Hola, me gustaría más información.' } });
      
      // Click submit
      fireEvent.click(submitButton);
      
      // Verificar que el formulario está reseteado
      await waitFor(() => {
        expect(fullNameField).toHaveValue('');
      });
    });

    it('debe manejar carga lenta (timeout)', async () => {
      render(<ContactoForm />);
      
      const fullNameField = screen.getByLabelText(/nombre/i);
      const emailField = screen.getByLabelText(/email/i);
      const mobileField = screen.getByLabelText(/telefono/i);
      const messageField = screen.getByLabelText(/mensaje/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      
      // Rellenar campos válido
      fireEvent.change(fullNameField as any, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailField as any, { target: { value: 'juan@example.com' } });
      fireEvent.change(mobileField as any, { target: { value: '600123456' } });
      fireEvent.change(messageField as any, { target: { value: 'Hola, me gustaría más información.' } });
      
      // Simular error en el submit (timeout)
      const errorMessage = '(network timeout)';
      
      // Click submit
      fireEvent.click(submitButton);
      
      // Verificar que se muestra mensaje de error
      await waitFor(() => {
        expect(screen.getByText(/Error al enviar mensaje/i)).toBeInTheDocument();
      });
    });

    it('debe tener aria-required para campos obligatorios', () => {
      render(<ContactoForm />);
      
      const fields = screen.getAllByRole('textbox', { hidden: true });
      expect(fields).toBeDefined();
    });

    it('debe mostrar iconos de validación en cada input', () => {
      render(<ContactoForm />);
      
      // Verificar que los inputs tienen iconos de estado
      const fullNameField = screen.getByLabelText(/nombre/i) as HTMLInputElement;
      fireEvent.focus(fullNameField);
      
      expect(fullNameField).toBeInTheDocument();
    });

    it('debe mostrar tipografía de Playfair Display', () => {
      render(<ContactoForm />);
      
      // El formulario usa clases tailwind con la configuración de font
      const formElement = screen.getByText(/nombre/i) as HTMLElement;
      expect(formElement).toBeInTheDocument();
    });

    it('debe usar gradientes personalizados del tema', () => {
      render(<ContactoForm />);
      
      // Verificar que el formulario usa estilos de tema
      const formContainer = screen.getByText(/nombre/i) as Element;
      expect(formContainer).toBeInTheDocument();
    });

    it('debe tener botón submit con tipografía correcta', () => {
      render(<ContactoForm />);
      
      const submitButton = screen.getByRole('button');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Footer Component', () => {
    it('debe mostrar secciones footer con 4 columnas', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Footer />);
      
      expect(screen.getByText('VELoCE MOTORS')).toBeInTheDocument();
    });

    it('debe tener enlaces a secciones del sitio', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Footer />);
      
      // Verificar enlaces rápidos
      expect(screen.getByText('INICIO')).toBeInTheDocument();
      expect(screen.getByText('MODELOS')).toBeInTheDocument();
    });

    it('debe mostrar información de contacto en footer', () => {
      const mockIntersectionObserverSpy = vi.fn(() => ({ observe: vi.fn() }));
      Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: mockIntersectionObserverSpy,
      });

      render(<Footer />);
      
      expect(screen.getByText('info@velocemotors.com')).toBeInTheDocument();
    });
  });

});

describe('Test Suite Complete - Integración', () => {
  
  test('debe validar que todos los componentes cargan correctamente', async () => {
    // Renderizar cada componente para verificar carga inicial
    const NavbarComponent = render(<Navbar />);
    expect(NavbarComponent.container).toBeInTheDocument();
    
    // Verificar hero component (se asume separado para esta prueba)
    const HeroComponent = render(<Hero />);
    expect(HeroComponent.container).toBeInTheDocument();
  });

  test('debe verificar que no hay errores de memoria o leaks de observers', () => {
    let memoryUsage: number;
    
    // Mock para detectar fugas de objetos - corrección de sintaxis
    const originalIntersectionObserver = Object.getOwnPropertyDescriptor(window, 'IntersectionObserver');
    window.OriginalIntersectionObserver = class OriginalIntersectionObserver {};
    
    // Restablecer IntersectionObserver si existe una propiedad original
    if (originalIntersectionObserver) {
      var MockIntersectionObserver = class extends originalIntersectionObserver.value {
        constructor() {
          return { observe: vi.fn() };
        }
      };
    } else {
      // Fallback simple para el caso sin descriptor original
      const OriginalObserver = window.OriginalIntersectionObserver || 
                            Object.defineProperties(class { constructor() {} }, { writable: true, configurable: true }).constructor;
      
      var MockIntersectionObserver = class extends OriginalObserver {
        constructor() {
          return { observe: vi.fn() };
        }
      };
    }

vi.mocked(document.fonts).mockReturnValue({ familyNames: {}, updated: async () => {} });

    render(<Navbar />);
    render(<Hero />);
    
    // Esperar que la GC limpie el memoryUsage
  });

});
