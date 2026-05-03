import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartbudgetair.fr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SmartBudgetAir – Vols pas chers France Afrique',
    template: '%s | SmartBudgetAir',
  },
  description:
    'Comparez et réservez les vols pas chers entre la France et l\'Afrique. Trouvez les meilleures offres sur tous les aéroports français vers Dakar, Abidjan, Casablanca, Nairobi et bien plus.',
  keywords: [
    'vols pas chers', 'comparateur de vols', 'vols France Afrique',
    'billet avion pas cher', 'vol Afrique', 'comparaison vol',
  ],
  authors: [{ name: 'SmartBudgetAir' }],
  creator: 'SmartBudgetAir',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'SmartBudgetAir',
    title: 'SmartBudgetAir – Vols pas chers France Afrique',
    description: 'Comparez et réservez les vols pas chers entre la France et l\'Afrique.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartBudgetAir – Vols pas chers France Afrique',
    description: 'Comparez et réservez les vols pas chers entre la France et l\'Afrique.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
