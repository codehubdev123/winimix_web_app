import AnimationWrapper from "@/components/animations/AnimationWrapper";
import CategorySlider from "@/components/categories/CategorySlider";
import Features from "@/components/features/Features";
import Slider from "@/components/sliders/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Slider />
      <Features />
      <AnimationWrapper direction="right" delay={2}>
        <CategorySlider />
      </AnimationWrapper>
    </>
  );
}
