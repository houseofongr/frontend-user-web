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

    if (isFirstLogin === "true") {
      if (nickname && accessToken) {
        sessionStorage.setItem("tempnickname", nickname);
        sessionStorage.setItem("tempToken", accessToken);
        navigate("/login/terms");
      }
    } else {
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
