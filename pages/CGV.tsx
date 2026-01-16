import React from 'react';

const CGV: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-2">CONDITIONS GÉNÉRALES DE VENTE</h1>
        <p className="text-xl text-primary mb-4">Aura Académie</p>
        <p className="text-sm text-gray-400 mb-12">Dernière mise à jour : 10.12.2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. IDENTITÉ DU VENDEUR</h2>
            <p className="mb-2">Le présent site est édité par :</p>
            <p className="mb-1">Aura Académie</p>
            <p className="mb-1">PORCHIER-CIZAIRE Noé - SIMARD Baptiste - ABDOUL Imrane</p>
            <p className="mb-1">Entrepreneurs Individuels</p>
            <p className="mb-1">939 228 284 - 928840354 - 999665243</p>
            <p>contact@aura-academie.com</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. OBJET</h2>
            <p className="mb-2">
              Les présentes Conditions Générales de Vente (CGV) régissent la vente de programmes de formation en ligne,
              d'accès à des plateformes pédagogiques, de contenus numériques et de services associés proposés par
              Aura Académie à des consommateurs (B2C).
            </p>
            <p>Toute commande implique l'acceptation sans réserve des présentes CGV.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. OFFRES ET CONTENU DES PRESTATIONS</h2>
            <p className="mb-2">Aura Académie propose plusieurs offres</p>
            <p className="mb-2">Chaque offre fait l'objet :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>d'une description détaillée sur le site aura-academie.com</li>
              <li>précisant le contenu, les objectifs, les modalités d'accès, la durée et le prix</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. CONDITIONS D'ACCÈS</h2>
            <p className="mb-2">L'accès aux formations est :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>personnel</li>
              <li>non transférable</li>
              <li>strictement réservé à l'acheteur</li>
            </ul>
            <p className="mt-4">Les identifiants fournis sont confidentiels.</p>
            <p>
              Toute utilisation abusive (partage de compte, diffusion des contenus) pourra entraîner une suspension
              immédiate, sans remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. DURÉE D'ACCÈS</h2>
            <p className="mb-2">Sauf mention contraire sur la page de vente :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>l'accès est accordé pour la durée indiquée lors de l'achat</li>
              <li>ou pour une durée illimitée, tant que la plateforme existe</li>
            </ul>
            <p className="mt-4">
              Aura Académie se réserve le droit de faire évoluer les contenus (mise à jour, amélioration, restructuration).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. ÉVOLUTIONS DES CONTENUS</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Les mises à jour mineures sont incluses</li>
              <li>
                Les nouveaux programmes ou modules majeurs peuvent faire l'objet d'une offre distincte,
                sauf mention contraire
              </li>
              <li>Aucun droit acquis n'est garanti sur les contenus futurs non explicitement inclus.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. PRIX ET PAIEMENT</h2>
            <p className="mb-2">Les prix sont indiqués en euros (€), toutes taxes comprises (TTC).</p>
            <p className="mb-2">Le paiement est exigible immédiatement lors de la commande :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>carte bancaire</li>
              <li>ou tout autre moyen proposé sur la plateforme</li>
            </ul>
            <p className="mt-4">La validation du paiement vaut acceptation définitive du contrat.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. DROIT DE RÉTRACTATION</h2>
            <p className="mb-2">Conformément à l'article L221-28 du Code de la consommation :</p>
            <p className="mb-4 italic">
              Le droit de rétractation ne s'applique pas aux contenus numériques fournis immédiatement après paiement
              et dont l'exécution a commencé avec l'accord du consommateur.
            </p>
            <p className="mb-2">En validant sa commande, le client :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>reconnaît accéder immédiatement aux contenus</li>
              <li>renonce expressément à son droit de rétractation</li>
            </ul>
            <p className="mt-4">Aucun remboursement ne pourra être exigé après accès effectif à la plateforme.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. ABSENCE DE GARANTIE DE RÉSULTATS</h2>
            <p className="mb-2">Aura Académie est tenue à une obligation de moyens, et non de résultats.</p>
            <p className="mb-2">Les formations fournissent :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>des méthodes</li>
              <li>des outils</li>
              <li>des cadres de travail</li>
            </ul>
            <p className="mt-4">La réussite dépend de l'implication personnelle du client.</p>
            <p>Aucun résultat financier, professionnel ou commercial n'est garanti.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. RESPONSABILITÉ</h2>
            <p className="mb-2">Aura Académie ne saurait être tenue responsable :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>des décisions prises par le client</li>
              <li>de l'usage fait des contenus</li>
              <li>des résultats obtenus ou non</li>
            </ul>
            <p className="mt-4">La responsabilité est strictement limitée au montant payé par le client.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. PROPRIÉTÉ INTELLECTUELLE</h2>
            <p className="mb-2">
              L'ensemble des contenus (vidéos, textes, supports, frameworks, méthodes) est protégé par le droit de
              la propriété intellectuelle.
            </p>
            <p>Toute reproduction, diffusion ou exploitation non autorisée est interdite.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. DONNÉES PERSONNELLES</h2>
            <p className="mb-2">Les données collectées sont nécessaires à la gestion des commandes et des accès.</p>
            <p>
              Le client dispose d'un droit d'accès, de rectification et de suppression conformément au RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. RÉSILIATION</h2>
            <p className="mb-2">
              Aura Académie se réserve le droit de résilier l'accès, sans remboursement, en cas de :
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>non-respect des CGV</li>
              <li>fraude</li>
              <li>partage des accès</li>
              <li>comportement nuisible à la communauté</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. DROIT APPLICABLE – LITIGES</h2>
            <p className="mb-2">Les présentes CGV sont régies par le droit français.</p>
            <p className="mb-2">En cas de litige :</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>une solution amiable sera recherchée</li>
              <li>à défaut, les tribunaux compétents seront ceux du ressort du domicile du consommateur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. ACCEPTATION</h2>
            <p>
              Le client reconnaît avoir pris connaissance des CGV et les accepter sans réserve avant toute commande.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CGV;
