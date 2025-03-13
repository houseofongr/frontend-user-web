import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../hooks/useUserData";
import CustomCheckboxInput from "../../../components/CustomCheckboxInput";
import Button from "../../../components/common/Button";

export default function WithdrawalAgreementPage() {
  const [agreements, setAgreements] = useState({
    termsOfDeletionAgreement: false,
    personalInformationDeletionAgreement: false,
  });
  const deleteUser = useDeleteUser();

  const navigate = useNavigate();

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements((prev) => ({
      ...prev,
      [e.target.id]: e.target.checked,
    }));
  };

  const handlerUserAccountRemove = async () => {
    if (!agreements.termsOfDeletionAgreement || !agreements.personalInformationDeletionAgreement) {
      alert("모든 탈퇴 동의 사항에 체크해주세요.");
      return;
    }

    if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
      try {
        await deleteUser.mutateAsync(agreements);
        alert("회원 탈퇴가 완료되었습니다.");
        // navigate("/");
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className="flex-center flex-col bg-neutral-100">
      <section className="px-5 md:px-14 py-10 md:py-20 w-full lg:w-[50%] flex flex-col">
        <h3 className="text-xl md:text-2xl">회원 탈퇴</h3>
        <p className="text-sm md:text-base font-extralight mb-5">회원 탈퇴 신청 시 아래 내용을 반드시 확인해주세요. </p>

        <strong className="mt-4 mb-2">탈퇴 시 삭제되는 내용</strong>
        <article className="border border-gray-200 rounded p-5 bg-white mb-10 text-sm md:text-base">
          <ul>
            <li>- 탈퇴 시 고객님께서 보유하셨던 홈과 음원들은 모두 소멸되어 복구가 불가능합니다.</li>
            <li>- 다른 계정으로의 양도 또는 이관할 수 없으며 재가입하더라도 삭제된 데이터는 복구되지 않습니다.</li>
            <li>- 탈퇴한 계정 및 이용 내역은 복구할 수 없으니 탈퇴 시 유의하시기 바랍니다.</li>
          </ul>
        </article>

        <strong className="mt-4 mb-2">탈퇴 시 보관 또는 유지되는 항목</strong>

        <article className="border border-gray-200 rounded p-5 bg-white mb-10 text-sm md:text-base">
          <ul>
            <li>
              - 탈퇴 시 법령에 따라 보관해야 하는 항목은 관련 법령에 따라 일정 기간 보관하며 다른 목적으로 이용하지
              않습니다.
            </li>
            <li>- 닉네임, 이메일은 부정 이용ㆍ탈퇴 방지를 위해 탈퇴 요청 시 7일 간 별도 보관 후 파기합니다.</li>
          </ul>
        </article>

        <div className="flex flex-col gap-2">
          <CustomCheckboxInput
            id="termsOfDeletionAgreement"
            label={"탈퇴 약관에 동의합니다."}
            checked={agreements.termsOfDeletionAgreement}
            onChange={handleAgreementChange}
            justify="start"
            hasBorder
          />
          <CustomCheckboxInput
            id="personalInformationDeletionAgreement"
            label={"개인정보 삭제에 동의합니다."}
            checked={agreements.personalInformationDeletionAgreement}
            onChange={handleAgreementChange}
            justify="start"
            hasBorder
          />
        </div>
      </section>
      <div className="flex-center flex-col my-5 pb-35 ">
        <div className="flex gap-10">
          <Button label="취소" variant="outline" onClick={() => navigate("/mypage/account")} />
          {/* disabled 조건 : 탈퇴 사유 선택 한 것이 하나도 없을 때  */}
          <Button
            label="탈퇴하기"
            disabled={!agreements.termsOfDeletionAgreement || !agreements.personalInformationDeletionAgreement}
            onClick={handlerUserAccountRemove}
          />
        </div>
      </div>
    </div>
  );
}
