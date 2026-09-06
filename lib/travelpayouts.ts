const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? '724585';

/**
 * Aviasales uses CITY codes, not airport IATA codes.
 * Both Paris airports map to PAR; for all others the city code equals the IATA.
 */
const IATA_TO_CITY: Record<string, string> = {
  // French airports
  CDG: 'PAR',
  ORY: 'PAR',
  LYS: 'LYS',
  MRS: 'MRS',
  NCE: 'NCE',
  BOD: 'BOD',
  TLS: 'TLS',
  NTE: 'NTE',
  SXB: 'SXB',
  LIL: 'LIL',
  // African destinations
  DSS: 'DSS',
  ABJ: 'ABJ',
  CMN: 'CMN',
  TUN: 'TUN',
  BKO: 'BKO',
  DLA: 'DLA',
  LBV: 'LBV',
  NBO: 'NBO',
  LOS: 'LOS',
  ACC: 'ACC',
  ALG: 'ALG',
  FIH: 'FIH',
};

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
 * Format: /search/{ORIG_CITY}{DDMM_dep}{DEST_CITY}{DDMM_ret}{PASSENGERS}?marker=…
 * Example (Paris → Casablanca, depart 2 Jun, return 4 Jun, 1 pax):
 *   /search/PAR0206CMN04061?marker=724585
 *
 * Rules:
 *  - City codes, NOT airport IATA codes (CDG/ORY → PAR)
 *  - Date = DDMM only — NO year
 *  - Passengers go last, after the return date
 */
export function buildSearchUrl(params: SearchParams): string {
  const { originIata, destinationIata, departDate, returnDate, adults = 1 } = params;

  const orig = IATA_TO_CITY[originIata] ?? originIata;
  const dest = IATA_TO_CITY[destinationIata] ?? destinationIata;

  const depDDMM = toddmm(departDate);
  const retDDMM = returnDate ? toddmm(returnDate) : '';

  const path = `${orig}${depDDMM}${dest}${retDDMM}${adults}`;

  return `https://www.aviasales.fr/search/${path}?marker=${MARKER}`;
}

// Alias kept for backwards compatibility
export const buildAviasalesUrl = buildSearchUrl;

/** YYYY-MM-DD → DDMM (no year, 4 chars) */
function toddmm(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${day}${month}`;
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
