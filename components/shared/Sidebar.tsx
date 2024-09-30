"use client";
import { SideBarPass, navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./Theme";

// The component that handles the sidebar and all it's navigations
const Sidebar = ({ isOpen, toggle }: SideBarPass) => {
  // Grab the current path/url of the page
  const pathname = usePathname();

  return (
    <>
      <nav className="flex justify-between p-5 items-center absolute h-25 w-64 top-0 start-0">
        <Image
          src="/assets/icons/menu.svg"
          alt="hamburger_menu"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={toggle}
        />

        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/VoidBoard-logo.svg"
            alt="logo"
            width={350}
            height={45}
            className="px-2"
          />
        </Link>
        <ModeToggle />
      </nav>
      <aside
        className={`mt-25px hidden h-screen w-72 p-5 shadow-md shadow-purple-200/50 lg:flex pl-2 ${
          isOpen ? "left-auto" : "absolute -left-full -top-full"
        }`}
      >
        <div className="flex size-full flex-col pt-12">
          <nav className="sidebar-nav">
            {/* Using SignedIn allows the data to only be accessible to those signed in */}
            <SignedIn>
              <ul className="sidebar-nav_elements pt-3">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  // Return the list of links and their details by mapping over them, adjusting their styles
                  // ever so slightly if the user is on the same page as the link
                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white"
                          : "text-gray-500"
                      }`}
                    >
                      <Link href={link.route} className="sidebar-link">
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="sidebar-nav_elements">
                <li className="flex-center cursor-pointer gap-2 p-4">
                  <UserButton afterSignOutUrl="/" showName />
                </li>
              </ul>
            </SignedIn>
            {/* Same idea but now what the user will see once they log out/haven't signed up yet */}
            <SignedOut>
              <Button asChild className="button bg-purple-gradient bg-cover">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
