import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center fixed top-0 right-11 inset-x-0 md:py-8 sm:py-2 border-b-[1px] border-slate-200 bg-white z-10 ">
      <div className="invisible">아무페이지</div>
      <Logo />
      <div className="pr-10">마이페이지</div>
      {/* <Navigator /> */}
    </header>
  );
}
