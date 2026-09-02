import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { Star } from "@/components/common/Star";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export type Testimonial = {
  quote: string;
  author: string;
};

type ReviewsCarouselProps = {
  testimonials: Testimonial[];
};

const MOBILE_BREAKPOINT = 640;

function useMatchMedia(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function ReviewsCarousel({ testimonials }: ReviewsCarouselProps) {
  const isMobile = useMatchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  const prefersReducedMotion = useMatchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const loop = !prefersReducedMotion;

  const slides = React.useMemo(() => {
    const once = testimonials.map((testimonial, index) => ({
      testimonial,
      duplicate: false,
      key: String(index),
    }));
    if (isMobile || prefersReducedMotion) return once;

    return Array.from({ length: 3 }, (_, setIndex) =>
      testimonials.map((testimonial, index) => ({
        testimonial,
        duplicate: setIndex > 0,
        key: `${setIndex}-${index}`,
      })),
    ).flat();
  }, [testimonials, isMobile, prefersReducedMotion]);

  const plugins = React.useMemo(() => {
    if (prefersReducedMotion) {
      return isMobile ? [] : [WheelGesturesPlugin()];
    }
    if (isMobile) {
      return [
        Autoplay({
          delay: 4500,
          stopOnInteraction: false,
          stopOnFocusIn: true,
          stopOnMouseEnter: true,
        }),
      ];
    }
    return [
      AutoScroll({
        speed: 0.5,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      WheelGesturesPlugin(),
    ];
  }, [isMobile, prefersReducedMotion]);

  return (
    <div className="relative left-1/2 w-dvw min-w-0 -translate-x-1/2 overflow-x-clip max-sm:px-5">
      <Carousel
        key={`${isMobile ? "mobile" : "desktop"}-${prefersReducedMotion ? "reduced" : "motion"}`}
        opts={{
          align: isMobile ? "center" : "start",
          dragFree: !isMobile,
          loop,
          watchResize: true,
          duration: 25,
        }}
        plugins={plugins}
        aria-label="Customer reviews"
        className="w-full **:data-[slot=carousel-content]:p-0.5"
      >
        <CarouselContent className="-ml-4">
          {slides.map(({ testimonial, duplicate, key }) => (
            <CarouselItem
              key={key}
              aria-hidden={duplicate}
              className={isMobile ? "basis-full pl-4" : "basis-80 pl-4"}
            >
              <Card className="h-full" tabIndex={loop ? 0 : undefined}>
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="text-label size-4" />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-base leading-relaxed">
                    “{testimonial.quote}”
                  </blockquote>
                  <p className="text-label-secondary font-medium">
                    {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
