import NeuralNetworkHero from "../components/ui/neural-network-hero";

export default function NeuralDemo() {
    return (
        <div className="w-screen h-screen flex flex-col relative bg-black">
            <NeuralNetworkHero
                title="Où les algorithmes deviennent de l'art."
                description="Une page d'accueil minimale avec un canevas neural — précis, élégant et discrètement expressif. Construit avec React, Three.js et un shader CPPN personnalisé."
                badgeText="Surfaces Génératives"
                badgeLabel="Nouveau"
                ctaButtons={[
                    { text: "Commencer", href: "#get-started", primary: true },
                    { text: "Voir le showcase", href: "#showcase" }
                ]}
                microDetails={["Police ultra-légère", "Espacement serré", "Mouvement subtil"]}
            />
        </div>
    );
}
