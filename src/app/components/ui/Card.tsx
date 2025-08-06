export const Card = ({cardTitle, cardText, cardImageOneClass, isEven}: {cardTitle: string; cardText: string; cardImageOneClass: string; isEven: boolean;}) => {

    const titleColor = isEven ? 'text-brick-red-500' : 'text-[#e7e7e7]';
    const textColor = isEven ? 'text-mine-shaft-400' : 'text-[#e7e7e7]';
    const background = isEven ? 'bg-[#e7e7e7]' : 'bg-black';
    const border = isEven ? 'border-black' : 'border-[#e7e7e7]';
  
    return(
        <div className={`h-90 w-2xl text-lg lg:text-xl grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr_2fr] gap-2 ${textColor}`}>
            <div className={`row-span-3 border-2 ${border} ${cardImageOneClass} bg-cover`}></div>
            <h3 className={`font-bangers text-4xl lg:text-6xl uppercase p-3 border-2 ${border} ${background} ${titleColor}`}>{cardTitle}</h3>
            <p className={`p-3 border-2 ${border} ${background} ${titleColor}`}>{cardText}</p>
            <div className={`border-2 ${border} ${cardImageOneClass}`}></div>
        </div>
    )
}
