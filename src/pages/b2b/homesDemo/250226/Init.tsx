import { Link } from "react-router-dom";

export default function Init() {
  return (
    <div className="mt-[10%] flex-center">
      <Link to={"/common/homes/1/demo"}>
        <img src="/images/demo/house_init.png" width={300} />
      </Link>
    </div>
  );
}
