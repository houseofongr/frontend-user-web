import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/common/About";
import NotFoundPage from "./pages/NotFound";
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
import RootLayout from "./components/layout/RootLayout";
import MyHomesPage from "./pages/user/MyHomes";
// import ReservationPage from "./pages/user/Reservation";
// import WelcomePage from "./pages/user/login/WelcomePage";
import PublicHomesPage from "./pages/b2b/PublicHomes";
import BusinessPage from "./pages/b2b/Business";
// import Init from "./pages/b2b/homesDemo/250226/Init";
import DemoPage from "./pages/b2b/homesDemo/250226/Demo";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {/* 완료된 페이지 */}
          <Route path="/" element={<InitPage />} />
          {/* 신규 유저 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/auth" element={<AuthPage />} />
          {/* <Route path="/login/auth/complete" element={<WelcomePage />} /> */}
          <Route path="/login/terms" element={<TermsOfServicePage />} />
          {/* 기존유저 */}
          <Route path="/main/home" element={<MyHomesPage />} />
          <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />
          <Route path="/mypage/account" element={<Mypage />} />
          <Route path="/mypage/account/withdraw" element={<WithdrawalAccountPage />} />
          <Route path="/mypage/account/withdraw/recheck" element={<RecheckWithdrawalPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/reservation" element={<ReservationPage />} /> */}
          {/* public page */} <Route path="/about" element={<AboutPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/common/business" element={<BusinessPage />} />
          <Route path="/common/homes" element={<PublicHomesPage />} />
          {/* demo page */}
          {/* <Route path="/common/homes/1/init" element={<Init />} /> */}
          <Route path="/common/homes/1/demo" element={<DemoPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
