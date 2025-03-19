import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { TbDoorExit } from "react-icons/tb";

type RoomDetailLayoutProp = {
  children: ReactNode;
};

export default function RoomDetailLayout({ children }: RoomDetailLayoutProp) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-stone-800 ">
      {children}
      <div className="fixed top-0 left-0 p-3" onClick={() => navigate("/main/home")}>
        <TbDoorExit color="white" className="text-xl md:text-4xl cursor-pointer hover:text-red-500" />
      </div>
    </div>
  );
}
