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

const NavbarMenu = async () => {
  const { data: categories } = await getAllCategories();
  const { data: types } = await getAllTypes();
  // console.log(categories);
console.log(types);
  return (
    <ShadNavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {categories.map((category: ICategory) => (
            <NavigationMenuTrigger key={category._id}>
              {category.name}
            </NavigationMenuTrigger>
          ))}
          <NavigationMenuContent>
            {types.map((type: IType) => (
              <NavigationMenuLink key={type._id}>
                {type.name}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </ShadNavigationMenu>
  );
};

export default NavbarMenu;
