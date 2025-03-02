import InitHouseImage from "../../components/InitHouseImage";
import InitText from "../../components/InitText";
import { Link } from "react-router-dom";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";
import { useEffect, useState } from "react";

export default function InitPage() {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    console.log("token", token);
    setPath(token ? "/main/home" : "/login");
  }, []);
  return (
    <div
      className="flex-center flex-col "
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <InitText />
      <div className="flex gap-10 md:gap-20">
        <Link to="/common/homes" className=" text-center">
          <InitHouseImage imgType="public" />
          <span className="text-xs">PUBLIC</span>
        </Link>
        <Link to={path || "/login"} className=" text-center">
          <InitHouseImage clickable imgType="private" />
          <span className="text-xs">PRIVATE</span>
        </Link>
      </div>
    </div>
  );
}
