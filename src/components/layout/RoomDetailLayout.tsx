import { ReactNode } from "react";

type RoomDetailLayoutProp = {
  children: ReactNode;
};

//  mt-[50%] md:mt-[40%] lg:mt-[10%]
export default function RoomDetailLayout({ children }: RoomDetailLayoutProp) {
  return <div className="relative w-full h-screen bg-stone-800 ">{children}</div>;
}
