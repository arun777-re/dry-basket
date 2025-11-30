
import Image from 'next/image'

const HeroBanner = ({heading}:{heading:string}) => {
  return (
      <section
        className= 'w-full relative mx-auto -mt-32'
      >
        <div className="relative w-full h-[50vh] sm:h-[50vh] md:h-[55vh] lg:h-[70vh]">
          <div className="relative w-full h-full bg-black/20">
            <Image
              src="/images/banner-001.webp"
              alt="banner-image"
              fill
              priority={false}
              sizes='100vw'
              className="object-center object-cover opacity-80"
            />
          </div>

          <article className="absolute inset-0 flex items-center justify-center z-40 bg-[var(--color-black)]/50 backdrop-blur-sm">
            <div className="w-full text-center px-4 top-[28%] relative">
              <h2 className="text-[var(--color-head)] drop-shadow-lg">
                {heading}
              </h2>
            </div>
          </article>
        </div>
      </section>
  )
}

export default HeroBanner