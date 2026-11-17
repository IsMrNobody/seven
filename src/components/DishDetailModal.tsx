import React, { useEffect, useRef } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { BRAND, MenuItem, formatPrice } from '../data/siteConfig';
import { SevenImage } from './SevenImage';

interface DishDetailModalProps {
  item: MenuItem | null;
  categoryName?: string;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  categoryName,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const priceDisplay = formatPrice(item.precio);
  const whatsappDishUrl = `https://wa.me/584121249249?text=${encodeURIComponent(
    `Hola Seven, quisiera hacer una reservación y consultar por "${item.nombre}".`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#1A1A1A] border border-[#B89A78]/60 rounded-[12px] overflow-hidden shadow-2xl animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle del plato"
          className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-[#0E0E0E]/85 border border-[#B89A78]/50 text-[#F5EFE6] hover:text-[#D9BE9C] hover:border-[#D9BE9C] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square md:aspect-auto md:min-h-[340px] bg-[#0E0E0E]">
            <SevenImage
              src={item.imagen}
              alt={`${item.nombre} — SEVEN Restaurant & Lounge`}
              className="w-full h-full"
              caption={item.nombre}
              priority
            />
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              {categoryName && (
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89A78] font-medium mb-2">
                  {categoryName}
                </p>
              )}

              <h3
                id="dish-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-[#F5EFE6] leading-tight text-balance"
              >
                {item.nombre}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold tabular-nums text-bronze-gradient">
                  {priceDisplay}
                </span>
                {typeof item.precio === 'number' && (
                  <span className="text-xs text-[#BDB5A8]">USD</span>
                )}
              </div>

              <div className="w-12 h-px bg-[#B89A78]/50 my-5" aria-hidden="true" />

              <p className="text-sm leading-relaxed text-[#BDB5A8] font-light">
                {item.descripcion || 'Preparado al momento con el sello de nuestra cocina de autor.'}
              </p>

              <p className="mt-5 font-script text-2xl text-[#D9BE9C]">
                Como nunca lo habías probado
              </p>
            </div>

            <div className="pt-4 border-t border-[#B89A78]/20 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappDishUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-bronze-gradient text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:brightness-105 transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reservar mesa</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-[12px] border border-[#B89A78]/40 text-[#F5EFE6] text-xs uppercase tracking-[0.14em] hover:border-[#D9BE9C] hover:text-[#D9BE9C] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
