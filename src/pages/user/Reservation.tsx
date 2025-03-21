import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import Button from "../../components/common/Button";

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
      <div className="py-20 flex-center flex-col gap-5">
        <p>준비중입니다.</p>
        <Button label="뒤로가기" onClick={() => navigate(-1)} />
      </div>
    </PageLayout>
  );
}
