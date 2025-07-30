export default function NoiseOverlay() {
  return (
    <svg 
        id="noise-overlay" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="none" 
        className="fixed inset-0 w-screen h-screen z-1 pointer-events-none opacity-40"
        aria-hidden="true"
        focusable="false"
    >
        <filter id="noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="1.74" numOctaves="4" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.46"></feFuncR>
                <feFuncG type="linear" slope="0.46"></feFuncG>
                <feFuncB type="linear" slope="0.46"></feFuncB>
                <feFuncA type="linear" slope="0.56"></feFuncA>
            </feComponentTransfer>
            <feComponentTransfer>
                <feFuncR type="linear" slope="1.47" intercept="-0.23"/>
                <feFuncG type="linear" slope="1.47" intercept="-0.23"/>
                <feFuncB type="linear" slope="1.47" intercept="-0.23"/>
            </feComponentTransfer>
        </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)" />
    </svg>
  )
}
