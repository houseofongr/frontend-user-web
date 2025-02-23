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
  return <div>예약 페이지</div>;
}
