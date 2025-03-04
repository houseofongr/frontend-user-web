import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return <div className="w-full flex-center mt-[20%]">준비중입니다.</div>;
}
