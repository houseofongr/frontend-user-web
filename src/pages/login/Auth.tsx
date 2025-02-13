import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerIcon from "../../components/icons/SpinnerIcon";

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
        navigate("/terms"); // 신규유저면 약관동의 페이지로 이동
      }
    } else {
      console.log("기존유저");
      if (nickname && accessToken) {
        navigate("/main/home"); // 기존 유저면 메인페이지로 이동
        sessionStorage.setItem("nickname", nickname);
        sessionStorage.setItem("authToken", accessToken);
      }
    }
  }, [location]);

  return <SpinnerIcon />;
};

export default AuthPage;
