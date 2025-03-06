import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerIcon from "../../../components/icons/SpinnerIcon";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isFirstLogin = searchParams.get("isFirstLogin");
    const nickname = searchParams.get("nickname");
    const accessToken = searchParams.get("accessToken");

    console.log("isFirstLogin:", isFirstLogin, "nickname:", nickname, "accessToken:", accessToken);

    if (isFirstLogin === "true") {
      if (nickname && accessToken) {
        sessionStorage.setItem("tempnickname", nickname);
        sessionStorage.setItem("tempToken", accessToken);
        console.log("신규유저");
        navigate("/login/terms");
      }
    } else {
      console.log("기존유저");
      if (nickname && accessToken) {
        navigate("/main/home");
        sessionStorage.setItem("nickname", nickname);
        sessionStorage.setItem("authToken", accessToken);
      }
    }
  }, [location]);

  return <SpinnerIcon />;
};

export default AuthPage;
