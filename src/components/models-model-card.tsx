'use client';

import { useState } from 'react';

interface ModelCardProps {
    name: string;
    description: string;
    price: string;
    badge?: string;
    imageUrl: string;
}

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export function ModelCard({ name, description, price, badge, imageUrl }: Readonly<ModelCardProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 transition-all duration-500"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Badge - if applicable */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/90 to-red-600/90 backdrop-blur-md border border-white/20 rounded-full text-white font-bold uppercase text-xs tracking-wider shadow-lg">
            {badge}
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[400px]">
        {/* Name */}
        <div>
          <h3 className="text-white text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-orange-400 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="text-orange-400 font-bold text-xl tracking-wider">
            {price}
          </span>
        </div>

        {/* Decorative element */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-600/20 to-purple-600/20" />
          <div className="absolute inset-0 bg-grid-white/[0.1] [mask-image:radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] animate-shimmer" />
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl blur-2xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`}
        style={{ background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.4), rgba(255, 23, 68, 0.4))' }}
      />
    </div>
  );
}
