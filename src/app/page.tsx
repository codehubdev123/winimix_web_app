import AnimationWrapper from "@/components/animations/AnimationWrapper";
import NewBanner from "@/components/newdesign/NewBanner";
import NewCategories from "@/components/newdesign/NewCategories";
import NewProductSlider from "@/components/newdesign/NewProductSlider";

const HomePage = () => {
  return (
    <>
      <NewBanner />
      <NewCategories />
      <AnimationWrapper direction="left" delay={1}>
        <NewProductSlider />
      </AnimationWrapper>
    </>
  );
};

export default HomePage;
