import { HeroButton } from "./HeroButton";
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="w-full mt-8" aria-label="Hero section introducing Geekibot">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 border-2 border-blue-200">
          <div className="flex flex-col gap-10 items-center lg:items-start">
            <HeroTitle />
            <HeroDescription />
            <HeroButton />
          </div>
          <div className="flex justify-center relative mt-12 md:mt-0 mask-b-from-75% mask-b-to-90%">
            <HeroBadge text="Quick purchase" className="top-18 left-0 md:left-42 lg:left-32" />
            <HeroBadge text="すぐに購入" className="top-38 right-0 md:right-38 lg:right-28" />
            <div className="relative w-65 md:w-75 h-auto aspect-[3/4] z-0">
              <Image
                src="/img/Chat.png"
                alt="Anime chatbot assistant Geekibot interface"
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
      </div>
    </section>
  )
}

const HeroTitle = () => { 
  return (
    <h1 className="font-bangers uppercase text-6xl lg:text-7xl lg:text-start">Buy anime products with the help of an AI, 
      <span className="text-7xl lg:text-8xl text-brick-red-500 drop-shadow-custom tracking-wider"> 
        Geekibot
      </span>
    </h1>
)};

const HeroDescription = () => (
  <p className="text-lg lg:text-xl">
    A conversational assistant that guides you through ordering, and managing your favorite anime products.
  </p>
);

const HeroBadge = ({ text, className = "" }: { text: string; className?: string }) => (
  <span 
    className={`absolute z-10 border shadow-md border-woodsmoke-500 bg-brick-red-500 px-4 py-2 rounded-md text-white ${className}`}
    aria-hidden="true"
  >
    {text}
  </span>
);

