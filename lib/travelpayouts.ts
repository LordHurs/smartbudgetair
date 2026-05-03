const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? '724585';

export interface SearchParams {
  originIata: string;
  destinationIata: string;
  departDate: string;   // YYYY-MM-DD
  returnDate?: string;  // YYYY-MM-DD
  adults?: number;
}

/**
 * Build an Aviasales affiliate search URL.
 *
 * Format: /search/{ORIGIN}{N_ADULTS}{DEST}{DDMMYYYY}?marker={MARKER}
 * Example (one-way, 1 adult, CDG→CMN, 10 Jun 2026):
 *   /search/CDG1CMN10062026?marker=724585
 */
export function buildSearchUrl(params: SearchParams): string {
  const { originIata, destinationIata, departDate, adults = 1 } = params;

  // Parse YYYY-MM-DD into separate parts so there is no ambiguity
  const [depYear, depMonth, depDay] = departDate.split('-');

  // Aviasales date format: DD MM YYYY  (each component zero-padded, full 4-digit year)
  const depSegment = `${depDay}${depMonth}${depYear}`;

  // Always generate a one-way style URL; Aviasales shows round-trip options on its results page
  const path = `${originIata}${adults}${destinationIata}${depSegment}`;

  return `https://www.aviasales.fr/search/${path}?marker=${MARKER}`;
}

// Alias kept for backwards compatibility
export const buildAviasalesUrl = buildSearchUrl;

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
