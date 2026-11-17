import React from 'react';
import { Sparkles, Shapes, ShoppingBag, Camera } from 'lucide-react';
import { AMBIENTES_GALLERY } from '../data/siteConfig';
import { SevenImage } from './SevenImage';

export const AmbientesAndExperiences: React.FC = () => {
  return (
    <>
      {/* SECCIÓN AMBIENTES */}
      <section
        id="ambientes"
        aria-labelledby="ambientes-heading"
        className="pt-24 md:pt-32 pb-16 sm:pb-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-script text-3xl sm:text-4xl text-[#D9BE9C]">
                Espacios pensados para quedarse
              </p>
              <h2
                id="ambientes-heading"
                className="mt-1 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.06em] text-[#F5EFE6]"
              >
                Ambientes
              </h2>
            </div>
            <p className="text-sm text-[#BDB5A8] max-w-md font-light leading-relaxed">
              Dentro del Hotel Mare Mares en Lechería, cada rincón combina
              calidez contemporánea, iluminación íntima y brisa caribeña.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AMBIENTES_GALLERY.map((ambiente) => (
              <article
                key={ambiente.id}
                className="bg-[#1A1A1A] border border-[#B89A78]/30 hover:border-[#D9BE9C] rounded-[12px] overflow-hidden transition-all duration-200 group"
              >
                <div className="aspect-[16/10] w-full relative">
                  {ambiente.imagen ? (
                    <SevenImage
                      src={ambiente.imagen}
                      alt={`${ambiente.titulo} — SEVEN Restaurant & Lounge`}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      caption={ambiente.titulo}
                    />
                  ) : (
                    <SevenImage
                      src=""
                      alt={`Espacio ${ambiente.titulo} en SEVEN Restaurant & Lounge`}
                      className="w-full h-full"
                      caption={ambiente.titulo}
                    />
                  )}
                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full seven-circle-sand border border-[#B89A78]/45 flex items-center justify-center pointer-events-none">
                    <Camera
                      className="w-4 h-4 text-[#D9BE9C]"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#B89A78]">
                    {ambiente.subtitulo}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold uppercase tracking-wide text-[#F5EFE6]">
                    {ambiente.titulo}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#BDB5A8] font-light leading-relaxed">
                    {ambiente.descripcion}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN KIDS PLAY Y BOUTIQUE */}
      <section
        id="experiencias"
        aria-label="Kids Play y Boutique"
        className="py-16 sm:py-20 border-t border-[#B89A78]/20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloque Kids Play */}
            <article
              id="kids-play"
              className="bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] p-7 sm:p-9 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full seven-circle-sand border border-[#B89A78]/60 flex items-center justify-center shrink-0">
                    <Shapes
                      className="w-6 h-6 text-[#D9BE9C]"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89A78]">
                      Para toda la familia
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5EFE6]">
                      Kids Play
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base text-[#BDB5A8] font-light leading-relaxed">
                  Una zona infantil diseñada para que los más pequeños se
                  diviertan con seguridad mientras disfrutas de la sobremesa,
                  un café o nuestros gelatos artesanales en completa calma.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B89A78]/15 flex items-center gap-2 text-xs text-[#D9BE9C]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span>Disponible durante todo el horario del restaurante</span>
              </div>
            </article>

            {/* Bloque Boutique */}
            <article
              id="boutique"
              className="bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] p-7 sm:p-9 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full seven-circle-sand border border-[#B89A78]/60 flex items-center justify-center shrink-0">
                    <ShoppingBag
                      className="w-6 h-6 text-[#D9BE9C]"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89A78]">
                      Selección curada
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5EFE6]">
                      Boutique Seven
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base text-[#BDB5A8] font-light leading-relaxed">
                  Un espacio exclusivo dentro de Seven con detalles
                  gastronómicos, obsequios y piezas seleccionadas para llevar un
                  recuerdo especial del Hotel Mare Mares y de nuestra casa.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B89A78]/15 flex items-center gap-2 text-xs text-[#D9BE9C]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span>Descubre nuestra curaduría en tu próxima visita</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
