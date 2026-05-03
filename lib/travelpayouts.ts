const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? '724585';

export interface SearchParams {
  originIata: string;
  destinationIata: string;
  departDate: string;   // YYYY-MM-DD
  returnDate?: string;  // YYYY-MM-DD
  adults?: number;
  children?: number;
  infants?: number;
}

/**
 * Build an Aviasales affiliate search URL via Travelpayouts marker.
 * Uses the Aviasales search URL format with the affiliate marker appended.
 */
export function buildAviasalesUrl(params: SearchParams): string {
  const {
    originIata,
    destinationIata,
    departDate,
    returnDate,
    adults = 1,
    children = 0,
    infants = 0,
  } = params;

  const base = new URL('https://www.aviasales.fr/search');

  // Aviasales compact URL format: {ORIGIN}{ADULTS}{DEST}{DDMMYY_depart}{DDMMYY_return}{0|1}
  const depFormatted = formatDateForAviasales(departDate);
  const retFormatted = returnDate ? formatDateForAviasales(returnDate) : '';

  const segment = `${originIata}${adults}${destinationIata}${depFormatted}${retFormatted}${children > 0 ? children : ''}${infants > 0 ? infants : ''}`;

  base.pathname = `/search/${segment}`;
  base.searchParams.set('marker', MARKER);

  return base.toString();
}

/**
 * Build a Travelpayouts search redirect URL (alternative, cleaner format).
 */
export function buildSearchUrl(params: SearchParams): string {
  const {
    originIata,
    destinationIata,
    departDate,
    returnDate,
    adults = 1,
    children = 0,
    infants = 0,
  } = params;

  const url = new URL('https://search.aviasales.fr/');
  url.searchParams.set('origin', originIata);
  url.searchParams.set('destination', destinationIata);
  url.searchParams.set('depart_date', departDate);
  if (returnDate) url.searchParams.set('return_date', returnDate);
  url.searchParams.set('adults', String(adults));
  if (children > 0) url.searchParams.set('children', String(children));
  if (infants > 0) url.searchParams.set('infants', String(infants));
  url.searchParams.set('marker', MARKER);
  url.searchParams.set('locale', 'fr');
  url.searchParams.set('currency', 'eur');

  return url.toString();
}

function formatDateForAviasales(dateStr: string): string {
  // Convert YYYY-MM-DD → DDMMYY
  const [year, month, day] = dateStr.split('-');
  return `${day}${month}${year.slice(2)}`;
}

export function getDefaultDepartDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export function getDefaultReturnDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 44);
  return d.toISOString().split('T')[0];
}
