import { Card } from "./Card";

interface Data {
    title: string;
    description: string;
    figureOne: string;
}

export const CardParallax = ({ cards }: { cards: Data[] }) => {
    return (
        <div>
            {cards.map((card, index) => (
                <div
                    key={`${card.title}-${index}`} 
                    className="h-[55vh] lg:h-[70vh] flex items-start justify-center sticky top-60 lg:top-45 bg-brick-red-600"
                >
                    <Card
                        key={card.title}
                        cardTitle={card.title}
                        cardText={card.description}
                        cardImageOneClass={card.figureOne}
                        isEven={index % 2 === 0}
                    />
                </div>
            ))}
        </div>
  )
}