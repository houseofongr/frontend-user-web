import AccountTab from "../../../components/mypage/AccountTab";
import MypageLayout from "../../../components/layout/MypageLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyAccountPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <MypageLayout>
      <AccountTab />
    </MypageLayout>
  );
}
