"use client";
import { SideBarPass, navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

// The component that handles the sidebar and all it's navigations
const Sidebar = ({ isOpen, toggle }: SideBarPass) => {
  // Grab the current path/url of the page
  const pathname = usePathname();

  return (
    <aside
      className={`hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex ${
        isOpen ? "bg-blue-700 inset-y-0 right-1" : "opacity-0 inset-y-0 left-0"
      }`}
    >
      {/* <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={toggle}
      >
        {" "}
        Test me
      </button> */}
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="sidebar-nav">
          {/* Using SignedIn allows the data to only be accessible to those signed in */}
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;

                // Return the list of links and their details by mapping over them, adjusting their styles
                // ever so slightly if the user is on the same page as the link
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
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
  );
};

export default Sidebar;
