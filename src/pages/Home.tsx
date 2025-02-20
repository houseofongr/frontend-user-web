import InitHouseImage from "../components/InitHouseImage";
import InitText from "../components/InitText";
import { Link } from "react-router-dom";

export default function Home() {
  const HEADER_HEIGHT = 143;
  const FOOTER_HEIGHT = 36;

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
