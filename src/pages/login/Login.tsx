import { useState } from "react";
import { motion } from "framer-motion";
import API_CONFIG from "../../config/api";
import InitHouseImage from "../../components/InitHouseImage";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

export default function LoginPage() {
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);

  const handleLogin = async (provider: string) => {
    console.log(`${API_CONFIG.BACK_API}/authn/login/${provider}`);
    window.location.href = `${API_CONFIG.BACK_API}/authn/login/${provider}`;
  };

  return (
    <div
      className="flex-center flex-col"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -50 }}
        transition={{
          damping: 25,
          duration: 0.8,
        }}
        onAnimationComplete={() => setIsAnimationComplete(true)}
      >
        <InitHouseImage />
      </motion.div>

      {isAnimationComplete && (
        <motion.div
          initial={{ opacity: 0, y: 180 }} // 모바일 120, 노트북 180
          animate={{ opacity: 1, y: 120 }} // 모바일 80 , 노트북 120
          transition={{ duration: 0.8 }}
          className="w-full absolute z-10 flex-center flex-col"
        >
          <div className="cursor-pointer pb-5">
            <img
              onClick={() => handleLogin("kakao")}
              src={"/images/kakaoLoginButton.png"}
              alt="kakaoLoginButton"
              width={200}
              height={100}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
