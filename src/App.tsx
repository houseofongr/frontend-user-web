import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./components/layout/RootLayout";
import LoginPage from "./pages/login/Login";
import AuthPage from "./pages/login/Auth";
import MainHome from "./pages/MainHome";
import Mypage from "./pages/mypage/Mypage";
import RoomDetailPage from "./pages/RoomDetail";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/NotFound";
import TermsOfServicePage from "./pages/login/TermsOfSevice";
import WithdrawalAccountPage from "./pages/mypage/WithdrawalAccount";
import RecheckWithdrawalPage from "./pages/mypage/RecheckWithdrawal";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {/* 공통 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/auth" element={<AuthPage />} />

          {/* 신규유저 */}
          <Route path="/login/terms" element={<TermsOfServicePage />} />

          {/* 기존유저 */}
          <Route path="/main/home" element={<MainHome />} />

          <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/account/withdraw" element={<WithdrawalAccountPage />} />
          <Route path="/mypage/account/withdraw/recheck" element={<RecheckWithdrawalPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
