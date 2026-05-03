import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">✈️</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Page introuvable</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
