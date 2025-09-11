import AnimationWrapper from "@/components/animations/AnimationWrapper";
import OfferBanner from "@/components/banners/OfferBanner";
import Features from "@/components/features/Features";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import BrandSlider from "@/components/sliders/BrandSlider";
import CategorySlider from "@/components/sliders/CategorySlider";
import HomeSlider from "@/components/sliders/HomeSlider";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HomeSlider />
      <Features />
      <AnimationWrapper direction="right" delay={2}>
        <CategorySlider />
      </AnimationWrapper>
      <AnimationWrapper direction="left" delay={1}>
        <BrandSlider />
      </AnimationWrapper>
      <AnimationWrapper direction="up" delay={3}>
        <OfferBanner />
      </AnimationWrapper>
      <AnimationWrapper direction="down" delay={4}>
        <FeaturedProducts />
      </AnimationWrapper>
    </>
  );
}
