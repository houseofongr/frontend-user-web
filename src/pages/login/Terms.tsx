import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../../config/api";
import Button from "../../components/layout/Button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FaStarOfLife } from "react-icons/fa6";

export default function TermsPage() {
  const navigate = useNavigate();
  const [termsOfSeviceAgreement, setTermsOfSeviceAgreement] = useState<boolean>(false);
  const [personalInformationAgreement, setPersonalInformationAgreement] = useState<boolean>(false);
  const [allAgreenment, setAllAgreement] = useState<boolean>(false);

  const [terms, setTerms] = useState({ terms1: "", terms2: "" });

  const handleAllAgreementChange = (checked: boolean) => {
    setAllAgreement(checked);
    setTermsOfSeviceAgreement(checked);
    setPersonalInformationAgreement(checked);
  };

  const handleAgreementSubmit = async () => {
    const tempToken = sessionStorage.getItem("tempToken");
    const tempNickname = sessionStorage.getItem("tempnickname");

    console.log(tempToken, tempNickname);
    console.log(termsOfSeviceAgreement, personalInformationAgreement);

    if (!tempToken || !tempNickname) return;
    if (!termsOfSeviceAgreement || !personalInformationAgreement) return;
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/authn/regist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ termsOfSeviceAgreement, personalInformationAgreement }),
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

  useEffect(() => {
    if (termsOfSeviceAgreement && personalInformationAgreement) {
      setAllAgreement(true);
    } else {
      setAllAgreement(false);
    }
  }, [termsOfSeviceAgreement, personalInformationAgreement]);

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
        <span className="text-xl ">약관동의</span>

        {/* <p>'아카이브 오브 옹알' 서비스 이용약관 및 정보이용 안내에 대한 동의를 해주세요.</p> */}
        <p className="font-extralight mb-5">
          '아카이브 오브 옹알'이 처음이신 고객님, 서비스 시작 및 가입을 위해 아래의 약관 내용에 동의해 주세요.
        </p>

        <div className="my-3">
          <label htmlFor="all-agree-checkbox" className="flex gap-1 font-bold">
            <input
              type="checkbox"
              checked={allAgreenment}
              onChange={(e) => handleAllAgreementChange(e.target.checked)}
            />
            이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </label>
        </div>

        {/* 이용약관 */}
        <div className="mb-6">
          <div className="flex items-center gap-0.5">
            <span className="py-1 text-lg">이용약관 동의</span>
            <FaStarOfLife color="tomato" size={7} />
          </div>
          <article className="border border-gray-200 rounded p-5 bg-white max-h-50  overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-[#ffac8c] ">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-sm leading-relaxed">
              {terms.terms1}
            </ReactMarkdown>
          </article>
          <div className="flex justify-end mt-2">
            <label htmlFor="terms-of-service-agree-checkbox" className=" flex gap-1">
              <input
                type="checkbox"
                checked={termsOfSeviceAgreement}
                onChange={(e) => setTermsOfSeviceAgreement(e.target.checked)}
              />
              이용 약관에 동의합니다. (필수)
            </label>
          </div>
        </div>

        {/* 개인정보 수집 및 이용 동의 */}
        <div>
          <div className="flex items-center gap-0.5">
            <span className="py-1 text-lg">개인정보 수집 및 이용 동의</span>
            <FaStarOfLife color="tomato" size={7} />
          </div>

          <article className="border border-gray-200 p-5 rounded bg-white max-h-50  overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-[#ffac8c] ">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-sm leading-relaxed">
              {terms.terms2}
            </ReactMarkdown>
          </article>
          <div className="flex justify-end mt-2">
            <label htmlFor="personal-info-agree-checkobx" className=" flex gap-1">
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
            disabled={!termsOfSeviceAgreement || !personalInformationAgreement}
          />
        </div>
      </section>
    </div>
  );
}
