import {
  NavigationMenu as ShadNavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { getAllCategories } from "@/services/Category";
import { getAllTypes } from "@/services/Type";

import { ICategory } from "@/types/category";
import { IType } from "@/types/type";
import Link from "next/link";

const NavbarMenu = async () => {
  const { data: categories } = await getAllCategories();
  const { data: types } = await getAllTypes();

  // console.log(types);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      className="bg-primary w-full "
    >
      <ShadNavigationMenu className="">
        <NavigationMenuList className="flex flex-wrap">
          {categories?.map((category: ICategory) => (
            <NavigationMenuItem key={category._id}>
              <NavigationMenuTrigger
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                className="text-white bg-primary"
              >
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="text-black">
                <ul className="grid w-[400px] gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {types
                    .filter((type: IType) => type.category === category._id)
                    .map((type: IType) => (
                      <li key={type._id} className="p-2">
                        <Link
                          href={`/medicines/${type._id}`}
                          className="block p-2 text-sm"
                        >
                          {type.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </ShadNavigationMenu>
    </div>
  );
};

export default NavbarMenu;
