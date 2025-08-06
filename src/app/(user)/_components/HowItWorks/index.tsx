import { CardParallax } from "@/app/components/ui/CardParallax"

export const HowItWorks = () => {
  return (
    <section className="relative w-full mt-20" aria-label="How it works section explaining basic steps to use the Geekibot chatbot">
        <div className="absolute -top-16 w-full h-16 bg-brick-red-600 [clip-path:polygon(0%_100%,100%_0%,100%_100%)]" aria-hidden="true"></div>
        <div className="relative pt-15 bg-brick-red-600 h-auto px-10">
          <HowItWorksTitle />
          <CardParallax />
        </div>
        <div className="w-full h-16 bg-brick-red-600 [clip-path:polygon(0%_0%,0%_100%,100%_0%)]" aria-hidden="true"></div>
    </section>
  )
}

const HowItWorksTitle = () => {
  return (
    <h2 className="font-bangers uppercase text-7xl lg:text-8xl text-background sticky top-5 mb-15">
      How it works
    </h2>
  )
}
