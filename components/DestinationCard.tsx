import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Destination } from '@/lib/airports';

/**
 * No stock photography by default: the previous version relied on
 * generic Unsplash images, several of which were duplicated across
 * unrelated cities (e.g. Douala/Abidjan shared one photo; Alger, Kinshasa,
 * Brazzaville and Conakry all fell back to the same unrelated default).
 * A wrong or repeated photo is worse than no photo.
 *
 * Drop a real photo in /public/destinations/<slug>.(jpg|jpeg|png|webp)
 * (slug = the `slug` field in lib/airports.ts, e.g. "alger", "dakar") and
 * it will automatically be used instead of the gradient panel below — no
 * code change needed. This check runs at build time (these pages are
 * statically generated), so it costs nothing at runtime.
 */
const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

function localPhotoFor(slug: string): string | null {
  for (const ext of PHOTO_EXTENSIONS) {
    const filePath = path.join(process.cwd(), 'public', 'destinations', `${slug}.${ext}`);
    if (fs.existsSync(filePath)) {
      return `/destinations/${slug}.${ext}`;
    }
  }
  return null;
}

const GRADIENT_VARIANTS = [
  'from-brand-700 to-brand-900',
  'from-sunset-500 to-sunset-700',
  'from-brand-600 to-sunset-600',
  'from-sunset-600 to-brand-800',
  'from-brand-800 to-brand-600',
];

function gradientFor(iata: string): string {
  const sum = iata.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return GRADIENT_VARIANTS[sum % GRADIENT_VARIANTS.length];
}

interface DestinationCardProps {
  destination: Destination;
  originSlug?: string;
}

export default function DestinationCard({ destination, originSlug = 'paris-cdg' }: DestinationCardProps) {
  const href = `/vols/${originSlug}-${destination.slug}`;
  const gradient = gradientFor(destination.iata);
  const photo = localPhotoFor(destination.slug);

  return (
    <Link href={href} className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`relative h-40 overflow-hidden ${photo ? 'bg-gray-200' : `bg-gradient-to-br ${gradient}`}`}>
        {photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={destination.city}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </>
        ) : (
          <>
            {/* Faint flight-path accent: a dashed curve with a plane, not a photo */}
            <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 300 160" fill="none" preserveAspectRatio="none">
              <path d="M-10 140 C 80 40, 180 180, 320 30" stroke="white" strokeWidth="1.5" strokeDasharray="5 6" />
            </svg>
            <div className="absolute inset-0 bg-black/10" />
          </>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-semibold text-brand-700 shadow">
          {destination.iata}
        </div>
        <div className={`absolute inset-0 flex flex-col text-white group-hover:scale-105 transition-transform duration-500 ${photo ? 'justify-end p-3 items-start' : 'items-center justify-center'}`}>
          {!photo && <span className="text-4xl drop-shadow mb-1">{destination.flag}</span>}
          {photo && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-lg">{destination.flag}</span>
              <span className="text-xs font-medium opacity-90">{destination.country}</span>
            </div>
          )}
          <h3 className="text-lg font-bold drop-shadow">{destination.city}</h3>
          {!photo && <span className="text-xs font-medium opacity-80">{destination.country}</span>}
        </div>
      </div>
      <div className="bg-white p-4">
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{destination.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-sunset-700 bg-sunset-50 px-2 py-1 rounded-lg">
            Comparer les vols →
          </span>
        </div>
      </div>
    </Link>
  );
}
