import { motion } from "framer-motion";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../../constants/componentSize";
import InitHouseImage from "../../../components/InitHouseImage";
import { useUserStore } from "../../../stores/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../hooks/useUserData";
import SpinnerIcon from "../../../components/icons/SpinnerIcon";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { isLoading: userLoading } = useUserData();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  if (userLoading || !user) return <SpinnerIcon />;
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
      >
        <InitHouseImage imgType="private" />
      </motion.div>
      {userLoading || !user ? (
        <SpinnerIcon />
      ) : (
        <div className="text-center md:text-[20px]">
          <h1 className="">{user.nickname} 님,</h1>
          <h2>다시 오신 걸 환영해요!</h2>
        </div>
      )}
    </div>
  );
}
