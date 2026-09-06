import Link from 'next/link';
import { FRENCH_AIRPORTS, AFRICAN_DESTINATIONS } from '@/lib/airports';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                SmartBudget<span className="text-sunset-400">Air</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Votre comparateur de vols pas chers entre la France et l'Afrique. Trouvez le meilleur prix en quelques clics.
            </p>
            <div className="mt-4 flex gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-brand-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-brand-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
            </div>
          </div>

          {/* Aéroports FR */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Aéroports France</h3>
            <ul className="space-y-2">
              {FRENCH_AIRPORTS.slice(0, 6).map((a) => (
                <li key={a.iata}>
                  <Link href={`/#search`} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {a.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Afrique */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Destinations Afrique</h3>
            <ul className="space-y-2">
              {AFRICAN_DESTINATIONS.slice(0, 6).map((d) => (
                <li key={d.iata}>
                  <Link href={`/vols/paris-cdg-${d.slug}`} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {d.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Informations</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Accueil</Link></li>
              <li><Link href="/#comment-ca-marche" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Comment ça marche</Link></li>
              <li><Link href="/#destinations" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Toutes les destinations</Link></li>
              <li><Link href="/mentions-legales" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {year} SmartBudgetAir. Tous droits réservés. Partenaire affilié Travelpayouts / Aviasales.
          </p>
          <p className="text-xs text-gray-600 text-center sm:text-right max-w-md">
            Les prix affichés sont indicatifs. SmartBudgetAir est un comparateur et vous redirige vers nos partenaires pour la réservation.
          </p>
        </div>
      </div>
    </footer>
  );
}
