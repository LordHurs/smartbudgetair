import Link from 'next/link';
import { Destination } from '@/lib/airports';

const DESTINATION_IMAGES: Record<string, string> = {
  DKR: 'https://images.unsplash.com/photo-1567596388756-f6d710c8fc07?w=400&q=80',
  ABJ: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400&q=80',
  CMN: 'https://images.unsplash.com/photo-1553243671-c73a6d71a05e?w=400&q=80',
  TUN: 'https://images.unsplash.com/photo-1568436577878-5b49cc4dc58a?w=400&q=80',
  BKO: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80',
  DLA: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400&q=80',
  LBV: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80',
  NBO: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=80',
  LOS: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80',
  ACC: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80',
};

interface DestinationCardProps {
  destination: Destination;
  originSlug?: string;
}

export default function DestinationCard({ destination, originSlug = 'paris-cdg' }: DestinationCardProps) {
  const href = `/vols/${originSlug}-${destination.slug}`;
  const img = DESTINATION_IMAGES[destination.iata] ?? 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80';

  return (
    <Link href={href} className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={destination.city}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-semibold text-brand-700 shadow">
          {destination.iata}
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-lg">{destination.flag}</span>
            <span className="text-xs font-medium opacity-90">{destination.country}</span>
          </div>
          <h3 className="text-lg font-bold drop-shadow">{destination.city}</h3>
        </div>
      </div>
      <div className="bg-white p-4">
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{destination.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">
            Comparer les vols →
          </span>
        </div>
      </div>
    </Link>
  );
}
