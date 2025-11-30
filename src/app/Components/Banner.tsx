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
import { BannerIncomingDTO } from "@/types/banner";
import { defaultBannerState } from "@/redux/services/helpers/bannerResponse";
import useBannerHook from "@/hooks/bannerHooks";
import { PaginationQuery } from "@/types/response";
import Spinner from "../_components/Spinner";



const Banner = () => {
  const path = usePathname();
  const isHome = path === "/";
  const isMounted = React.useRef<boolean>(false);

  const [banners, setBanners] = React.useState<BannerIncomingDTO[]>([
    defaultBannerState,
  ]);
  const { GET_ALL_BANNER, loading } = useBannerHook();
  const query: PaginationQuery = { page: 1, limit: 7 };

  React.useEffect(() => {
    if(!isHome) return;
    const isMountedFlag = isMounted.current;
    if (isMountedFlag) return;
    isMounted.current = true;

    (async () => {
     const res = await GET_ALL_BANNER(query);
      res && setBanners(res);
    })();
    return () => {
      isMounted.current = false;
    }
  }, []);

  const autoplay = React.useMemo(
    () =>
      Autoplay({
        stopOnInteraction: false,
        delay: 2000,
        stopOnMouseEnter: true,
      }),
    []
  );

  const opts: Partial<EmblaOptionsType> = {
    align: "start",
    containScroll: "trimSnaps",
  };

  if (loading) return <Spinner />;

  const validBanners =
    banners && Array.isArray(banners)
      ? banners.filter((i) => i._id && i._id.trim() !== "")
      : [];

  return (
    <>
      {/* Home page carousel */}
      <section
        className={`${
          isHome ? "block" : "hidden"
        } w-full relative mx-auto -mt-32 cursor-grab`}
      >
        <Carousel className="relative w-full" opts={opts} plugins={[autoplay]}>
          <CarouselContent className="w-full relative h-[60vh] sm:h-[60vh] md:h-[80vh] lg:h-[95vh] xl:h-screen flex gap-0 !p-0 !m-0 ">
            {validBanners.length > 0 &&
              validBanners.map((item, key) => (
                <CarouselItem
                  key={key}
                  className="w-full !p-0 !m-0 relative basis-full flex-shrink-0 flex-grow-0"
                  style={{ flex: "0 0 100%" }}
                >
                  <BannerCard {...item} isFirst={key === 0}/>
                </CarouselItem>
              ))}
          </CarouselContent>

          {/* Prev / Next buttons */}
          <CarouselPrevious
            className="hidden sm:flex sm:absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
            z-20 bg-[var(--color-first)] hover:bg-[var(--color-prdct)] 
            border border-[var(--color-border)] p-2 rounded-full shadow-lg cursor-pointer
            text-head"
          />

          <CarouselNext
            className="absolute right-2 sm:right-4 top-[90%] sm:top-1/2 -translate-y-1/2 
            z-20 bg-[var(--color-first)] hover:bg-[var(--color-prdct)] 
            border border-border p-2 rounded-full shadow-lg cursor-pointer
            text-head"
          />
        </Carousel>
      </section>

 
    </>
  );
};

export default Banner;
