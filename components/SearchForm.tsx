'use client';

import { useState, useEffect, useRef } from 'react';
import { FRENCH_AIRPORTS, POPULAR_DESTINATIONS } from '@/lib/airports';
import { buildSearchUrl, getDefaultDepartDate, getDefaultReturnDate } from '@/lib/travelpayouts';

interface SearchFormProps {
  defaultOrigin?: string;
  defaultDestination?: string;       // IATA code
  defaultDestinationLabel?: string;  // display label
  compact?: boolean;
}

const PASSENGERS_OPTIONS = [
  { value: 1, label: '1 adulte' },
  { value: 2, label: '2 adultes' },
  { value: 3, label: '3 adultes' },
  { value: 4, label: '4 adultes' },
  { value: 5, label: '5 adultes' },
  { value: 6, label: '6 adultes' },
];

export default function SearchForm({
  defaultOrigin = 'CDG',
  defaultDestination = '',
  defaultDestinationLabel = '',
  compact = false,
}: SearchFormProps) {
  const [origin, setOrigin] = useState(defaultOrigin);
  const [adults, setAdults] = useState(1);
  const [tripType, setTripType] = useState<'aller-retour' | 'aller-simple'>('aller-retour');
  const [departDate, setDepartDate] = useState(getDefaultDepartDate());
  const [returnDate, setReturnDate] = useState(getDefaultReturnDate());

  // --- destination state -------------------------------------------------
  // `selectedIata` is the value sent in the URL — it is ONLY set when the
  // user explicitly picks an entry from the dropdown.  `inputText` is what
  // the user sees in the text box.  Keeping them separate prevents the form
  // from silently submitting a stale or empty IATA code.
  const [selectedIata, setSelectedIata]   = useState(defaultDestination);
  const [selectedLabel, setSelectedLabel] = useState(defaultDestinationLabel);
  const [inputText, setInputText]         = useState(defaultDestinationLabel);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  // -----------------------------------------------------------------------

  const destRef = useRef<HTMLDivElement>(null);

  const suggestions = POPULAR_DESTINATIONS.filter((d) => {
    const q = inputText.toLowerCase();
    return (
      d.label.toLowerCase().includes(q) ||
      d.iata.toLowerCase().includes(q)
    );
  }).slice(0, 9);

  // Close dropdown on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        // If the user typed but never selected, restore the last confirmed label
        if (!selectedIata) setInputText('');
        else setInputText(selectedLabel);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [selectedIata, selectedLabel]);

  function pickDestination(iata: string, label: string) {
    setSelectedIata(iata);
    setSelectedLabel(label);
    setInputText(label);
    setDropdownOpen(false);
  }

  function clearDestination() {
    setSelectedIata('');
    setSelectedLabel('');
    setInputText('');
    setDropdownOpen(true);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedIata || !departDate) return;

    const url = buildSearchUrl({
      originIata: origin,
      destinationIata: selectedIata,
      departDate,
      returnDate: tripType === 'aller-retour' ? returnDate : undefined,
      adults,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const inputBase =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 ' +
    'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 ' +
    'focus:border-transparent transition-all duration-200 shadow-sm text-sm font-medium';

  const labelBase = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5';

  return (
    <form onSubmit={handleSearch} className="w-full">
      {/* Trip type toggle */}
      <div className="flex gap-2 mb-5">
        {(['aller-retour', 'aller-simple'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              tripType === t
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200'
            }`}
          >
            {t === 'aller-retour' ? '↔ Aller-retour' : '→ Aller simple'}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-12'}`}>

        {/* ── Origin ── */}
        <div className={compact ? '' : 'lg:col-span-3'}>
          <label className={labelBase}>✈ Départ de</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={inputBase}
          >
            {FRENCH_AIRPORTS.map((a) => (
              <option key={a.iata} value={a.iata}>
                {a.flag} {a.city} ({a.iata})
              </option>
            ))}
          </select>
        </div>

        {/* ── Destination autocomplete ── */}
        <div className={`relative ${compact ? '' : 'lg:col-span-3'}`} ref={destRef}>
          <label className={labelBase}>🌍 Destination</label>

          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                // Invalidate the confirmed IATA whenever the user edits the text
                setSelectedIata('');
                setSelectedLabel('');
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              placeholder="Ex : Dakar, Abidjan…"
              className={`${inputBase} pr-20`}
              autoComplete="off"
            />

            {/* IATA badge — shown when a destination is confirmed */}
            {selectedIata && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="bg-brand-600 text-white text-xs font-bold px-1.5 py-0.5 rounded font-mono">
                  {selectedIata}
                </span>
              </div>
            )}

            {/* Clear button */}
            {inputText && (
              <button
                type="button"
                onClick={clearDestination}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Effacer la destination"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Dropdown */}
          {dropdownOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-h-64 overflow-y-auto">
              {suggestions.map((d) => (
                <button
                  key={d.iata}
                  type="button"
                  onMouseDown={(e) => {
                    // Use onMouseDown + preventDefault to prevent the input's
                    // onBlur from firing before the click registers
                    e.preventDefault();
                    pickDestination(d.iata, d.label);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-brand-50 transition-colors flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl flex-shrink-0">{d.flag}</span>
                    <span className="font-medium text-gray-800 truncate">{d.label}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded flex-shrink-0">
                    {d.iata}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* No-match hint */}
          {dropdownOpen && inputText.length >= 2 && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 px-4 py-3 text-sm text-gray-500">
              Aucune destination trouvée pour « {inputText} »
            </div>
          )}
        </div>

        {/* ── Departure date ── */}
        <div className={compact ? '' : 'lg:col-span-2'}>
          <label className={labelBase}>📅 Départ</label>
          <input
            type="date"
            value={departDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDepartDate(e.target.value)}
            className={inputBase}
            required
          />
        </div>

        {/* ── Return date ── */}
        {tripType === 'aller-retour' && (
          <div className={compact ? '' : 'lg:col-span-2'}>
            <label className={labelBase}>📅 Retour</label>
            <input
              type="date"
              value={returnDate}
              min={departDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className={inputBase}
            />
          </div>
        )}

        {/* ── Passengers ── */}
        <div className={compact ? '' : tripType === 'aller-retour' ? 'lg:col-span-1' : 'lg:col-span-3'}>
          <label className={labelBase}>👤 Passagers</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className={inputBase}
          >
            {PASSENGERS_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-end lg:col-span-1">
          <button
            type="submit"
            disabled={!selectedIata}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold
                       px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Rechercher</span>
          </button>
        </div>
      </div>

      {/* Validation hint */}
      {!selectedIata && inputText.length > 0 && (
        <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          Sélectionnez une destination dans la liste pour obtenir le bon code aéroport
        </p>
      )}
    </form>
  );
}
