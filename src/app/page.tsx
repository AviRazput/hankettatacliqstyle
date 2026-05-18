import { SiteLayout } from "../components/layout/SiteLayout";
import { Hero } from "../components/home/Hero";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { TrendingNowSection } from "../components/home/TrendingNowSection";
import { NewArrivalsSection } from "../components/home/NewArrivalsSection";
import { FeaturedBrandsSection } from "../components/home/FeaturedBrandsSection";
import { CreatorMarketplaceSection } from "../components/home/CreatorMarketplaceSection";
import { BestsellersSection } from "../components/home/BestsellersSection";
// import { WhyHanketSection } from "../components/home/WhyHanketSection";
import { InstagramSection } from "../components/home/InstagramSection";
import { NewsletterSection } from "../components/home/NewsletterSection";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <CategoriesSection />
      <TrendingNowSection />
      <NewArrivalsSection />
      <FeaturedBrandsSection />
      <CreatorMarketplaceSection />
      <BestsellersSection />
      {/* <WhyHanketSection /> */}
      <InstagramSection />
      <NewsletterSection />
    </SiteLayout>
  );
}
