import React, { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HIDE_LAYOUT_PATHS = ["/main/home"];
const HIDE_LAYOUT_REGEX = /^\/main\/home\/[^/]+\/rooms\/[^/]+$/;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [queryClient] = useState(() => new QueryClient());

  const currentPath = location.pathname;
  const shouldHideLayout = HIDE_LAYOUT_PATHS.includes(currentPath) || HIDE_LAYOUT_REGEX.test(currentPath);
  // const shouldHideLayout = HIDE_LAYOUT_REGEX.test(currentPath);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideLayout && <Header />}
      <QueryClientProvider client={queryClient}>
        <main className="flex-1 ">{children}</main>
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
