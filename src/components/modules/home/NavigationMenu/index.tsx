import {
  NavigationMenu as ShadNavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types/category";
import Link from "next/link";

const NavbarMenu = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      className="bg-primary w-full "
    >
      <ShadNavigationMenu className="">
        <NavigationMenuList className="flex flex-wrap gap-4 p-2">
          {categories?.map((category: ICategory) => (
            <NavigationMenuItem key={category.id}>
              <Link href={`/shop?category=${category.id}`} className="text-white hover:text-gray-200">
                {category.name}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </ShadNavigationMenu>
    </div>
  );
};

export default NavbarMenu;

