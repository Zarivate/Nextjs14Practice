import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

// The actual main page of the application, holds the pages for the entire application
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
