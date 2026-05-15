import { SiteLayout } from "../components/layout/SiteLayout";
import { Hero } from "../components/home/Hero";
import { ComingSoon } from "../components/home/ComingSoon";
// import { PromoBanners } from "../components/home/PromoBanners";
// import { FeaturedCategories } from "../components/home/FeaturedCategories";
// import { FeaturedProducts } from "../components/home/FeaturedProducts";
// import { VideoBanner } from "../components/home/VideoBanner";
// import { BlogSection } from "../components/home/BlogSection";
// import { NewsletterSection } from "../components/home/NewsletterSection";
// import { WelcomeSection } from "../components/home/WelcomeSection";
// import { InstagramSection } from "../components/home/InstagramSection";
// import { BrandStrip } from "../components/home/BrandStrip";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <ComingSoon />
      {/* <PromoBanners /> */}
      {/* <FeaturedCategories /> */}
      {/* <FeaturedProducts /> */}
      {/* <VideoBanner /> */}
      {/* <BlogSection /> */}
      {/* <NewsletterSection /> */}
      {/* <WelcomeSection /> */}
      {/* <InstagramSection /> */}
      {/* <BrandStrip /> */}
    </SiteLayout>
  );
}
