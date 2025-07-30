export default function NoiseOverlay() {
  return (
    <div
        className="fixed inset-0 w-screen h-screen z-10 pointer-events-none opacity-5 bg-[url(/img/noise.gif)]"
        aria-hidden="true"
    ></div>
  )
}
