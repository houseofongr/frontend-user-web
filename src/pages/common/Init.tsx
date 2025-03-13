import InitHouseImage from "../../components/InitHouseImage";
import InitText from "../../components/InitText";
import { Link } from "react-router-dom";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";
import { useEffect, useState } from "react";

export default function InitPage() {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setPath(token ? "/main/home" : "/login");
  }, []);

  return (
    <div
      className="flex-center flex-col md:pb-20"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <InitText />
      <div className="flex gap-5 md:gap-14  md:pb-44 lg:pb-0">
        <Link to="/common/homes" className=" text-center">
          <InitHouseImage imgType="public" />
          <span className="text-xs">PUBLIC</span>
        </Link>
        <Link to={path || "/login"} className="text-center ">
          <InitHouseImage clickable imgType="private" />
          <span className="text-xs">PRIVATE</span>
        </Link>
      </div>
    </div>
  );
}
