import { Outlet } from "react-router-dom";
import Header from "../common/Header";

function LoginLayout() {
  return (
    <div className="login-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default LoginLayout;
