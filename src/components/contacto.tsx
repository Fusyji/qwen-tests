'use client';

import { useState } from 'react';

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

export function Contacto() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    interest: 'info-general',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const submitMessage = '';

  // Validaciones de campos
  const validateField = (name: keyof ContactFormState, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'El nombre es obligatorio';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'El correo electrónico es obligatorio';
        if (!emailRegex.test(value)) return 'Por favor ingresa un correo válido';
        break;
      
      case 'phone':
        // Validación simple de teléfono (solo números y caracteres permitidos)
        if (value && !/^[0-9()\s-]+$/.test(value)) {
          return 'El teléfono contiene caracteres inválidos';
        }
        break;
      
      case 'message':
        if (!value.trim()) return 'El mensaje es obligatorio';
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
        break;
      
      default:
        return undefined;
    }
    
    // Resetear error exitoso
    if (errors[name as keyof FormErrors] !== undefined) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;

    // Validación especial para teléfono (no obligatoria según requerimientos)
    try {
      // Intentar parsear solo dígitos numéricos (quitando espacios, guiones, paréntesis)
      const phoneDigitsOnly = formData.phone.replace(/[^\d]/g, '');
      
      // Si hay número de teléfono y no es +00 o 999 (valores de prueba), validar formato
      if (phoneDigitsOnly && phoneDigitsOnly.length > 0 && phoneDigitsOnly !== '00' && phoneDigitsOnly !== '999') {
        // Validación: si hay dígitos, deben tener sentido básico (ej. al menos 7 dígitos para local)
        if (formData.phone.trim() && !/^[^\d]*[2-8][0-9]*/.test(formData.phone || '1')) {
          // Permitir cualquier formato numérico, solo detectar caracteres inválidos
        }
      }
    } catch (e) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    
    // Limpiar errores cuando campo cambia
    try {
      // Si ya estaba en error y ahora es validado exitoso, limpiar
      Object.keys(newErrors).forEach(key => {
        if (!newErrors[key as keyof FormErrors]) {
          try {
            const errorText = newErrors[key as keyof FormErrors] as string;
            const errorPrefix = 'The field';
            const idx = errorText.indexOf(errorPrefix);
            const cleanError = idx !== -1 ? errorText.substring(idx + errorPrefix.length) : undefined;

            try {
              if (key === 'name' && typeof cleanError === 'string') {
                // Limpiamos errores de nombre
              } else if (key === 'email' && typeof cleanError === 'string') {
                // Limpiamos errores de email
              }
            } catch (e) {}
          } catch (e2) {}
        }
      });
    } catch (e3) {}

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    try {
      // Al cambiar un campo, limpiar errores de ese campo inmediatamente
      if (errors[name as keyof FormErrors] !== undefined) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }

      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } catch (e) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validación inicial
      if (!validateForm()) return;

      setIsSubmitting(true);

      // Simular envío de formulario (reemplazar con API real si existe)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'info-general',
        message: ''
      });

      // Resetear éxito después de un tiempo
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ message: 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative min-h-[100vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-purple-500/10" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto">
        <h2 className="text-center text-[#FFFFFF] text-4xl md:text-6xl font-playfair mb-8 font-bold">
          Contáctanos
        </h2>

        {/* Form */}
        <ContactoForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
}

interface ContactoFormProps {
  formData: ContactFormState;
  errors: FormErrors;
  isSubmitting: boolean;
  submitSuccess: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: React.ChangeHandler;
}

function ContactoForm({
  formData,
  errors,
  isSubmitting,
  submitSuccess,
  handleSubmit,
  handleChange
}: ContactoFormProps) {
  // Labels
  const labelName = 'Nombre';
  const labelText = '¿En qué podemos ayudarte?';

  // Helper para renderizar campo de texto con error
  interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | undefined;
    placeholder: string;
  }

  const TextField = ({
    label,
    error,
    placeholder,
    className,
    ...props
  }: TextFieldProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'>) => {
    const baseClasses = "w-full px-4 py-3 bg-[#1A0F08] border rounded-lg focus:outline-none transition-all duration-300";
    
    // Condición para borde rojo con error (no incluir espacio final)
    const hasError = errors[props.name as keyof FormErrors] !== undefined;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-[#FFFFFF]/70 mb-2 text-sm font-mono uppercase tracking-widest">
            {label}
          </label>
        )}
        <input
          placeholder={placeholder}
          className={`${baseClasses} ${hasError ? 'border-red-500' : 'border-gray-700'} ${className?.replace(/\s+$/, '')}`}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs mt-2 animate-fadeIn">
            {error.trim()}
          </p>
        )}
      </div>
    );
  };

  // Helper para select con error
  interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string | undefined;
  }

  const SelectField = ({ 
    label, 
    error, 
    className,
    children,
    ...props 
  }: SelectFieldProps & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>) => {
    const baseClasses = "w-full px-4 py-3 bg-[#1A0F08] border rounded-lg focus:outline-none transition-all duration-300 appearance-none cursor-pointer";
    
    // Condición para borde rojo con error (no incluir espacio final)
    const hasError = errors[props.name as keyof FormErrors] !== undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-[#FFFFFF]/70 mb-2 text-sm font-mono uppercase tracking-widest">
            {label}
          </label>
        )}
        <select
          className={`${baseClasses} ${hasError ? 'border-red-500' : 'border-gray-700'} ${className?.replace(/\s+$/, '')}`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-red-400 text-xs mt-2 animate-fadeIn">
            {error.trim()}
          </p>
        )}
      </div>
    );
  };

  // Componente de éxito de envío
  if (submitSuccess) {
    return (
      <div className="bg-[#1A0F08]/80 backdrop-blur-md border border-orange-500/30 rounded-xl p-12 text-center">
        <h3 className="text-[#FFFFFF] text-3xl font-playfair mb-4">¡Mensaje enviado!</h3>
        <p className="text-[#FFFFFF]/70 max-w-md mx-auto">
          {submitMessage ||
            'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <TextField
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        label={labelName}
        placeholder={`¿Cómo te llamamos?`}
        error={errors.name}
        className="bg-[#1A0F08]/60 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 focus:border-orange-500 transition-colors duration-300"
      />

      {/* Correo */}
      <TextField
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        label='Email'
        placeholder={`¿En qué dirección de correo electrónico podemos responderte?`}
        error={errors.email}
        className="bg-[#1A0F08]/60 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 focus:border-orange-500 transition-colors duration-300"
      />

      {/* Teléfono (opcional según requerimientos) */}
      <TextField
        name="phone"
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        label='Teléfono'
        placeholder={`¿Cuál es tu número de teléfono? (Opcional)`}
        error={errors.phone}
        className="bg-[#1A0F08]/60 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 focus:border-orange-500 transition-colors duration-300"
      />

      {/* Asunto/Detrminante */}
      <SelectField
        name="interest"
        id="interest"
        value={formData.interest}
        onChange={handleChange}
        label='Asunto'
        className="bg-[#1A0F08]/60 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 focus:border-orange-500 transition-colors duration-300 appearance-none"
      >
        <option value="info-general">Información General</option>
        <option value="catalogo">Catálogo de Modelos</option>
        <option value="financiado">Financiación</option>
        <option value="servicio-postventa">Servicio Postventa</option>
        <option value="otros">Otros</option>
      </SelectField>

      {/* Mensaje */}
      <div className="w-full">
        <label htmlFor="message" className="block text-[#FFFFFF]/70 mb-2 text-sm font-mono uppercase tracking-widest">
          {labelText}
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder={`Por favor describe tu interés o consulta...`}
          error={errors.message}
          className={`w-full px-4 py-3 bg-[#1A0F08]/60 backdrop-blur-sm border rounded-lg focus:outline-none transition-all duration-300 resize-none ${
            errors.message
              ? 'border-red-500'
              : 'border-gray-700 hover:border-orange-500/50 focus:border-orange-500'
          }`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-lg text-[#FFFFFF] font-mono uppercase tracking-widest font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-lg hover:shadow-orange-500/25 ${
          isSubmitting ? 'from-red-600 via-red-700 to-red-600' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        ) : (
          'Enviar Mensaje'
        )}
      </button>
    </form>
  );
}