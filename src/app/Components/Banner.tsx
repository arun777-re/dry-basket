"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import BannerCard from "../_components/card/BannerCard";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BannerIncomingDTO } from "@/types/banner";
import { defaultBannerState } from "@/redux/services/helpers/bannerResponse";
import useBannerHook from "@/hooks/bannerHooks";
import { PaginationQuery } from "@/types/response";
import Spinner from "../_components/Spinner";

interface BannerProps {
  heading?: string;
}

const Banner: React.FC<BannerProps> = ({ heading }) => {
  // get pathname
  const path = usePathname();
  const isHome = path === "/";

  const [banners, setBanners] = React.useState<BannerIncomingDTO[]>([
    defaultBannerState,
  ]);
  const { GET_ALL_BANNER, loading } = useBannerHook();
  const query: PaginationQuery = {
    page: 1,
    limit: 7,
  };

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      await GET_ALL_BANNER(query).then((res) => {
        res && setBanners(res);
      });
    })();
    return () => {
      isMounted = false;
    };
  }, [GET_ALL_BANNER]);
  // autoplay configuration of banner
  const autoplay = React.useMemo(
    () =>
      Autoplay({
        stopOnInteraction: false,
        delay: 2000,
        stopOnMouseEnter: true,
      }),
    []
  );

  // options for carousel
  const opts: Partial<EmblaOptionsType> = {
    align: "start" as const,
    containScroll: "trimSnaps" as const,
  };

  if (loading) {
    return <Spinner />;
  }

  const validBanners = banners && Array.isArray(banners) ? banners.filter((i) => i._id && i._id.trim() !== "") : [];
  return (
    <>
      {/* Home page carousel */}
      <section
        className={`${
          isHome ? "block" : "hidden"
        } w-full relative mx-auto -mt-24 cursor-grab`}
      >
        <Carousel className="relative w-full" opts={opts} plugins={[autoplay]}>
          <CarouselContent className="w-full relative h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[95vh] xl:h-screen flex gap-0 !p-0 !m-0">
            {validBanners.length > 0 && validBanners.map((item, key) => (
              <CarouselItem
                key={key}
                className="w-full !p-0 !m-0 relative basis-full flex-shrink-0 flex-grow-0"
                style={{ flex: "0 0 100%" }}
              >
                <BannerCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Prev / Next buttons */}
          <CarouselPrevious className="hidden sm:flex sm:absolute border-none left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md cursor-pointer" />
          <CarouselNext
            className="absolute right-2 sm:right-4 top-[90%] sm:top-1/2 -translate-y-1/2 z-20 bg-white p-2
           rounded-sm border-none sm:rounded-full shadow-md cursor-pointer"
          />
        </Carousel>
      </section>

      {/* Non-home hero banner */}
      <section
        className={`${
          path === "/" ? "hidden" : "block"
        } w-full relative mx-auto -mt-24`}
      >
        <div className="relative w-full h-[50vh] sm:h-[50vh] md:h-[55vh] lg:h-[70vh]">
          <div className="relative w-full h-full bg-black/30">
            <Image
              src="/images/banner-6.jpg"
              alt="banner-image"
              fill
              priority
              className="object-center object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
          </div>
          <article className="absolute inset-0 flex items-center justify-center z-40 bg-black/20">
            <div className="w-full text-center px-4 top-[28%] relative">
              <h3 className="text-white ">
                {heading}
              </h3>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Banner;
