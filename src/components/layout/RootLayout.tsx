import React from "react";

import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="w-full h-screen overflow-auto">{children}</main>
      <Footer />
    </div>
  );
}
