import { FRENCH_AIRPORTS, AFRICAN_DESTINATIONS, Airport, Destination } from './airports';

export interface Route {
  slug: string;           // e.g. paris-cdg-dakar
  origin: Airport | Destination;
  destination: Airport | Destination;
  type: 'fr-to-africa' | 'africa-to-fr';
}

export interface SeoMeta {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export function getAllRoutes(): Route[] {
  const routes: Route[] = [];

  // France → Africa
  for (const origin of FRENCH_AIRPORTS) {
    for (const dest of AFRICAN_DESTINATIONS) {
      routes.push({
        slug: `${origin.slug}-${dest.slug}`,
        origin,
        destination: dest,
        type: 'fr-to-africa',
      });
    }
  }

  // Africa → France
  for (const origin of AFRICAN_DESTINATIONS) {
    for (const dest of FRENCH_AIRPORTS) {
      routes.push({
        slug: `${origin.slug}-${dest.slug}`,
        origin,
        destination: dest,
        type: 'africa-to-fr',
      });
    }
  }

  return routes;
}

export function getRouteBySlug(slug: string): Route | undefined {
  return getAllRoutes().find((r) => r.slug === slug);
}

export function getSeoMeta(route: Route): SeoMeta {
  const orig = route.origin;
  const dest = route.destination;

  const origCity = orig.city;
  const destCity = dest.city;
  const destCountry = (dest as Destination).country ?? (orig as Destination).country ?? '';

  if (route.type === 'fr-to-africa') {
    const d = dest as Destination;
    return {
      title: `Vols ${origCity} → ${destCity} pas chers | SmartBudgetAir`,
      description: `Trouvez les meilleurs vols pas chers de ${origCity} (${orig.iata}) vers ${destCity} (${dest.iata}), ${d.country}. Comparez les prix en temps réel et réservez au meilleur tarif avec SmartBudgetAir.`,
      h1: `Vols pas chers ${origCity} – ${destCity}`,
      intro: `Partez de ${origCity} vers ${destCity}, au ${d.country}. ${d.description} Comparez toutes les compagnies aériennes et trouvez le billet d'avion le moins cher pour votre voyage.`,
    };
  } else {
    const o = orig as Destination;
    return {
      title: `Vols ${origCity} → ${destCity} pas chers | SmartBudgetAir`,
      description: `Comparez les vols pas chers de ${origCity} (${orig.iata}), ${o.country} vers ${destCity} (${dest.iata}), France. Meilleurs prix garantis sur SmartBudgetAir.`,
      h1: `Vols pas chers ${origCity} – ${destCity}`,
      intro: `Retour au bercail ou découverte de la France ? Trouvez les meilleurs vols de ${origCity} (${o.country}) vers ${destCity}. Comparez toutes les compagnies et économisez sur votre billet d'avion.`,
    };
  }
}
