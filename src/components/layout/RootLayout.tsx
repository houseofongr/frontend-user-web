import React, { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuProvider } from "../../context/MenuContext";

const HIDE_HEADER_PATHS = ["/main/home", "/common/homes/1/demo"];

// "/main/home/:homeId/rooms/:roomId - 룸 상세페이지 path
const HIDE_HEADER_REGEX = /^\/main\/home\/[^/]+\/rooms\/[^/]+$/;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [queryClient] = useState(() => new QueryClient());

  const currentPath = location.pathname;
  const shouldHideHeader = HIDE_HEADER_PATHS.includes(currentPath) || HIDE_HEADER_REGEX.test(currentPath);

  return (
    <MenuProvider>
      <div className="min-h-screen flex flex-col">
        {!shouldHideHeader && <Header />}
        <QueryClientProvider client={queryClient}>
          <main className="flex-1">{children}</main>
        </QueryClientProvider>
        <Footer />
      </div>
    </MenuProvider>
  );
}
