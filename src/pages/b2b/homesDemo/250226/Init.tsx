import { Link } from "react-router-dom";

// 데모페이지 진입
export default function Init() {
  return (
    <div className="mt-[10%] flex-center">
      <Link to={"/common/homes/1/demo"}>
        <img src="/images/demo/house_init.png" width={300} />
      </Link>
    </div>
  );
}
