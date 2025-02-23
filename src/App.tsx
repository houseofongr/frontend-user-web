import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import MainHome from "./pages/user/MainHome";
import AboutPage from "./pages/common/About";
import NotFoundPage from "./pages/NotFound";
import LoginLayout from "./components/layout/LoginLayout";
import ProgramPage from "./pages/common/Program";
import ContactPage from "./pages/common/Contact";
import InitPage from "./pages/common/Init";
import LoginPage from "./pages/user/login/Login";
import AuthPage from "./pages/user/login/Auth";
import Mypage from "./pages/user/mypage/Mypage";
import RoomDetailPage from "./pages/user/RoomDetail";
import TermsOfServicePage from "./pages/user/login/TermsOfSevice";
import WithdrawalAccountPage from "./pages/user/mypage/WithdrawalAccount";
import RecheckWithdrawalPage from "./pages/user/mypage/RecheckWithdrawal";
import MainLayout from "./components/layout/MainLayout";
import ReservationPage from "./pages/user/Reservation";
import ClientPage from "./pages/public/ClientPage";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <RootLayout> */}
        <Routes>
          {/* 헤더 위치 상단 */}
          {/* 공통  */}
          <Route element={<LoginLayout />}>
            <Route path="/" element={<InitPage />} />
            {/* 신규 유저 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/auth" element={<AuthPage />} />
            <Route path="/login/terms" element={<TermsOfServicePage />} />
          </Route>
          <Route element={<MainLayout />}>
            {/* vertical header- 왼쪽 */}
            <Route path="/public/client" element={<ClientPage />} />
            {/* 기존유저 */}
            <Route path="/main/home" element={<MainHome />} />
            <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />
            {/* 마이페이지 */}
            <Route path="/mypage/account" element={<Mypage />} />
            <Route path="/mypage/account/withdraw" element={<WithdrawalAccountPage />} />
            <Route path="/mypage/account/withdraw/recheck" element={<RecheckWithdrawalPage />} />
            {/* 소개 */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/public/about" element={<AboutPage />} />

            {/* 예약 */}
            <Route path="/reservation" element={<ReservationPage />} />
            {/* 프로그램 */}
            <Route path="/program" element={<ProgramPage />} />
            <Route path="/public/program" element={<ProgramPage />} />

            {/* contact */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/public/contact" element={<ContactPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        {/* </RootLayout> */}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
