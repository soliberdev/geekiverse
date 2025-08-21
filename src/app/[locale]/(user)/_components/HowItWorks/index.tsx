'use client'

import { useTranslations } from "next-intl"
import { CardParallax } from "@/app/components/ui/CardParallax"

export const HowItWorks = () => {
  const t = useTranslations('HomePage');

  const cardData = [
    { title: t('HowItWorks.card1title'), description: t('HowItWorks.card1description'), figureOne: "bg-[url('/img/Character-Chat-Empty.png')]" },
    { title: t('HowItWorks.card2title'), description: t('HowItWorks.card2description'), figureOne: "bg-[url('/img/Character-Products.png')]" },
    { title: t('HowItWorks.card3title'), description: t('HowItWorks.card3description'), figureOne: "bg-[url('/img/Character-Chat-Order-2.png')]" },
    { title: t('HowItWorks.card4title'), description: t('HowItWorks.card4description'), figureOne: "bg-[url('/img/Character-Cancel.png')]" }
  ];

  return (
    <section className="relative w-full mt-20" aria-label="How it works section explaining basic steps to use the Geekibot chatbot">
        <div className="absolute -top-16 w-full h-16 bg-brick-red-600 [clip-path:polygon(0%_100%,100%_0%,100%_100%)]" aria-hidden="true"></div>
        <div className="relative pt-15 bg-brick-red-600 h-auto px-10">
          <HowItWorksTitle title={t('HowItWorks.title')} />
          <CardParallax cards={cardData} />
        </div>
        <div className="w-full h-16 bg-brick-red-600 [clip-path:polygon(0%_0%,0%_100%,100%_0%)]" aria-hidden="true"></div>
    </section>
  )
}

const HowItWorksTitle = ({ title } : { title: string }) => {
  return (
    <h2 className="font-bangers uppercase text-7xl lg:text-8xl text-background sticky top-[8%] mb-15">
      {title}
    </h2>
  )
}
