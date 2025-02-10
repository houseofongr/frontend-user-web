import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import RootLayout from "./components/layout/RootLayout";
import LoginPage from "./pages/login/Login";
import MainHouse from "./pages/MainHouse";
import AuthPage from "./pages/login/Auth";
import TermsPage from "./pages/login/Terms";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/auth" element={<AuthPage />} />
          <Route path="/login/terms" element={<TermsPage />} />
          <Route path="/main" element={<MainHouse />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
