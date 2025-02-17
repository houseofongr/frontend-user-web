import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../../config/api";

export default function TermsPage() {
  const navigate = useNavigate();
  const [recordAgreement, setRecordAgreement] = useState(false);
  const [personalInformationAgreement, setPersonalInformationAgreement] = useState(false);

  const handleAgreementSubmit = async () => {
    const tempToken = sessionStorage.getItem("tempToken");
    const tempNickname = sessionStorage.getItem("tempnickname");

    console.log(tempToken, tempNickname);

    if (!tempToken || !tempNickname) {
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/authn/regist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ recordAgreement, personalInformationAgreement }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.removeItem("tempnickname");
        sessionStorage.removeItem("tempToken");
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("username", data.nickname);

        navigate("/main");
      } else {
        throw new Error("동의 처리 실패");
      }
    } catch (error) {
      console.error("동의 처리 오류:", error);
      alert("동의 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="mt-[25%] md:mt-[25%] lg:mt-[15%] mx-20">
      <div>
        <label>
          <input type="checkbox" checked={recordAgreement} onChange={(e) => setRecordAgreement(e.target.checked)} />
          이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
        </label>
      </div>
      <h1>이용약관 동의</h1>
      <div>
        <label>
          <input type="checkbox" checked={recordAgreement} onChange={(e) => setRecordAgreement(e.target.checked)} />
          음성 기록에 동의합니다. (필수)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={personalInformationAgreement}
            onChange={(e) => setPersonalInformationAgreement(e.target.checked)}
          />
          개인정보 수집 및 이용에 동의합니다. (필수)
        </label>
      </div>
      <button
        type="submit"
        onClick={handleAgreementSubmit}
        disabled={!recordAgreement || !personalInformationAgreement}
      >
        동의하고 계속하기
      </button>
    </div>
  );
}
