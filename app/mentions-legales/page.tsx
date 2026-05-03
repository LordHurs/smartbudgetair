import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | SmartBudgetAir',
  description: 'Mentions légales et informations sur SmartBudgetAir, comparateur de vols France-Afrique.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Éditeur du site</h2>
          <p className="text-gray-600">SmartBudgetAir est un comparateur de vols en ligne. Ce site est édité par son propriétaire et exploité en tant que service d'affiliation Travelpayouts.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Activité d'affiliation</h2>
          <p className="text-gray-600">SmartBudgetAir est un comparateur de vols partenaire de Travelpayouts et Aviasales. Lorsque vous cliquez sur un lien de recherche, vous êtes redirigé vers notre partenaire Aviasales. SmartBudgetAir peut percevoir une commission d'affiliation en cas de réservation effectuée via ces liens. Cela n'implique aucun surcoût pour vous.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Propriété intellectuelle</h2>
          <p className="text-gray-600">L'ensemble des éléments constituant le site SmartBudgetAir (textes, images, logo, structure) sont protégés par le droit de la propriété intellectuelle.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Limitation de responsabilité</h2>
          <p className="text-gray-600">SmartBudgetAir agit en tant que comparateur et ne vend pas directement de billets d'avion. Les prix affichés sont indicatifs et peuvent varier. La réservation et le paiement s'effectuent exclusivement sur les sites partenaires.</p>
        </section>
      </div>
    </div>
  );
}
