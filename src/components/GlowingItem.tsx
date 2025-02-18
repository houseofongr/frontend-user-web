import { motion } from "framer-motion";

const GlowingItem = () => {
  return (
    <motion.div
      className="relative w-40 h-40 rounded-full m-100 "
      animate={{
        boxShadow: [
          "0px 0px 10px rgb(225, 217, 217)",
          "0px 0px 20px rgb(255, 250, 250)",
          "0px 0px 10px rgb(225, 217, 217)",
        ],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      // style={{ background: "rgba(255, 255, 0, 0.2)" }}
    />
  );
};

export default GlowingItem;
