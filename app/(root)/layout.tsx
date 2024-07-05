"use client";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import LoadingPostsSkeleton from "@/components/shared/LoadingPostsSkeleton";

// The actual main page of the application, holds the pages for the entire application
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <main className="root">
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <MobileNav />
      <div className="root-container">
        <Suspense fallback={<LoadingPostsSkeleton />}>
          <div className="wrapper">{children}</div>
        </Suspense>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
