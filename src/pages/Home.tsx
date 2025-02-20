import InitHouseImage from "../components/InitHouseImage";
import InitText from "../components/InitText";
import { Link } from "react-router-dom";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../constants/componentSize";

export default function Home() {
  return (
    <div
      className="flex-center flex-col "
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <InitText />
      <Link to="/login">
        <InitHouseImage clickable />
      </Link>
    </div>
  );
}
