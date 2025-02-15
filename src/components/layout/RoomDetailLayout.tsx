import { ReactNode } from "react";

type RoomDetailLayoutProp = {
  children: ReactNode;
};

export default function RoomDetailLayout({ children }: RoomDetailLayoutProp) {
  return <div className="relative w-full h-screen bg-stone-800">{children}</div>;
}
