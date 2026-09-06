export interface Airport {
  iata: string;
  name: string;
  city: string;
  slug: string;
  country: string;
  flag: string;
}

export const FRENCH_AIRPORTS: Airport[] = [
  { iata: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris CDG', slug: 'paris-cdg', country: 'France', flag: '🇫🇷' },
  { iata: 'ORY', name: 'Paris Orly',              city: 'Paris Orly', slug: 'paris-orly', country: 'France', flag: '🇫🇷' },
  { iata: 'LYS', name: 'Lyon Saint-Exupéry',      city: 'Lyon',      slug: 'lyon',       country: 'France', flag: '🇫🇷' },
  { iata: 'MRS', name: 'Marseille Provence',       city: 'Marseille', slug: 'marseille',  country: 'France', flag: '🇫🇷' },
  { iata: 'NCE', name: 'Nice Côte d\'Azur',        city: 'Nice',      slug: 'nice',       country: 'France', flag: '🇫🇷' },
  { iata: 'BOD', name: 'Bordeaux Mérignac',        city: 'Bordeaux',  slug: 'bordeaux',   country: 'France', flag: '🇫🇷' },
  { iata: 'TLS', name: 'Toulouse Blagnac',         city: 'Toulouse',  slug: 'toulouse',   country: 'France', flag: '🇫🇷' },
  { iata: 'NTE', name: 'Nantes Atlantique',        city: 'Nantes',    slug: 'nantes',     country: 'France', flag: '🇫🇷' },
  { iata: 'SXB', name: 'Strasbourg',               city: 'Strasbourg',slug: 'strasbourg', country: 'France', flag: '🇫🇷' },
  { iata: 'LIL', name: 'Lille Lesquin',            city: 'Lille',     slug: 'lille',      country: 'France', flag: '🇫🇷' },
];

export interface Destination {
  iata: string;
  name: string;
  city: string;
  slug: string;
  country: string;
  flag: string;
  description: string;
}

export const AFRICAN_DESTINATIONS: Destination[] = [
  {
    iata: 'DSS', name: 'Aéroport International Blaise Diagne', city: 'Dakar',
    slug: 'dakar', country: 'Sénégal', flag: '🇸🇳',
    description: 'Capitale du Sénégal, ville vibrante sur la pointe ouest de l\'Afrique.',
  },
  {
    iata: 'ABJ', name: 'Aéroport Félix-Houphouët-Boigny', city: 'Abidjan',
    slug: 'abidjan', country: 'Côte d\'Ivoire', flag: '🇨🇮',
    description: 'Capitale économique de la Côte d\'Ivoire, métropole dynamique d\'Afrique de l\'Ouest.',
  },
  {
    iata: 'CMN', name: 'Aéroport Mohammed V', city: 'Casablanca',
    slug: 'casablanca', country: 'Maroc', flag: '🇲🇦',
    description: 'Plus grande ville du Maroc, carrefour économique entre l\'Europe et l\'Afrique.',
  },
  {
    iata: 'TUN', name: 'Aéroport Tunis-Carthage', city: 'Tunis',
    slug: 'tunis', country: 'Tunisie', flag: '🇹🇳',
    description: 'Capitale de la Tunisie, porte d\'entrée de l\'Afrique du Nord méditerranéenne.',
  },
  {
    iata: 'BKO', name: 'Aéroport International Président Modibo Keïta', city: 'Bamako',
    slug: 'bamako', country: 'Mali', flag: '🇲🇱',
    description: 'Capitale du Mali, ville animée sur les rives du fleuve Niger.',
  },
  {
    iata: 'DLA', name: 'Aéroport International de Douala', city: 'Douala',
    slug: 'douala', country: 'Cameroun', flag: '🇨🇲',
    description: 'Capitale économique du Cameroun, principal port d\'Afrique centrale.',
  },
  {
    iata: 'LBV', name: 'Aéroport International Léon-Mba', city: 'Libreville',
    slug: 'libreville', country: 'Gabon', flag: '🇬🇦',
    description: 'Capitale du Gabon, ville côtière entourée de forêts équatoriales.',
  },
  {
    iata: 'NBO', name: 'Aéroport International Jomo Kenyatta', city: 'Nairobi',
    slug: 'nairobi', country: 'Kenya', flag: '🇰🇪',
    description: 'Capitale du Kenya, hub économique majeur d\'Afrique de l\'Est.',
  },
  {
    iata: 'LOS', name: 'Aéroport International Murtala Muhammed', city: 'Lagos',
    slug: 'lagos', country: 'Nigeria', flag: '🇳🇬',
    description: 'Plus grande ville d\'Afrique, métropole bouillonnante et capitale économique du Nigeria.',
  },
  {
    iata: 'ACC', name: 'Aéroport International Kotoka', city: 'Accra',
    slug: 'accra', country: 'Ghana', flag: '🇬🇭',
    description: 'Capitale du Ghana, ville moderne et hub régional en plein essor.',
  },
  {
    iata: 'ALG', name: 'Aéroport International Houari-Boumédiène', city: 'Alger',
    slug: 'alger', country: 'Algérie', flag: '🇩🇿',
    description: 'Capitale de l\'Algérie, plus grande ville du Maghreb sur la côte méditerranéenne.',
  },
];

export function getAirportBySlug(slug: string): Airport | undefined {
  return FRENCH_AIRPORTS.find((a) => a.slug === slug);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return AFRICAN_DESTINATIONS.find((d) => d.slug === slug);
}

export function getAirportByIata(iata: string): Airport | undefined {
  return FRENCH_AIRPORTS.find((a) => a.iata === iata);
}

export function getDestinationByIata(iata: string): Destination | undefined {
  return AFRICAN_DESTINATIONS.find((d) => d.iata === iata);
}

// Popular autocomplete destinations (worldwide)
export const POPULAR_DESTINATIONS = [
  ...AFRICAN_DESTINATIONS.map((d) => ({ iata: d.iata, label: `${d.city}, ${d.country}`, flag: d.flag })),
  { iata: 'JFK', label: 'New York, États-Unis', flag: '🇺🇸' },
  { iata: 'DXB', label: 'Dubaï, Émirats arabes unis', flag: '🇦🇪' },
  { iata: 'BKK', label: 'Bangkok, Thaïlande', flag: '🇹🇭' },
  { iata: 'SIN', label: 'Singapour', flag: '🇸🇬' },
  { iata: 'GRU', label: 'São Paulo, Brésil', flag: '🇧🇷' },
  { iata: 'MAD', label: 'Madrid, Espagne', flag: '🇪🇸' },
  { iata: 'FCO', label: 'Rome, Italie', flag: '🇮🇹' },
  { iata: 'LHR', label: 'Londres, Royaume-Uni', flag: '🇬🇧' },
  { iata: 'AMS', label: 'Amsterdam, Pays-Bas', flag: '🇳🇱' },
  { iata: 'IST', label: 'Istanbul, Turquie', flag: '🇹🇷' },
  { iata: 'MNL', label: 'Manille, Philippines', flag: '🇵🇭' },
  { iata: 'CMB', label: 'Colombo, Sri Lanka', flag: '🇱🇰' },
];
