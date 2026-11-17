export type PageId =
  | 'inicio'
  | 'menu'
  | 'ambientes'
  | 'quienes-somos'
  | 'contacto';

export interface MenuItem {
  nombre: string;
  descripcion: string;
  precio: number | string | null;
  imagen: string;
}

export interface MenuCategory {
  id: string;
  nombre: string;
  tipo: 'tarjetas' | 'tipografica' | 'lista';
  items: MenuItem[];
}

export interface SupportPhoto {
  imagen: string;
  alt: string;
}

export interface MenuSectionData {
  id: string;
  nombre: string;
  subtitulo: string;
  fotos_apoyo?: SupportPhoto[];
  categorias: MenuCategory[];
}

export interface MenuDatabase {
  moneda: string;
  secciones: MenuSectionData[];
}

export interface AmbienteItem {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
}

export const BRAND = {
  nombre: 'SEVEN Restaurant & Lounge',
  hotel: 'Hotel Mare Mares, Lechería, Venezuela',
  lema: 'Sabores únicos, ambientes inolvidables, elegancia y tradición caribeña',
  fraseInstagram: '¡Una experiencia gastronómica inolvidable!',
  logoPrincipal:
    'https://www.sevenrestaurantve.com/wp-content/uploads/2020/12/Logo-Seven-RESTAURANT-lounge_Mesa-de-trabajo-1-copy-36.png',
  logoBlanco:
    'https://www.sevenrestaurantve.com/wp-content/uploads/2023/11/Logo-Seven-RESTAURANT-BLANCO-SIN-FONDO_Mesa-de-trabajo-1-copy-71.png',
  logoFallbackLocal: '/assets/aistudio/sevenrest_3cf9e2d6.jpg',
  heroImagen:
    '/src/assets/images/lomito_tentacion_1794874687028.jpg',
  whatsappReservasUrl:
    'https://wa.me/584121249249?text=Hola%20Seven%2C%20quisiera%20hacer%20una%20reservaci%C3%B3n.',
  whatsappReservasNumero: '+58 412-1249249',
  whatsappContactoUrl: 'https://wa.me/584148118595',
  whatsappContactoNumero: '+58 414-8118595',
  email: 'info@sevenrestauratve.com',
  instagramHandle: '@sevenrestaurant_',
  instagramUrl: 'https://www.instagram.com/sevenrestaurant_/',
  mapsUrl:
    "https://www.google.com/maps/place/10%C2%B011'48.4%22N+64%C2%B040'31.9%22W/@10.1967778,-64.6755278,17z",
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=10.1967778,-64.6755278&z=17&output=embed',
  horarios: [
    { dias: 'Domingo a jueves', horas: '8:00 am a 11:00 pm' },
    { dias: 'Viernes y sábado', horas: '8:00 am a 1:00 am' },
  ],
};

// Edita el campo "imagen" con la URL real de cada ambiente cuando la tengas disponible
export const AMBIENTES_GALLERY: AmbienteItem[] = [
  {
    id: 'salon-principal',
    titulo: 'Salón Principal',
    subtitulo: 'Calidez y diseño contemporáneo',
    descripcion:
      'Iluminación íntima, texturas en madera oscura y detalles dorados pensados para almuerzos ejecutivos y cenas memorables.',
    imagen: '',
  },
  {
    id: 'lounge-barra',
    titulo: 'Barra & Lounge',
    subtitulo: 'Coctelería de autor',
    descripcion:
      'El punto de encuentro ideal al caer la tarde en Lechería, con música selecta y coctelería clásica e innovadora.',
    imagen: '',
  },
  {
    id: 'terraza-mare-mares',
    titulo: 'Terraza Hotel Mare Mares',
    subtitulo: 'Brisa costera y tradición caribeña',
    descripcion:
      'Un respiro al aire libre rodeado de la elegancia tropical del hotel, perfecto para sobremesas, cafés y gelatos.',
    imagen: '',
  },
  {
    id: 'eventos-privados',
    titulo: 'Espacios para Celebrar',
    subtitulo: 'Momentos a medida',
    descripcion:
      'Mesas amplias y atención cercana para celebraciones familiares, encuentros corporativos y ocasiones especiales.',
    imagen: '',
  },
];

export function formatPrice(precio: number | string | null | undefined): string {
  if (precio === null || precio === undefined || precio === '') {
    return 'Consultar';
  }
  if (typeof precio === 'number') {
    return `$${precio.toFixed(2)}`;
  }
  return String(precio);
}
