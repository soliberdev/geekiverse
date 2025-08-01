'use client'

import { motion } from "motion/react";
import Image from "next/image";

interface Logo {
    name: string;
    image: string;
}

const Logos: Logo[] = [
    {name: "One Piece", image: "/img/OnePiece.png"},
    {name: "Solo Leveling", image: "/img/SoloLeveling.png"},
    {name: "Pokemon", image: "/img/Pokemon.png"},
    {name: "Demon Slayer", image: "/img/DemonSlayer.png"},
    {name: "Dragon Ball Z", image: "/img/DragonBall.png"},
    {name: "DanDaDan", image: "/img/Dandadan.png"}
];

export const LogoCarousel = () => {
  return (
    <section className="mt-22 overflow-x-clip border border-blue-800">
        <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
            <motion.div 
                animate={{
                    x: "-50%",
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className='flex flex-none gap-24 pr-24'
            >
                {[...Logos, ...Logos].map((logo, index) => (
                    <Image
                        key={logo.name + index}
                        src={logo.image}
                        alt={logo.name}
                        width={150}
                        height={80}
                        className="object-contain w-auto h-18 lg:h-22"
                    />
                ))}
            </motion.div>
        </div>
    </section>
  )
}
