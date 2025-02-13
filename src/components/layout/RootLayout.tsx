import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { useLocation, useNavigate } from "react-router-dom";

const HIDE_LAYOUT_PATHS = ["/main/home"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const shouldHideLayout = HIDE_LAYOUT_PATHS.includes(currentPath);

  return (
    <div>
      {!shouldHideLayout && <Header />}
      <main className="w-full h-screen overflow-auto">{children}</main>
      <Footer />
    </div>
  );
}
