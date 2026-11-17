import React, { useState, useEffect, useCallback } from 'react';
import {
  UtensilsCrossed,
  CakeSlice,
  ChefHat,
  Shapes,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Menu as MenuIcon,
  X,
  ArrowRight,
} from 'lucide-react';
import { BRAND, PageId } from './data/siteConfig';
import { SevenImage, SevenLogo } from './components/SevenImage';
import { MenuSection } from './components/MenuSection';
import { AmbientesAndExperiences } from './components/AmbientesAndExperiences';
import { ContactoSection, SiteFooter } from './components/ContactoAndFooter';

function parseHashToPage(hash: string): {
  page: PageId;
  subAnchor?: string;
} {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'menu' || clean === 'restaurante' || clean === 'cafeteria' || clean === 'gelatos') {
    return { page: 'menu' };
  }
  if (clean === 'ambientes' || clean === 'kids-play' || clean === 'boutique') {
    return { page: 'ambientes', subAnchor: clean === 'ambientes' ? undefined : clean };
  }
  if (clean === 'quienes-somos') {
    return { page: 'quienes-somos' };
  }
  if (clean === 'contacto') {
    return { page: 'contacto' };
  }
  return { page: 'inicio' };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined'
      ? parseHashToPage(window.location.hash).page
      : 'inicio'
  );
  const [activeMenuSection, setActiveMenuSection] =
    useState<string>('restaurante');
  const [activeRestCategory, setActiveRestCategory] = useState<string>(
    'entradas-y-ensaladas'
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const navigateTo = useCallback(
    (page: PageId, options?: { subAnchor?: string; menuSection?: string; restCategory?: string }) => {
      if (options?.menuSection) setActiveMenuSection(options.menuSection);
      if (options?.restCategory) setActiveRestCategory(options.restCategory);

      setCurrentPage(page);
      setMobileNavOpen(false);

      const targetHash = options?.subAnchor ? `#${options.subAnchor}` : `#${page}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }

      if (options?.subAnchor) {
        setTimeout(() => {
          const el = document.getElementById(options.subAnchor!);
          el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    [reducedMotion]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onMotionChange);

    const handleScroll = () => {
      if (!mediaQuery.matches) {
        setScrollY(Math.min(window.scrollY, 600));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleHashChange = () => {
      const parsed = parseHashToPage(window.location.hash);
      setCurrentPage(parsed.page);
      if (parsed.subAnchor) {
        setTimeout(() => {
          document
            .getElementById(parsed.subAnchor!)
            ?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const highlightCircles = [
    {
      label: 'Platos',
      icon: UtensilsCrossed,
      action: () =>
        navigateTo('menu', {
          menuSection: 'restaurante',
          restCategory: 'entradas-y-ensaladas',
        }),
    },
    {
      label: 'Postres',
      icon: CakeSlice,
      action: () => navigateTo('menu', { menuSection: 'cafeteria' }),
    },
    {
      label: 'Chef',
      icon: ChefHat,
      action: () =>
        navigateTo('menu', {
          menuSection: 'restaurante',
          restCategory: 'aves-y-carnes',
        }),
    },
    {
      label: 'Kids Play',
      icon: Shapes,
      action: () => navigateTo('ambientes', { subAnchor: 'kids-play' }),
    },
    {
      label: 'Sugerencias',
      icon: Sparkles,
      action: () => navigateTo('menu', { menuSection: 'gelatos' }),
    },
    {
      label: 'Boutique',
      icon: ShoppingBag,
      action: () => navigateTo('ambientes', { subAnchor: 'boutique' }),
    },
  ];

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'menu', label: 'Menú' },
    { id: 'ambientes', label: 'Ambientes' },
    { id: 'quienes-somos', label: 'Quiénes somos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0E0E0E] text-[#F5EFE6] seven-sand-texture selection:bg-[#B89A78]/30 selection:text-[#F5EFE6]">
      {/* 1. HEADER FIJO TRANSLÚCIDO (3 zonas) */}
      <header className="fixed top-0 inset-x-0 z-40 h-14 md:h-20 bg-[#0E0E0E]/85 backdrop-blur-md border-b border-[#B89A78]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">
          {/* Zona 1: Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('inicio');
            }}
            aria-label="Inicio — SEVEN Restaurant & Lounge"
            className="shrink-0 flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9BE9C]"
          >
            <SevenLogo
              variant="principal"
              alt="SEVEN Restaurant & Lounge"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Zona 2: Navegación */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-[0.18em]"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-1 border-b transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#D9BE9C] border-[#D9BE9C]'
                      : 'text-[#BDB5A8] border-transparent hover:text-[#D9BE9C]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zona 3: Acción Principal + Menú Móvil */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BRAND.whatsappReservasUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-[12px] bg-bronze-gradient text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] hover:brightness-105 transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
            >
              <span>Reservar</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-expanded={mobileNavOpen}
              aria-label={mobileNavOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden w-10 h-10 rounded-[10px] border border-[#B89A78]/35 text-[#F5EFE6] flex items-center justify-center hover:border-[#D9BE9C] transition-colors"
            >
              {mobileNavOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Drawer de navegación móvil */}
        {mobileNavOpen && (
          <nav
            aria-label="Navegación móvil"
            className="md:hidden bg-[#0E0E0E]/98 border-b border-[#B89A78]/25 px-6 py-5 flex flex-col gap-4 text-sm uppercase tracking-[0.16em]"
          >
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('inicio');
              }}
              aria-current={currentPage === 'inicio' ? 'page' : undefined}
              className={`py-1.5 ${
                currentPage === 'inicio'
                  ? 'text-[#D9BE9C]'
                  : 'text-[#F5EFE6] hover:text-[#D9BE9C]'
              }`}
            >
              Inicio
            </a>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.id);
                }}
                aria-current={currentPage === link.id ? 'page' : undefined}
                className={`py-1.5 ${
                  currentPage === link.id
                    ? 'text-[#D9BE9C]'
                    : 'text-[#F5EFE6] hover:text-[#D9BE9C]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* CONTENIDO DE LA PÁGINA ACTIVA */}
      <main className="flex-1">
        {/* PÁGINA 1: INICIO */}
        {currentPage === 'inicio' && (
          <>
            <section
              id="inicio"
              className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 pb-12"
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: reducedMotion
                    ? undefined
                    : `translate3d(0, ${scrollY * 0.16}px, 0) scale(1.06)`,
                }}
                aria-hidden="true"
              >
                <SevenImage
                  src={BRAND.heroImagen}
                  alt="Plato de cocina de autor de SEVEN Restaurant & Lounge"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  priority
                />
              </div>

              <div
                className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/80 via-[#0E0E0E]/68 to-[#0E0E0E]"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
                <SevenLogo
                  variant="principal"
                  alt="SEVEN Restaurant & Lounge"
                  className="h-28 sm:h-36 md:h-44 w-auto object-contain drop-shadow-2xl"
                />

                <h1 className="sr-only">
                  SEVEN Restaurant &amp; Lounge — Hotel Mare Mares, Lechería
                </h1>

                <p className="mt-6 font-script text-3xl sm:text-5xl text-[#D9BE9C] leading-snug max-w-2xl text-balance drop-shadow">
                  {BRAND.lema}
                </p>

                <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F5EFE6]/90 font-normal">
                  Hotel Mare Mares · Lechería, Venezuela
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => navigateTo('menu')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-[12px] bg-bronze-gradient text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.16em] hover:brightness-105 transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
                  >
                    <span>Ver menú</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href={BRAND.whatsappReservasUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-[12px] bg-[#0E0E0E]/75 border border-[#B89A78]/70 text-[#F5EFE6] hover:border-[#D9BE9C] hover:text-[#D9BE9C] font-medium text-xs uppercase tracking-[0.16em] transition-all whitespace-nowrap backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D9BE9C]" />
                    <span>Reservar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Accesos rápidos estilo historias destacadas */}
            <section
              aria-label="Accesos directos de la experiencia Seven"
              className="py-16 sm:py-20 border-t border-[#B89A78]/20"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="font-script text-3xl text-[#D9BE9C]">
                  {BRAND.fraseInstagram}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#B89A78]">
                  Explora cada rincón de Seven
                </p>

                <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-5">
                  {highlightCircles.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={item.action}
                        className="group flex flex-col items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9BE9C]"
                      >
                        <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full seven-circle-sand border border-[#B89A78]/55 group-hover:border-[#D9BE9C] group-hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                          <IconComponent
                            className="w-6 h-6 text-[#D9BE9C]"
                            strokeWidth={1.35}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.14em] text-[#BDB5A8] group-hover:text-[#F5EFE6] transition-colors whitespace-nowrap">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* PÁGINA 2: MENÚ */}
        {currentPage === 'menu' && (
          <MenuSection
            activeSectionId={activeMenuSection}
            onSelectSection={setActiveMenuSection}
            activeCategoryId={activeRestCategory}
            onSelectCategory={setActiveRestCategory}
          />
        )}

        {/* PÁGINA 3: AMBIENTES, KIDS PLAY Y BOUTIQUE */}
        {currentPage === 'ambientes' && <AmbientesAndExperiences />}

        {/* PÁGINA 4: QUIÉNES SOMOS */}
        {currentPage === 'quienes-somos' && (
          <section
            id="quienes-somos"
            aria-labelledby="quienes-somos-heading"
            className="pt-24 md:pt-32 pb-20"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <p className="font-script text-3xl sm:text-4xl text-[#D9BE9C]">
                    {BRAND.fraseInstagram}
                  </p>
                  <h1
                    id="quienes-somos-heading"
                    className="mt-1 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.06em] text-[#F5EFE6] text-balance"
                  >
                    La Experiencia Seven
                  </h1>

                  <div className="mt-6 space-y-4 text-sm sm:text-base text-[#BDB5A8] font-light leading-relaxed max-w-2xl">
                    <p>
                      Ubicado dentro del Hotel Mare Mares en Lechería,{' '}
                      <span className="text-[#F5EFE6] font-normal">
                        SEVEN Restaurant &amp; Lounge
                      </span>{' '}
                      reúne cocina de autor con fusión internacional y toque
                      caribeño en un entorno cercano, elegante y memorable.
                    </p>
                    <p>
                      Desde un desayuno o café de media tarde acompañado de
                      repostería de la casa y gelatos artesanales, hasta cenas
                      con pescados frescos, cortes al grill, coctelería lounge,
                      zona Kids Play y nuestra boutique.
                    </p>
                  </div>

                  {/* Círculos estilo historias destacadas de Instagram */}
                  <div className="mt-9">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89A78] mb-4">
                      Explora nuestros espacios
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                      {highlightCircles.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={item.action}
                            className="group flex flex-col items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9BE9C]"
                          >
                            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full seven-circle-sand border border-[#B89A78]/55 group-hover:border-[#D9BE9C] group-hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                              <IconComponent
                                className="w-5 h-5 sm:w-6 sm:h-6 text-[#D9BE9C]"
                                strokeWidth={1.35}
                                aria-hidden="true"
                              />
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.14em] text-[#BDB5A8] group-hover:text-[#F5EFE6] transition-colors whitespace-nowrap">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Fotografía gastronómica con frase manuscrita */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-[12px] overflow-hidden border border-[#B89A78]/35 bg-[#1A1A1A] aspect-[4/5]">
                    <SevenImage
                      src="/src/assets/images/salmon_crema_limon_1794874688744.jpg"
                      alt="Salmón en crema de limón — Cocina de autor en SEVEN Restaurant & Lounge"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover"
                      caption="Cocina de autor SEVEN"
                      priority
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-5 inset-x-6">
                      <p className="font-script text-3xl sm:text-4xl text-[#F5EFE6] drop-shadow">
                        El clásico de siempre
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#D9BE9C]">
                        Cocina de autor · Lechería
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PÁGINA 5: CONTACTO */}
        {currentPage === 'contacto' && <ContactoSection />}
      </main>

      {/* FOOTER */}
      <SiteFooter onNavigate={(page) => navigateTo(page)} />

      {/* Botón flotante de WhatsApp */}
      <a
        href={BRAND.whatsappReservasUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reservar por WhatsApp en SEVEN Restaurant & Lounge"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 h-11 px-4 sm:px-5 rounded-full bg-bronze-gradient text-[#0E0E0E] font-semibold text-xs uppercase tracking-[0.14em] shadow-[0_10px_28px_rgba(0,0,0,0.65)] hover:brightness-105 active:scale-95 transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
      >
        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Reservar</span>
      </a>
    </div>
  );
}
