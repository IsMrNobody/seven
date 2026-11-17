import React, { useState } from 'react';
import { BRAND } from '../data/siteConfig';

const localAssetModules = import.meta.glob<string>(
  '/src/assets/images/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

function resolveImageSrc(src?: string): string | undefined {
  if (!src) return undefined;
  return localAssetModules[src] || src;
}

interface SevenImageProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  caption?: string;
}

/**
 * Imagen resiliente: carga lazy con referrerPolicy="no-referrer".
 * Si la URL está vacía o falla al cargar, muestra un placeholder oscuro (#1A1A1A)
 * con el logo oficial de SEVEN en dorado/arena sin redibujarlo.
 */
export const SevenImage: React.FC<SevenImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  priority = false,
  caption,
}) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const resolvedSrc = resolveImageSrc(src);
  const showFallback = !resolvedSrc || failed;

  return (
    <div
      className={`relative overflow-hidden bg-[#1A1A1A] ${className}`}
    >
      {showFallback ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-5 text-center"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, rgba(184, 154, 120, 0.14) 0%, rgba(26, 26, 26, 0.98) 70%)',
          }}
          role="img"
          aria-label={alt}
        >
          <img
            src={BRAND.logoFallbackLocal}
            alt="SEVEN Restaurant & Lounge"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-[#B89A78]/40 opacity-90 shadow-lg"
          />
          {caption && (
            <span className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#D9BE9C]/80 font-medium line-clamp-2 max-w-[14rem]">
              {caption}
            </span>
          )}
        </div>
      ) : (
        <>
          {!loaded && (
            <div
              className="absolute inset-0 bg-[#1A1A1A] animate-pulse"
              aria-hidden="true"
            />
          )}
          <img
            key={resolvedSrc}
            src={resolvedSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`${imgClassName} transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </div>
  );
};

interface SevenLogoProps {
  variant?: 'principal' | 'blanco';
  alt?: string;
  className?: string;
}

/**
 * Logo oficial de SEVEN Restaurant & Lounge usando las URLs proporcionadas.
 * Si no carga la URL remota, hace fallback automático al emblema oficial local.
 */
export const SevenLogo: React.FC<SevenLogoProps> = ({
  variant = 'principal',
  alt = 'SEVEN Restaurant & Lounge',
  className = 'h-12 w-auto object-contain',
}) => {
  const primarySrc =
    variant === 'blanco' ? BRAND.logoBlanco : BRAND.logoPrincipal;
  const [useLocal, setUseLocal] = useState(false);

  return (
    <img
      src={useLocal ? BRAND.logoFallbackLocal : primarySrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (!useLocal) setUseLocal(true);
      }}
      className={`${className} ${
        useLocal ? 'rounded-full border border-[#B89A78]/50' : ''
      }`}
    />
  );
};
