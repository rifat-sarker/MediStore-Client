import Banner from "@/components/modules/home/Banner";
import "@/app/globals.css";
import NavbarMenu from "@/components/modules/home/NavigationMenu";
import Category from "@/components/modules/home/Category";

const HomePage = () => {
  return (
    <div>
      <NavbarMenu />
      <Banner />
      <Category/>
    </div>
  );
};

export default HomePage;
