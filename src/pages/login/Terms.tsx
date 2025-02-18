import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../../config/api";
import Button from "../../components/layout/Button";
import ReactMarkdown from "react-markdown";
export default function TermsPage() {
  const navigate = useNavigate();
  const [recordAgreement, setRecordAgreement] = useState(false);
  const [personalInformationAgreement, setPersonalInformationAgreement] = useState(false);

  const [terms, setTerms] = useState({ terms1: "", terms2: "" });

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

  // useEffect(() => {
  //   fetch("/terms1.md") // Markdown 파일 가져오기
  //     .then((res) => res.text())
  //     .then((text) => setTerms1(text));
  //   fetch("/terms2.md") // Markdown 파일 가져오기
  //     .then((res) => res.text())
  //     .then((text) => setTerms2(text));
  // }, []);

  useEffect(() => {
    Promise.all([fetch("/terms1.md").then((res) => res.text()), fetch("/terms2.md").then((res) => res.text())]).then(
      ([terms1, terms2]) => {
        setTerms({ terms1, terms2 });
      }
    );
  }, []);

  return (
    <div className="flex-center flex-col mt-[130px] bg-neutral-100">
      <section className="w-[60%] flex flex-col p-10">
        {/* <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} /> */}
        <strong className="text-xl">약관동의</strong>
        {/* <p>'아카이브 오브 옹알' 서비스 이용약관 및 정보이용 안내에 대한 동의를 해주세요.</p> */}
        <p>'아카이브 오브 옹알'이 처음이신 고객님, 서비스 시작 및 가입을 위해 먼저 아래의 약관 내용에 동의해주세요.</p>

        <div className="my-3">
          <label className="flex gap-1">
            <input type="checkbox" checked={recordAgreement} onChange={(e) => setRecordAgreement(e.target.checked)} />
            이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </label>
        </div>

        {/* 이용약관 */}
        <div className="mb-6">
          <p className="py-1 text-lg">이용약관 동의 (필수)</p>
          <div className="border p-3 bg-white h-50 overflow-auto rounded-md">
            <ReactMarkdown className="text-sm leading-relaxed">{terms.terms1}</ReactMarkdown>
          </div>
          <div className="flex justify-end mt-2">
            <label className=" flex gap-1">
              <input type="checkbox" checked={recordAgreement} onChange={(e) => setRecordAgreement(e.target.checked)} />
              이용 약관에 동의합니다. (필수)
            </label>
          </div>
        </div>

        {/* 개인정보 수집 및 이용 동의 */}
        <div>
          <p className="py-1 text-lg">개인정보 수집 및 이용 동의 (필수)</p>
          <div className="border p-3 bg-white h-50 overflow-auto rounded-md">
            <ReactMarkdown className="text-sm leading-relaxed">{terms.terms2}</ReactMarkdown>
          </div>
          <div className="flex justify-end mt-2">
            <label className=" flex gap-1">
              <input
                type="checkbox"
                checked={personalInformationAgreement}
                onChange={(e) => setPersonalInformationAgreement(e.target.checked)}
              />
              개인정보 수집 및 이용에 동의합니다. (필수)
            </label>
          </div>
        </div>
        <div className="py-10 text-center">
          <Button
            type="submit"
            label="가입하기"
            onClick={handleAgreementSubmit}
            disabled={!recordAgreement || !personalInformationAgreement}
          />
        </div>
      </section>
    </div>
  );
}
