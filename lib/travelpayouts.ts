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
 * Aviasales compact path format:
 *   /search/{ORIGIN}{ADULTS}{DEST}{DDMMYYYY}[{DDMMYYYY_return}]?marker={MARKER}
 *
 * Examples:
 *   One-way:     /search/CDG1DKR10062026?marker=724585
 *   Round-trip:  /search/CDG1DKR1006202625062026?marker=724585
 */
export function buildSearchUrl(params: SearchParams): string {
  const {
    originIata,
    destinationIata,
    departDate,
    returnDate,
    adults = 1,
  } = params;

  const dep = ddmmyy(departDate);
  const ret = returnDate ? ddmmyy(returnDate) : '';

  // Format: {ORIGIN}{ADULTS}{DEST}{DDMMYYYY}[{DDMMYYYY}]
  // e.g. one-way:    CDG1DKR10062026
  //      round-trip: CDG1DKR10062026250620261  ← return date appended, no extra flag
  const segment = returnDate
    ? `${originIata}${adults}${destinationIata}${dep}${ret}`
    : `${originIata}${adults}${destinationIata}${dep}`;

  return `https://www.aviasales.fr/search/${segment}?marker=${MARKER}`;
}

// Keep old name as alias so nothing else breaks
export const buildAviasalesUrl = buildSearchUrl;

function ddmmyy(dateStr: string): string {
  // YYYY-MM-DD → DDMMYYYY  (full 4-digit year required by Aviasales)
  const [year, month, day] = dateStr.split('-');
  return `${day}${month}${year}`;
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
