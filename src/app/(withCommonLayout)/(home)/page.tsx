import Banner from "@/components/modules/home/Banner";
import "@/app/globals.css";
import NavbarMenu from "@/components/modules/home/NavigationMenu";

const HomePage = () => {
  return (
    <div>
      <NavbarMenu />
      <Banner />
    </div>
  );
};

export default HomePage;
