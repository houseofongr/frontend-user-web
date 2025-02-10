import { useState } from "react";
import { motion } from "framer-motion";
import API_CONFIG from "../../config/api";
import Header from "../../components/layout/Header";
import InitHouseImage from "../../components/InitHouseImage";
import Footer from "../../components/layout/Footer";

export default function LoginPage() {
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);

  const handleLogin = async (provider: string) => {
    console.log(`${API_CONFIG.BACK_API}/authn/login/${provider}`);
    window.location.href = `${API_CONFIG.BACK_API}/authn/login/${provider}`;
  };

  return (
    <div className="h-screen flex-center">
      <Header />

      <div className="flex justify-center items-center relative border h-full w-full">
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
            initial={{ opacity: 0, y: 180 }}
            animate={{ opacity: 1, y: 140 }}
            transition={{ duration: 0.8 }}
            className="w-full absolute z-10 flex-center flex-col "
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

      <Footer />
    </div>
  );
}
