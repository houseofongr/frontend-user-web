import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";

export default function ReservationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <PageLayout>
      <div className="py-20">
        <p>준비중입니다.</p>
      </div>
    </PageLayout>
  );
}
