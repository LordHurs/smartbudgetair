import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | SmartBudgetAir',
  description: 'Politique de confidentialité et protection des données de SmartBudgetAir.',
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Données collectées</h2>
          <p className="text-gray-600">SmartBudgetAir ne collecte aucune donnée personnelle lors de votre utilisation du comparateur. Votre recherche est traitée localement et transmise à nos partenaires uniquement lors du clic sur le bouton de recherche.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Cookies</h2>
          <p className="text-gray-600">Ce site peut utiliser des cookies techniques nécessaires au bon fonctionnement du service. Des cookies d'analyse anonymes peuvent être utilisés pour améliorer nos services.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Partenaires</h2>
          <p className="text-gray-600">Lorsque vous êtes redirigé vers nos partenaires (Aviasales, Travelpayouts), leur propre politique de confidentialité s'applique. Nous vous invitons à la consulter avant toute réservation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Vos droits</h2>
          <p className="text-gray-600">Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous via notre formulaire de contact.</p>
        </section>
      </div>
    </div>
  );
}
