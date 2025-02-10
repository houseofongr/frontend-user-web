import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import MyAccountSettingTab from "./pages/Mypage/MyAccountSettingTab";
import MyAudioListTab from "./pages/Mypage/MyAudioListTab";
import RootLayout from "./components/layout/RootLayout";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage/account" element={<MyAccountSettingTab />} />
          <Route path="/mypage/audio-list" element={<MyAudioListTab />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
