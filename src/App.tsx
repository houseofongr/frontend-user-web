import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/common/About";

import ProgramPage from "./pages/common/Program";
import ContactPage from "./pages/common/Contact";
import InitPage from "./pages/common/Init";
import RoomDetailPage from "./pages/user/RoomDetail";
import RootLayout from "./components/layout/RootLayout";
import MyHomesPage from "./pages/user/MyHomes";
import PublicHomesPage from "./pages/b2b/PublicHomes";
import BusinessPage from "./pages/b2b/Business";
import DemoPage from "./pages/b2b/homesDemo/250226/Demo";
import ReservationPage from "./pages/user/Reservation";
import CSPage from "./pages/user/mypage/CS";
import LoginPage from "./pages/login/Login";
import AuthPage from "./pages/login/Auth";
import TermsOfServicePage from "./pages/login/TermsOfSevice";
import MySoundListPage from "./pages/user/mypage/MySoundList";
import MyAccount from "./pages/user/mypage/MyAccount";
import WithdrawalMemberPage from "./pages/user/mypage/WithdrawalMember";
import WithdrawalAgreementPage from "./pages/user/mypage/WithdrawalAgreement";
import NotFoundPage from "./pages/common/NotFound";
import ForbiddenPage from "./pages/common/Forbidden";
import UniverseDetailPage from "./pages/universe/UniverseDetailPage";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<InitPage />} />
          {/* 신규 유저 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/auth" element={<AuthPage />} />
          <Route path="/login/terms" element={<TermsOfServicePage />} />
          {/* 기존유저 */}
          <Route path="/main/home" element={<MyHomesPage />} />
          <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage/account" element={<MyAccount />} />
          <Route path="/mypage/sound-list" element={<MySoundListPage />} />
          <Route path="/mypage/cscenter" element={<CSPage />} />
          {/* 마이페이지 - 서비스 탈퇴 */}
          <Route path="/mypage/account/withdraw" element={<WithdrawalMemberPage />} />
          <Route path="/mypage/account/withdraw/agreement" element={<WithdrawalAgreementPage />} />

          {/* 예약 페이지 - 내용x */}
          <Route path="/reservation" element={<ReservationPage />} />

          {/* 유니버스 - 상세 페이지 */}
          <Route path="/universe/:universeId" element={<UniverseDetailPage />} />


          {/* public page */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/common/homes" element={<PublicHomesPage />} />
          {/* demo page */}
          <Route path="/common/homes/1/demo" element={<DemoPage />} />
          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
          {/* 403 page */}
          <Route path="/forbidden" element={<ForbiddenPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
