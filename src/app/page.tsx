import AnimationWrapper from "@/components/animations/AnimationWrapper";
import Features from "@/components/features/Features";
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
    </>
  );
}
