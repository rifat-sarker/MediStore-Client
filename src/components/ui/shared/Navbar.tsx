"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import { Button } from "../button";
import {
  Heart,
  LayoutDashboard,
  LogIn,
  LogInIcon,
  LogOut,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 

import { Drawer } from "vaul";

const Navbar = () => {
  let user = true;
  return (
    <header className="container flex gap-4 justify-between items-center mx-auto">
      <h2>
        <Link href="/">
          <Image
            className="rounded-full"
            src={logo}
            height={100}
            width={100}
            alt="logo"
          />
        </Link>
      </h2>
      <div className="relative w-full max-w-md">
        <input
          className="w-full  border p-2 pr-16 rounded-lg focus:outline-none"
          type="search"
          placeholder="Search medicine by name"
        />
        <Button className="absolute right-0 top-1/2 -translate-y-1/2 px-5">
          <Search />
        </Button>
      </div>

      <nav className="flex gap-3">
        <Link href="/">
          <Button  className="rounded-full size-10">
            <Heart />
          </Button>
        </Link>
        <Link href="/">
          <Button  className="rounded-full text-white size-10">
            <ShoppingCart />
          </Button>
        </Link>
        {user ? (
          <Link href="/">
            <Drawer.Root direction="right">
              <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white  text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
                {" "}
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content
                  className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
                  // The gap between the edge of the screen and the drawer is 8px in this case.
                  style={
                    {
                      "--initial-transform": "calc(100% + 8px)",
                    } as React.CSSProperties
                  }
                >
                  <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                    <Drawer.Title className="max-w-md mx-auto space-y-2">
                      <Image
                        className="rounded-full mx-auto"
                        src="https://github.com/shadcn.png"
                        width={100}
                        height={100}
                        alt="profile photo"
                      ></Image>
                      <Drawer.Description className="font-bold text-center">rifatswd@gmail.com</Drawer.Description>
                      <Button className="mx-auto w-full">
                        <LayoutDashboard />
                        Dashboard{" "}
                      </Button>
                      <Button className="mx-auto w-full">
                        <LogOut />
                       Logout
                      </Button>
                    </Drawer.Title>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </Link>
        ) : (
          <Link href="/login">
            <Button>
              Login
              <LogIn />{" "}
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
