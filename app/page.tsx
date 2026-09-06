import type { Metadata } from 'next';
import SearchForm from '@/components/SearchForm';
import TrustIndicators from '@/components/TrustIndicators';
import DestinationCard from '@/components/DestinationCard';
import { AFRICAN_DESTINATIONS, FRENCH_AIRPORTS } from '@/lib/airports';

export const metadata: Metadata = {
  title: 'SmartBudgetAir – Comparez les Vols pas chers France Afrique',
  description:
    'Trouvez et comparez les vols les moins chers entre la France et l\'Afrique. Partez de Paris CDG, Lyon, Marseille, Nice vers Dakar, Abidjan, Casablanca et plus encore.',
};

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '🔍',
    title: 'Saisissez votre trajet',
    desc: 'Choisissez votre aéroport de départ, votre destination et vos dates de voyage.',
    color: 'from-brand-600 to-brand-800',
  },
  {
    step: '02',
    icon: '⚡',
    title: 'Comparez les offres',
    desc: 'Notre moteur compare instantanément les prix de toutes les compagnies aériennes.',
    color: 'from-sunset-500 to-sunset-600',
  },
  {
    step: '03',
    icon: '✈️',
    title: 'Réservez au meilleur prix',
    desc: 'Cliquez sur l\'offre choisie et réservez directement auprès de la compagnie.',
    color: 'from-brand-700 to-brand-900',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-hero-gradient overflow-hidden">
        {/* Background: flight-path lines instead of a generic dot grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-50 480 C 250 380, 450 520, 700 300 S 1150 60, 1450 120" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
            <path d="M-50 180 C 200 260, 500 40, 780 180 S 1200 420, 1450 380" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
            <circle cx="700" cy="300" r="4" fill="white" />
            <circle cx="780" cy="180" r="4" fill="white" />
          </svg>
        </div>

        {/* Decorative glow */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {/* Headline */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Comparaison en temps réel · 100% Gratuit
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Volez <span className="text-sunset-300">moins cher</span><br className="hidden sm:block" />{' '}
              France <span className="text-brand-200">↔</span> Afrique
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-light">
              Comparez les vols de toutes les compagnies aériennes et trouvez le meilleur prix pour votre voyage.
            </p>
          </div>

          {/* Search card */}
          <div id="search" className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-6xl mx-auto">
            <SearchForm />
          </div>

          {/* Quick links */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { label: 'Paris → Dakar', href: '/vols/paris-cdg-dakar' },
              { label: 'Paris → Abidjan', href: '/vols/paris-cdg-abidjan' },
              { label: 'Paris → Casablanca', href: '/vols/paris-cdg-casablanca' },
              { label: 'Lyon → Dakar', href: '/vols/lyon-dakar' },
              { label: 'Marseille → Tunis', href: '/vols/marseille-tunis' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/20 transition-all duration-200"
              >
                ✈ {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust indicators ── */}
      <TrustIndicators />

      {/* ── Destinations populaires ── */}
      <section id="destinations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Nos destinations</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Destinations populaires depuis Paris
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Découvrez l'Afrique au meilleur prix. Comparez les vols et partez à l'aventure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {AFRICAN_DESTINATIONS.map((dest) => (
              <DestinationCard key={dest.iata} destination={dest} originSlug="paris-cdg" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Routes grid ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Tous les aéroports</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Volez depuis toute la France
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              10 aéroports français connectés à 14 destinations africaines. Trouvez votre vol au départ le plus proche.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FRENCH_AIRPORTS.map((airport) => (
              <div key={airport.iata} className="bg-gray-50 hover:bg-brand-50 border border-gray-100 hover:border-brand-200 rounded-2xl p-5 transition-all duration-200 group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{airport.flag}</span>
                  <div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-brand-700">{airport.city}</div>
                    <div className="text-xs text-gray-400 font-mono">{airport.iata}</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {AFRICAN_DESTINATIONS.slice(0, 4).map((dest) => (
                    <a
                      key={dest.iata}
                      href={`/vols/${airport.slug}-${dest.slug}`}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-600 transition-colors"
                    >
                      <span>→</span>
                      <span>{dest.city}</span>
                    </a>
                  ))}
                  <a
                    href={`/vols/${airport.slug}-dakar`}
                    className="text-xs font-semibold text-brand-500 hover:text-brand-700 transition-colors"
                  >
                    Voir toutes →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment-ca-marche" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Simple et rapide</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Comment ça marche ?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="text-center relative group">
                {/* Connector line (desktop) */}
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-0" />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-4xl shadow-lg mb-5 group-hover:scale-110 transition-transform duration-200`}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Étape {step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
            Prêt à décoller ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
            Comparez gratuitement des centaines de vols et partez au meilleur prix.
          </p>
          <a
            href="#search"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 text-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher un vol
          </a>
        </div>
      </section>
    </>
  );
}
