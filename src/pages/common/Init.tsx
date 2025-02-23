import InitHouseImage from "../../components/InitHouseImage";
import InitText from "../../components/InitText";
import { Link } from "react-router-dom";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

export default function InitPage() {
  return (
    <div
      className="flex-center flex-col "
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <InitText />
      <div className="flex gap-20">
        <Link to="/public/main" className=" text-center">
          <InitHouseImage imgType="public" />
          <span className="text-xs">PUBLIC</span>
        </Link>
        <Link to="/login" className=" text-center">
          <InitHouseImage clickable imgType="private" />
          <span className="text-xs">PRIVATE</span>
        </Link>
      </div>
    </div>
  );
}
