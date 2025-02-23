import { Outlet } from "react-router-dom";
import VerticalHeader from "./VerticalHeader";

function MainLayout() {
  return (
    <div className="main-layout flex">
      <VerticalHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
