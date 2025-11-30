import Image from "next/image";

const HeroBanner = ({ heading }: { heading: string }) => {
  return (
    <section className="relative w-full mx-auto -mt-32">
      <div className="relative w-full h-[50vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src="/images/banner-001.webp"
          alt="Hero banner"
          fill
          priority={false}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/banner-7.webp"
          className="object-cover object-center opacity-85"
        />

        {/* No heavy backdrop-blur — kills performance */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-[var(--color-head)] font-semibold drop-shadow-xl px-4 text-center">
            {heading}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
