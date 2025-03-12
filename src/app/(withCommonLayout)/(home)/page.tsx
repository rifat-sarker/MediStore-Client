import Banner from "@/components/modules/home/Banner";
import "@/app/globals.css";
import NavbarMenu from "@/components/modules/home/NavigationMenu";
import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/Featured";
import CustomerReviews from "@/components/modules/home/Reviews";
import BrandingSection from "@/components/modules/home/Branding";

const HomePage = () => {
  return (
    <div>
      <NavbarMenu />
      <Banner />
      <Category />
      <BrandingSection />
      <FeaturedProducts />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
