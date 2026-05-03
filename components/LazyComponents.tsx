"use client";

import dynamic from "next/dynamic";

export const HeroSearch = dynamic(() => import("./HeroSearch"), {
  ssr: false,
});

export const FeaturedToolsCarousel = dynamic(
  () => import("./FeaturedToolsCarousel"),
  { ssr: false }
);