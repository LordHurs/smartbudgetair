import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import { getAllRoutes, getRouteBySlug, getSeoMeta } from '@/lib/routes';
import { AFRICAN_DESTINATIONS, FRENCH_AIRPORTS } from '@/lib/airports';
import type { Airport, Destination } from '@/lib/airports';

interface Props {
  params: { route: string };
}

export async function generateStaticParams() {
  return getAllRoutes().map((r) => ({ route: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = getRouteBySlug(params.route);
  if (!route) return { title: 'Page introuvable' };

  const seo = getSeoMeta(route);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartbudgetair.com';

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${SITE_URL}/vols/${params.route}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}/vols/${params.route}`,
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

// Generate related routes for the current page
function getRelatedRoutes(route: ReturnType<typeof getRouteBySlug>) {
  if (!route) return [];
  if (route.type === 'fr-to-africa') {
    const dest = route.destination as Destination;
    return FRENCH_AIRPORTS.filter((a) => a.iata !== route.origin.iata)
      .slice(0, 5)
      .map((a) => ({
        slug: `${a.slug}-${dest.slug}`,
        label: `${a.city} → ${dest.city}`,
      }));
  } else {
    const orig = route.origin as Destination;
    return FRENCH_AIRPORTS.filter((a) => a.iata !== route.destination.iata)
      .slice(0, 5)
      .map((a) => ({
        slug: `${orig.slug}-${a.slug}`,
        label: `${orig.city} → ${a.city}`,
      }));
  }
}

function getAlternativeDestinations(route: ReturnType<typeof getRouteBySlug>) {
  if (!route) return [];
  if (route.type === 'fr-to-africa') {
    const orig = route.origin as Airport;
    return AFRICAN_DESTINATIONS.filter((d) => d.iata !== route.destination.iata)
      .slice(0, 5)
      .map((d) => ({
        slug: `${orig.slug}-${d.slug}`,
        label: `${orig.city} → ${d.city}`,
      }));
  } else {
    const dest = route.destination as Airport;
    return AFRICAN_DESTINATIONS.filter((d) => d.iata !== route.origin.iata)
      .slice(0, 5)
      .map((d) => ({
        slug: `${d.slug}-${dest.slug}`,
        label: `${d.city} → ${dest.city}`,
      }));
  }
}

export default function VolsRoutePage({ params }: Props) {
  const route = getRouteBySlug(params.route);
  if (!route) notFound();

  const seo = getSeoMeta(route);
  const relatedRoutes = getRelatedRoutes(route);
  const altDests = getAlternativeDestinations(route);
  const isAfricaToFr = route.type === 'africa-to-fr';
  const reverseSlug = `${route.destination.slug}-${route.origin.slug}`;

  const africaCity = isAfricaToFr
    ? (route.origin as Destination).city
    : (route.destination as Destination).city;
  const africaDest = isAfricaToFr
    ? (route.origin as Destination)
    : (route.destination as Destination);
  const frAirport = isAfricaToFr
    ? (route.destination as Airport)
    : (route.origin as Airport);

  const FAQ_ITEMS = [
    {
      q: `Combien de temps dure un vol ${route.origin.city} – ${route.destination.city} ?`,
      a: isAfricaToFr
        ? `Les vols entre ${route.origin.city} et ${route.destination.city} durent en général entre 4h et 10h selon la destination et les escales. Les vols directs sont les plus rapides.`
        : `La durée d'un vol de ${route.origin.city} vers ${route.destination.city} varie selon les escales. Comptez entre 4h et 10h selon l'itinéraire choisi.`,
    },
    {
      q: `Quelle est la meilleure période pour voyager de ${route.origin.city} à ${route.destination.city} ?`,
      a: `Les prix les plus bas se trouvent généralement en basse saison. Pour l'Afrique de l'Ouest, évitez les périodes de fêtes et de vacances scolaires pour trouver les meilleurs tarifs.`,
    },
    {
      q: `Comment trouver le billet d'avion le moins cher ?`,
      a: `Utilisez SmartBudgetAir pour comparer les prix en temps réel. Réservez à l'avance (2-3 mois), soyez flexible sur les dates et activez les alertes prix pour être notifié des meilleures offres.`,
    },
    {
      q: `Y a-t-il des vols directs de ${route.origin.city} à ${route.destination.city} ?`,
      a: `Les vols directs existent sur certains axes populaires. SmartBudgetAir vous affiche toutes les options (directs et avec escale) pour vous permettre de choisir selon votre budget et votre temps.`,
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-blue-200 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>›</span>
            <Link href="/#destinations" className="hover:text-white transition-colors">Vols</Link>
            <span>›</span>
            <span className="text-white font-medium">{route.origin.city} – {route.destination.city}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{route.origin.flag}</span>
            <span className="text-2xl text-white/60">→</span>
            <span className="text-3xl">{route.destination.flag}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            {seo.h1}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mb-2">
            {africaDest.country} • Aéroport {frAirport.name} ({frAirport.iata})
          </p>

          {/* Reverse route link */}
          <Link
            href={`/vols/${reverseSlug}`}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20 transition-all duration-200 mt-4"
          >
            ↔ Voir l'itinéraire retour : {route.destination.city} → {route.origin.city}
          </Link>
        </div>
      </section>

      {/* ── Search form card ── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 -mt-6 relative z-10">
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Rechercher un vol {route.origin.city} → {route.destination.city}
            </h2>
            <SearchForm
              defaultOrigin={route.origin.iata}
              defaultDestination={route.destination.iata}
              defaultDestinationLabel={`${route.destination.city}, ${
                (route.destination as Destination).country ?? (route.origin as Destination).country
              }`}
            />
          </div>
        </div>
      </section>

      {/* ── Route description ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vols {route.origin.city} – {route.destination.city} : tout ce qu'il faut savoir
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {seo.intro}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                SmartBudgetAir compare les offres de toutes les grandes compagnies aériennes opérant sur la liaison{' '}
                <strong>{route.origin.city} – {route.destination.city}</strong> pour vous garantir le meilleur prix.
                Que vous voyagiez en famille, en couple ou seul, notre comparateur vous affiche en temps réel toutes
                les options disponibles : vols directs, vols avec escale, différentes classes tarifaires.
              </p>

              {/* Info cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '🕐', label: 'Durée vol', value: '4h – 10h selon escales' },
                  { icon: '💰', label: 'Prix moyen', value: 'À partir de 250€' },
                  { icon: '✈️', label: 'Compagnies', value: 'Air France, Air Sénégal, Turkish...' },
                ].map((info) => (
                  <div key={info.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                    <div className="text-2xl mb-2">{info.icon}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{info.label}</div>
                    <div className="text-sm font-semibold text-gray-700">{info.value}</div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <h3 className="text-xl font-bold text-gray-900 mb-5">Questions fréquentes</h3>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.q} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4">
                      <p className="font-semibold text-gray-800 text-sm">{item.q}</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Destination info */}
              <div className="bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{africaDest.flag}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{africaDest.city}</h3>
                    <p className="text-sm text-gray-500">{africaDest.country} · {africaDest.iata}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{africaDest.description}</p>
              </div>

              {/* Related routes */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  Même destination, autre aéroport
                </h3>
                <ul className="space-y-2">
                  {relatedRoutes.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/vols/${r.slug}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors group"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0 group-hover:bg-brand-600" />
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternative destinations */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" /></svg>
                  Autres destinations depuis {frAirport.city}
                </h3>
                <ul className="space-y-2">
                  {altDests.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/vols/${r.slug}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors group"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0 group-hover:bg-brand-600" />
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
