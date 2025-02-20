export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between sticky bottom-0 text-xs md:text-sm text-center font-light inset-x-0 py-2 bg-transparent ">
      {/* 기존 */}
      {/* <p>ARCHIVE OF ONGR Co.&copy; 2022 ALL RIGHT RESERVED.</p> */}
      {/* 올바른 저작권 표시법 ⓒ 2021.회사명 Co., Ltd. All rights reserved.*/}
      <div className="w-[200px]"></div>
      <p>&copy; 2022 ARCHIVE OF ONGR Co. ALL RIGHT RESERVED.</p>
      <div className="flex gap-5 md:pr-10 justify-evenly">
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </div>
    </footer>
  );
}
