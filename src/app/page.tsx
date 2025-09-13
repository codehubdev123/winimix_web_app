import AnimationWrapper from "@/components/animations/AnimationWrapper";
import NewBanner from "@/components/newdesign/NewBanner";
import NewBrands from "@/components/newdesign/NewBrands";
import NewCategories from "@/components/newdesign/NewCategories";
import NewProductSlider from "@/components/newdesign/NewProductSlider";
import NewStoresSlider from "@/components/newdesign/NewStoresSlider";
import BrandSlider from "@/components/sliders/BrandSlider";

const HomePage = () => {
  return (
    <>
      <NewBanner />
      <NewCategories />
      <AnimationWrapper direction="left" delay={1}>
        <NewProductSlider />
      </AnimationWrapper>
      <AnimationWrapper direction="right" delay={2}>
        <NewStoresSlider />
      </AnimationWrapper>
      <AnimationWrapper>
        <BrandSlider />
      </AnimationWrapper>
    </>
  );
};

export default HomePage;
