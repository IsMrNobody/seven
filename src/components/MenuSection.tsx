import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Leaf,
  Wine,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import rawMenuData from '../data/menu.json';
import {
  MenuDatabase,
  MenuItem,
  MenuCategory,
  formatPrice,
} from '../data/siteConfig';
import { SevenImage } from './SevenImage';
import { DishDetailModal } from './DishDetailModal';

const menuData = rawMenuData as MenuDatabase;

interface SearchResultItem {
  sectionId: string;
  sectionName: string;
  categoryName: string;
  categoryType: MenuCategory['tipo'];
  item: MenuItem;
}

interface MenuSectionProps {
  activeSectionId: string;
  onSelectSection: (sectionId: string) => void;
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  activeSectionId,
  onSelectSection,
  activeCategoryId,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<{
    item: MenuItem;
    categoryName: string;
  } | null>(null);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const categoryAnchorRef = useRef<HTMLDivElement>(null);

  const currentSection = useMemo(
    () =>
      menuData.secciones.find((s) => s.id === activeSectionId) ||
      menuData.secciones[0],
    [activeSectionId]
  );

  const activeRestCategoryIndex = useMemo(() => {
    if (currentSection.id !== 'restaurante') return 0;
    const idx = currentSection.categorias.findIndex(
      (c) => c.id === activeCategoryId
    );
    return idx >= 0 ? idx : 0;
  }, [currentSection, activeCategoryId]);

  const activeRestCategory =
    currentSection.id === 'restaurante'
      ? currentSection.categorias[activeRestCategoryIndex]
      : null;

  const searchResults = useMemo<SearchResultItem[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];
    for (const sec of menuData.secciones) {
      for (const cat of sec.categorias) {
        for (const item of cat.items) {
          const matchNombre = item.nombre.toLowerCase().includes(q);
          const matchDesc = item.descripcion.toLowerCase().includes(q);
          const matchCat = cat.nombre.toLowerCase().includes(q);
          if (matchNombre || matchDesc || matchCat) {
            results.push({
              sectionId: sec.id,
              sectionName: sec.nombre,
              categoryName: cat.nombre,
              categoryType: cat.tipo,
              item,
            });
          }
        }
      }
    }
    return results;
  }, [searchQuery]);

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = menuData.secciones.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % total;
      onSelectSection(menuData.secciones[next].id);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + total) % total;
      onSelectSection(menuData.secciones[prev].id);
      tabRefs.current[prev]?.focus();
    }
  };

  const handleSelectRestCategory = (
    categoryId: string,
    scrollFromBottom = false
  ) => {
    onSelectCategory(categoryId);
    const anchor = categoryAnchorRef.current;
    if (!anchor) return;

    const headerOffset = window.innerWidth >= 768 ? 84 : 60;
    const rect = anchor.getBoundingClientRect();

    if (scrollFromBottom || rect.top < headerOffset) {
      const targetTop = window.scrollY + rect.top - headerOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="pt-24 md:pt-32 pb-20 min-h-[75vh]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Carta */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-3xl sm:text-4xl text-[#D9BE9C]">
            Una pausa, un buen gusto
          </p>
          <h1
            id="menu-heading"
            className="mt-1 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.06em] text-[#F5EFE6] text-balance"
          >
            Nuestra Carta
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#BDB5A8] font-light leading-relaxed">
            Cocina de autor con alma caribeña, café de especialidad y gelatos
            artesanales preparados cada día.
          </p>
        </div>

        {/* Controles: 3 Pestañas principales + Buscador */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-6 border-b border-[#B89A78]/20">
          {/* Tablist ARIA */}
          <div
            role="tablist"
            aria-label="Secciones del menú"
            className="inline-flex items-center gap-1 p-1.5 bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] self-start lg:self-auto overflow-x-auto max-w-full no-scrollbar"
          >
            {menuData.secciones.map((sec, idx) => {
              const isSelected = sec.id === activeSectionId && !isSearching;
              return (
                <button
                  key={sec.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`tab-${sec.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${sec.id}`}
                  tabIndex={sec.id === activeSectionId ? 0 : -1}
                  onClick={() => {
                    setSearchQuery('');
                    onSelectSection(sec.id);
                  }}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`px-5 py-2.5 rounded-[9px] text-xs sm:text-sm font-display uppercase tracking-[0.14em] whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C] ${
                    isSelected
                      ? 'bg-bronze-gradient text-[#0E0E0E] font-semibold shadow-sm'
                      : 'text-[#BDB5A8] hover:text-[#F5EFE6]'
                  }`}
                >
                  {sec.nombre}
                </button>
              );
            })}
          </div>

          {/* Buscador por nombre o ingrediente */}
          <div className="relative w-full lg:w-80">
            <label htmlFor="menu-search" className="sr-only">
              Buscar plato por nombre o ingrediente
            </label>
            <Search
              className="w-4 h-4 text-[#B89A78] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="menu-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plato o ingrediente..."
              className="w-full h-11 pl-10 pr-10 rounded-[12px] bg-[#1A1A1A] border border-[#B89A78]/30 text-sm text-[#F5EFE6] placeholder:text-[#BDB5A8]/65 focus:outline-none focus:border-[#D9BE9C] transition-colors"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#BDB5A8] hover:text-[#F5EFE6] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Vista de Resultados de Búsqueda */}
        {isSearching ? (
          <div className="pt-8" aria-live="polite">
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-sm text-[#BDB5A8]">
                <span className="text-[#D9BE9C] font-semibold tabular-nums">
                  {searchResults.length}
                </span>{' '}
                {searchResults.length === 1
                  ? 'resultado encontrado'
                  : 'resultados encontrados'}{' '}
                para &ldquo;{searchQuery.trim()}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs uppercase tracking-[0.14em] text-[#D9BE9C] hover:underline whitespace-nowrap"
              >
                Ver carta completa
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-16 px-6 text-center bg-[#1A1A1A] border border-[#B89A78]/25 rounded-[12px]">
                <p className="font-serif-editorial text-2xl text-[#F5EFE6]">
                  No encontramos coincidencias exactas
                </p>
                <p className="mt-2 text-sm text-[#BDB5A8]">
                  Prueba buscando otro ingrediente como salmón, lomito, pesto,
                  pistacho o mojito.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((res, idx) => {
                  const hasPhoto = Boolean(res.item.imagen);
                  const hasPrice =
                    res.item.precio !== null && res.item.precio !== '';
                  const isCocktail = res.categoryName === 'Cócteles';

                  return (
                    <button
                      key={`${res.sectionId}-${res.categoryName}-${res.item.nombre}-${idx}`}
                      type="button"
                      onClick={() => {
                        if (hasPhoto || res.item.descripcion) {
                          setSelectedDish({
                            item: res.item,
                            categoryName: `${res.sectionName} · ${res.categoryName}`,
                          });
                        }
                      }}
                      className="text-left group bg-[#1A1A1A] border border-[#B89A78]/25 hover:border-[#D9BE9C] rounded-[12px] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
                    >
                      {hasPhoto && (
                        <div className="aspect-square w-full overflow-hidden">
                          <SevenImage
                            src={res.item.imagen}
                            alt={`${res.item.nombre} — ${res.categoryName}`}
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            caption={res.item.nombre}
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89A78] mb-1.5">
                            {res.sectionName} · {res.categoryName}
                          </p>
                          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-[#F5EFE6] group-hover:text-[#D9BE9C] transition-colors">
                            {res.item.nombre}
                          </h2>
                          {res.item.descripcion && (
                            <p className="mt-2 text-xs leading-relaxed text-[#BDB5A8] line-clamp-3">
                              {res.item.descripcion}
                            </p>
                          )}
                        </div>
                        {(hasPrice || isCocktail) && (
                          <div className="pt-2 border-t border-[#B89A78]/15 flex items-center justify-between">
                            <span className="font-display text-lg font-semibold tabular-nums text-[#D9BE9C]">
                              {formatPrice(res.item.precio)}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.14em] text-[#BDB5A8] group-hover:text-[#F5EFE6]">
                              Ver detalle
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Panel activo de la pestaña */
          <div
            role="tabpanel"
            id={`panel-${currentSection.id}`}
            aria-labelledby={`tab-${currentSection.id}`}
            className="pt-6"
          >
            {/* SECCIÓN 1: RESTAURANTE (1 categoría a la vez para liberar espacio) */}
            {currentSection.id === 'restaurante' && activeRestCategory && (
              <div ref={categoryAnchorRef}>
                {/* Sub-navegación horizontal de categorías */}
                <div className="sticky top-14 md:top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-2.5 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#B89A78]/15">
                  <nav
                    aria-label="Categorías de restaurante"
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar"
                  >
                    {currentSection.categorias.map((cat) => {
                      const isActive = activeRestCategory.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectRestCategory(cat.id)}
                          aria-pressed={isActive}
                          className={`px-4 py-2 rounded-[10px] text-xs font-medium uppercase tracking-[0.12em] whitespace-nowrap shrink-0 border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C] ${
                            isActive
                              ? 'border-[#D9BE9C] bg-[#1A1A1A] text-[#D9BE9C]'
                              : 'border-[#B89A78]/20 bg-[#1A1A1A]/60 text-[#BDB5A8] hover:text-[#F5EFE6] hover:border-[#B89A78]/50'
                          }`}
                        >
                          {cat.nombre}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Categoría activa */}
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#B89A78]/25">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89A78] mb-1">
                        Restaurante · Categoría {activeRestCategoryIndex + 1} de{' '}
                        {currentSection.categorias.length}
                      </p>
                      <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#F5EFE6] tracking-wide">
                        {activeRestCategory.nombre}
                      </h2>
                    </div>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#B89A78] tabular-nums">
                      {activeRestCategory.items.length}{' '}
                      {activeRestCategory.items.length === 1
                        ? 'opción'
                        : 'opciones'}
                    </span>
                  </div>

                  {activeRestCategory.tipo === 'tarjetas' ? (
                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeRestCategory.items.map((item) => (
                        <button
                          key={item.nombre}
                          type="button"
                          onClick={() =>
                            setSelectedDish({
                              item,
                              categoryName: activeRestCategory.nombre,
                            })
                          }
                          className="text-left group bg-[#1A1A1A] border border-[#B89A78]/25 hover:border-[#D9BE9C] rounded-[12px] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BE9C]"
                        >
                          <div className="aspect-square w-full overflow-hidden">
                            <SevenImage
                              src={item.imagen}
                              alt={`${item.nombre} — ${activeRestCategory.nombre} en SEVEN Restaurant & Lounge`}
                              className="w-full h-full"
                              imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              caption={item.nombre}
                            />
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                            <div>
                              <h3 className="font-display text-lg sm:text-xl font-semibold uppercase tracking-wide text-[#F5EFE6] group-hover:text-[#D9BE9C] transition-colors">
                                {item.nombre}
                              </h3>
                              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#BDB5A8] font-light line-clamp-3">
                                {item.descripcion}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-[#B89A78]/15 flex items-center justify-between">
                              <span className="font-display text-xl font-semibold tabular-nums text-[#D9BE9C]">
                                {formatPrice(item.precio)}
                              </span>
                              <span className="text-[11px] uppercase tracking-[0.15em] text-[#BDB5A8] group-hover:text-[#F5EFE6] transition-colors">
                                Ver plato
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* Diseño tipográfico elegante en dos columnas para Cócteles */
                    <div className="mt-7 bg-[#1A1A1A] border border-[#B89A78]/25 rounded-[12px] p-6 sm:p-8 lg:p-10">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B89A78]/15">
                        <span className="w-10 h-10 rounded-full seven-circle-sand border border-[#B89A78]/45 flex items-center justify-center shrink-0">
                          <Wine
                            className="w-4 h-4 text-[#D9BE9C]"
                            strokeWidth={1.4}
                          />
                        </span>
                        <div>
                          <p className="font-script text-2xl text-[#D9BE9C] leading-none">
                            Coctelería clásica &amp; de autor
                          </p>
                          <p className="text-xs text-[#BDB5A8] mt-1">
                            Preparados al momento en nuestra barra lounge
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                        {activeRestCategory.items.map((cocktail) => (
                          <div
                            key={cocktail.nombre}
                            className="pb-4 border-b border-[#B89A78]/15 flex items-start justify-between gap-4"
                          >
                            <div>
                              <h3 className="font-display text-base sm:text-lg font-semibold uppercase tracking-wide text-[#F5EFE6]">
                                {cocktail.nombre}
                              </h3>
                              <p className="mt-1 text-xs sm:text-[13px] text-[#BDB5A8] font-light leading-relaxed">
                                {cocktail.descripcion}
                              </p>
                            </div>
                            <span className="font-display text-sm sm:text-base uppercase tracking-wider text-[#D9BE9C] tabular-nums whitespace-nowrap shrink-0 pt-0.5">
                              {formatPrice(cocktail.precio)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Paginador Anterior / Siguiente categoría */}
                  <div className="mt-10 pt-6 border-t border-[#B89A78]/20 flex items-center justify-between gap-4">
                    {activeRestCategoryIndex > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectRestCategory(
                            currentSection.categorias[
                              activeRestCategoryIndex - 1
                            ].id,
                            true
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#1A1A1A] border border-[#B89A78]/30 hover:border-[#D9BE9C] text-xs uppercase tracking-[0.12em] text-[#F5EFE6] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#D9BE9C]" />
                        <span>
                          {
                            currentSection.categorias[
                              activeRestCategoryIndex - 1
                            ].nombre
                          }
                        </span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {activeRestCategoryIndex <
                      currentSection.categorias.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectRestCategory(
                            currentSection.categorias[
                              activeRestCategoryIndex + 1
                            ].id,
                            true
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#1A1A1A] border border-[#B89A78]/30 hover:border-[#D9BE9C] text-xs uppercase tracking-[0.12em] text-[#F5EFE6] transition-colors"
                      >
                        <span>
                          {
                            currentSection.categorias[
                              activeRestCategoryIndex + 1
                            ].nombre
                          }
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#D9BE9C]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 2: CAFETERÍA */}
            {currentSection.id === 'cafeteria' && (
              <div className="pt-4 space-y-12">
                <div className="text-center">
                  <p className="font-serif-editorial text-5xl sm:text-6xl font-normal text-[#F5EFE6] tracking-wide">
                    Café &amp; Postres
                  </p>
                  <p className="mt-2 font-script text-3xl text-[#D9BE9C]">
                    Una pausa, un buen gusto
                  </p>
                </div>

                {/* Fotos de apoyo de Cafetería */}
                {currentSection.fotos_apoyo && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {currentSection.fotos_apoyo.map((foto, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] rounded-[12px] overflow-hidden border border-[#B89A78]/30 bg-[#1A1A1A]"
                      >
                        <SevenImage
                          src={foto.imagen}
                          alt={foto.alt}
                          className="w-full h-full"
                          imgClassName="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                          caption="Cafetería SEVEN"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Listas elegantes sin precio con hoja dorada */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentSection.categorias.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] p-6 sm:p-8"
                    >
                      <h2 className="font-serif-editorial text-3xl text-[#D9BE9C] pb-3 border-b border-[#B89A78]/25">
                        {cat.nombre}
                      </h2>
                      <ul className="mt-5 divide-y divide-[#B89A78]/15">
                        {cat.items.map((item) => (
                          <li
                            key={item.nombre}
                            className="py-3.5 flex items-center gap-3.5 text-[#F5EFE6]"
                          >
                            <Leaf
                              className="w-4 h-4 text-[#B89A78] shrink-0"
                              strokeWidth={1.4}
                              aria-hidden="true"
                            />
                            <span className="text-sm sm:text-base font-normal tracking-wide">
                              {item.nombre}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN 3: GELATOS */}
            {currentSection.id === 'gelatos' && (
              <div className="pt-4 space-y-12">
                <div className="text-center">
                  <p className="font-serif-editorial text-5xl sm:text-6xl font-normal text-[#F5EFE6] tracking-wide">
                    Gelatos
                  </p>
                  <p className="mt-2 font-script text-3xl text-[#D9BE9C]">
                    Tradición artesanal en cada sabor
                  </p>
                </div>

                {/* Galería de fotos de apoyo de Gelatos */}
                {currentSection.fotos_apoyo && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {currentSection.fotos_apoyo.map((foto, i) => (
                      <div
                        key={i}
                        className={`rounded-[12px] overflow-hidden border border-[#B89A78]/30 bg-[#1A1A1A] ${
                          i === 0
                            ? 'col-span-2 md:col-span-1 aspect-[4/3] md:aspect-[3/4]'
                            : 'aspect-[3/4]'
                        }`}
                      >
                        <SevenImage
                          src={foto.imagen}
                          alt={foto.alt}
                          className="w-full h-full"
                          imgClassName="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                          caption="Gelatos SEVEN"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tres columnas de sabores sin precio con hoja dorada */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                  {currentSection.categorias.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-[#1A1A1A] border border-[#B89A78]/30 rounded-[12px] p-6 sm:p-7"
                    >
                      <h2 className="font-serif-editorial text-3xl text-[#D9BE9C] pb-3 border-b border-[#B89A78]/25">
                        {cat.nombre}
                      </h2>
                      <ul className="mt-4 divide-y divide-[#B89A78]/15">
                        {cat.items.map((item) => (
                          <li
                            key={item.nombre}
                            className="py-3 flex items-start gap-3 text-[#F5EFE6]"
                          >
                            <Leaf
                              className="w-4 h-4 text-[#B89A78] shrink-0 mt-0.5"
                              strokeWidth={1.4}
                              aria-hidden="true"
                            />
                            <span className="text-sm font-normal leading-snug">
                              {item.nombre}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de detalle del plato */}
      <DishDetailModal
        item={selectedDish?.item || null}
        categoryName={selectedDish?.categoryName}
        onClose={() => setSelectedDish(null)}
      />
    </section>
  );
};
