import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { BRAND, PageId } from '../data/siteConfig';
import { SevenLogo } from './SevenImage';

export const ContactoSection: React.FC = () => {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="pt-24 md:pt-32 pb-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-3xl sm:text-4xl text-[#D9BE9C]">
            Te esperamos en Lechería
          </p>
          <h1
            id="contacto-heading"
            className="mt-1 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.06em] text-[#F5EFE6]"
          >
            Contacto &amp; Horarios
          </h1>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Información de Contacto */}
          <div className="lg:col-span-5 bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] p-6 sm:p-8 flex flex-col justify-between gap-7">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full seven-circle-sand border border-[#B89A78]/50 flex items-center justify-center shrink-0">
                  <MapPin
                    className="w-4 h-4 text-[#D9BE9C]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.16em] text-[#D9BE9C]">
                    Dirección
                  </h2>
                  <p className="mt-1 text-sm text-[#F5EFE6]">{BRAND.hotel}</p>
                  <a
                    href={BRAND.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#BDB5A8] hover:text-[#D9BE9C] transition-colors"
                  >
                    <span>Ver ubicación en Google Maps</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full seven-circle-sand border border-[#B89A78]/50 flex items-center justify-center shrink-0">
                  <Clock
                    className="w-4 h-4 text-[#D9BE9C]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.16em] text-[#D9BE9C]">
                    Horarios
                  </h2>
                  <ul className="mt-1 space-y-1 text-sm text-[#F5EFE6]">
                    {BRAND.horarios.map((h) => (
                      <li key={h.dias}>
                        <span className="text-[#BDB5A8]">{h.dias}:</span>{' '}
                        <span className="tabular-nums">{h.horas}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full seven-circle-sand border border-[#B89A78]/50 flex items-center justify-center shrink-0">
                  <Phone
                    className="w-4 h-4 text-[#D9BE9C]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.16em] text-[#D9BE9C]">
                    Teléfono y WhatsApp
                  </h2>
                  <div className="mt-1 flex flex-col gap-1.5 text-sm">
                    <a
                      href={BRAND.whatsappReservasUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F5EFE6] hover:text-[#D9BE9C] transition-colors tabular-nums"
                    >
                      Reservas: {BRAND.whatsappReservasNumero}
                    </a>
                    <a
                      href={BRAND.whatsappContactoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#BDB5A8] hover:text-[#D9BE9C] transition-colors tabular-nums"
                    >
                      Atención adicional: {BRAND.whatsappContactoNumero}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full seven-circle-sand border border-[#B89A78]/50 flex items-center justify-center shrink-0">
                  <Mail
                    className="w-4 h-4 text-[#D9BE9C]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.16em] text-[#D9BE9C]">
                    Correo Electrónico
                  </h2>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="mt-1 inline-block text-sm text-[#F5EFE6] hover:text-[#D9BE9C] transition-colors"
                  >
                    {BRAND.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full seven-circle-sand border border-[#B89A78]/50 flex items-center justify-center shrink-0">
                  <Instagram
                    className="w-4 h-4 text-[#D9BE9C]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.16em] text-[#D9BE9C]">
                    Instagram
                  </h2>
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm text-[#F5EFE6] hover:text-[#D9BE9C] transition-colors"
                  >
                    {BRAND.instagramHandle}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={BRAND.whatsappReservasUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[12px] bg-bronze-gradient text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.16em] hover:brightness-105 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reservar por WhatsApp</span>
            </a>
          </div>

          {/* Mapa Embebido */}
          <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] overflow-hidden min-h-[340px] lg:min-h-full relative flex flex-col">
            <iframe
              title="Mapa de ubicación de SEVEN Restaurant & Lounge en Hotel Mare Mares, Lechería"
              src={BRAND.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 min-h-[340px] border-0 grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
            <div className="p-4 bg-[#1A1A1A] border-t border-[#B89A78]/20 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#BDB5A8]">
                Coordenadas: 10°11&apos;48.4&quot;N 64°40&apos;31.9&quot;W ·
                Hotel Mare Mares
              </span>
              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#D9BE9C] hover:underline whitespace-nowrap"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SiteFooterProps {
  onNavigate: (page: PageId) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const navItems: { id: PageId; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'menu', label: 'Menú' },
    { id: 'ambientes', label: 'Ambientes' },
    { id: 'quienes-somos', label: 'Quiénes somos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0E0E0E] border-t border-[#B89A78]/25 py-14 sm:py-16">
      {/* Marca de agua sutil con logo blanco */}
      <div
        className="pointer-events-none select-none absolute -right-12 -bottom-10 opacity-[0.04]"
        aria-hidden="true"
      >
        <SevenLogo
          variant="blanco"
          alt=""
          className="w-64 sm:w-80 h-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#B89A78]/15">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              aria-label="Ir al inicio — SEVEN Restaurant & Lounge"
              className="text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9BE9C]"
            >
              <SevenLogo
                variant="blanco"
                alt="SEVEN Restaurant & Lounge — Logo blanco"
                className="h-16 w-auto object-contain"
              />
            </button>
            <p className="mt-4 font-script text-2xl sm:text-3xl text-[#D9BE9C] leading-snug">
              {BRAND.lema}
            </p>
            <p className="mt-2 text-xs text-[#BDB5A8]">{BRAND.hotel}</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-[#B89A78]">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#BDB5A8]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="hover:text-[#F5EFE6] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-[#B89A78]">
              Reservas y Redes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#BDB5A8]">
              <li>
                <a
                  href={BRAND.whatsappReservasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D9BE9C] transition-colors tabular-nums"
                >
                  WhatsApp Reservas: {BRAND.whatsappReservasNumero}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsappContactoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D9BE9C] transition-colors tabular-nums"
                >
                  WhatsApp Contacto: {BRAND.whatsappContactoNumero}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-[#D9BE9C] transition-colors"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D9BE9C] transition-colors"
                >
                  Instagram: {BRAND.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BDB5A8]/80">
          <p>
            © {new Date().getFullYear()} {BRAND.nombre}. Todos los derechos
            reservados.
          </p>
          <p>{BRAND.fraseInstagram}</p>
        </div>
      </div>
    </footer>
  );
};
