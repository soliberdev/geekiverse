import { Card } from "./Card";

interface Data {
    title: string;
    description: string;
    figureOne: string;
}

const cardData: Data[] = [
    {title: "Ask", description: `Order anime products like you're chatting on WhatsApp.
`, figureOne: "bg-[url('/img/Character-Chat-Empty.png')]"},
    {title: "Explore", description: "The assistant will show you what's available, with prices and descriptions.", figureOne: "bg-[url('/img/Character-Products.png')]"},
    {title: "Place your order", description: "Just say what you want, and Geekibot will log it as a real order.", figureOne: "bg-[url('/img/Character-Chat-Order-2.png')]"},
    {title: "Modify or Cancel", description: "Changed your mind? Just say so, and Geekibot will update your order.", figureOne: "bg-[url('/img/Character-Cancel.png')]"}
]

export const CardParallax = () => {
    return (
        <div>
            {cardData.map((card, index) => (
                <div id="imge-item" className="h-[55vh] lg:h-[70vh] flex items-start justify-center sticky top-60 lg:top-45 bg-brick-red-600">
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