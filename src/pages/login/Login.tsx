import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../../config/api";

import InitHouseImage from "../../components/InitHouseImage";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";

export default function LoginPage() {
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = async (provider: string) => {
    window.location.href = `${API_CONFIG.BACK_API}/authn/login/${provider}`;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      navigate("/main/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // 디바이스에 따라 y 값 설정 (모바일 vs 태블릿/pc)
  const yValues = useMemo(() => {
    return window.innerWidth <= 768 ? { initial: 90, animate: 50 } : { initial: 150, animate: 110 };
  }, []);

  return (
    <div
      className="flex-center flex-col md:pb-20"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -50 }}
        transition={{
          duration: 0.8,
        }}
        onAnimationComplete={() => setIsAnimationComplete(true)}
      >
        <InitHouseImage imgType="private" />
      </motion.div>

      {isAnimationComplete && (
        <motion.div
          initial={{ opacity: 0, y: yValues.initial }}
          animate={{ opacity: 1, y: yValues.animate }}
          transition={{ duration: 0.8 }}
          className="w-full absolute z-1 flex-center flex-col"
        >
          <div className="cursor-pointer pb-5">
            <img
              onClick={() => handleLogin("kakao")}
              src={"/images/loginButton/kakaoLogin.png"}
              alt="kakaoLoginButton"
              className="w-36 md:w-[200px] h-auto"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
