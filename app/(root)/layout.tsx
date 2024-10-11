"use client";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

// The actual "main" page of the application, holds the pages for the entire application
const Layout = ({ children }: { children: React.ReactNode }) => {
  // State to handle whether to showcase the sidebar or not, since it'll appear throughout
  // the entire application it's declared and passed to the component here.
  const [isOpen, setIsOpen] = useState(true);

  // Function to toggle sidebar
  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <main className="root">
      <Sidebar isOpen={isOpen} toggle={toggle} />

      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>

        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
