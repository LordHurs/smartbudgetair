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
 *   /search/{ORIGIN}{ADULTS}{DEST}{DDMMYY_dep}[{DDMMYY_ret}1]?marker={MARKER}
 *
 * Examples:
 *   One-way:     /search/CDG1DKR010626?marker=724585
 *   Round-trip:  /search/CDG1DKR0106261006261?marker=724585
 *                                             ^------^ return DDMMYY
 *                                                     ^ trailing 1 = round-trip flag
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

  // Trailing "1" marks a round-trip; omit for one-way
  const segment = returnDate
    ? `${originIata}${adults}${destinationIata}${dep}${ret}1`
    : `${originIata}${adults}${destinationIata}${dep}`;

  return `https://www.aviasales.fr/search/${segment}?marker=${MARKER}`;
}

// Keep old name as alias so nothing else breaks
export const buildAviasalesUrl = buildSearchUrl;

function ddmmyy(dateStr: string): string {
  // YYYY-MM-DD → DDMMYY
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
