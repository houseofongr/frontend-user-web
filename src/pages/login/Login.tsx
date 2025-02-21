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
      className="flex-center flex-col pb-10"
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
          {/* <div className="cursor-pointer pb-5">
            <img
              onClick={() => handleLogin("kakao")}
              src={"/images/kakaoLoginButton.png"}
              alt="kakaoLoginButton"
              width={200}
              height={100}
            />
          </div> */}
          <div className="rounded-2xl border-2 border-[#535454] hover:border-[#FEE500] ">
            <button className="flex gap-2 px-10 py-3" type="button" onClick={() => handleLogin("kakao")}>
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="socialBrandAssets">
                    <path
                      id="vector"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.59961C6.69771 3.59961 2.3999 6.93492 2.3999 11.0485C2.3999 13.6068 4.06221 15.8621 6.59354 17.2035L5.52848 21.1116C5.43438 21.4569 5.82756 21.7321 6.12948 21.532L10.7982 18.437C11.1922 18.4752 11.5926 18.4975 12 18.4975C17.3018 18.4975 21.5999 15.1623 21.5999 11.0485C21.5999 6.93492 17.3018 3.59961 12 3.59961Z"
                      fill="#000000E6"
                    ></path>
                  </g>
                </svg>
              </span>
              <strong>카카오 로그인</strong>
            </button>
          </div>
          {/* <div className=" rounded-2xl border-2  mt-4 hover:border-[#03C75A]">
            <button className="flex gap-2 px-10 py-3" type="button">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="socialBrandAssets">
                    <path
                      id="vector"
                      d="M14.9917 12.5912L8.76282 3.60039H3.6001V20.4004H9.00853V11.4082L15.2374 20.4004H20.4001V3.60039H14.9917V12.5912Z"
                      fill="#000000E6"
                    ></path>
                  </g>
                </svg>
              </span>
              <strong>네이버 로그인</strong>
            </button>
          </div> */}
        </motion.div>
      )}
    </div>
  );
}
