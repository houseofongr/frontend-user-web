import { Outlet } from "react-router-dom";
import VerticalHeader from "../common/VerticalHeader";

function MainLayout() {
  return (
    <div className="main-layout flex h-screen">
      <VerticalHeader />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
