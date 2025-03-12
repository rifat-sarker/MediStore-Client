import Banner from "@/components/modules/home/Banner";
import "@/app/globals.css";
import NavbarMenu from "@/components/modules/home/NavigationMenu";
import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/Featured";

const HomePage = () => {
  return (
    <div>
      <NavbarMenu />
      <Banner />
      <Category />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
