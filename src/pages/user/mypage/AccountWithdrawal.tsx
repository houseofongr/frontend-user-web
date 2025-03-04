import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/common/Button";
import CustomCheckboxInput from "../../../components/CustomCheckboxInput";
("");
const CHECK_LIST: { id: string; text: string; suggest: string }[] = [
  { id: "check-1", text: "탈퇴 후 재가입을 하고싶습니다.", suggest: "탈퇴 시 30일동안 재가입을 할 수 없습니다." },
  { id: "check-2", text: "이 서비스를 자주 사용하지 않습니다.", suggest: "ㅠㅠ" },
  {
    id: "check-3",
    text: "서비스 이용 가격이 너무 비싸다고 느껴집니다.",
    suggest: "현재 할인 프로모션이 진행 중입니다! 고객센터에 문의해보세요.",
  },
  {
    id: "check-4",
    text: "서비스 및 고객지원이 만족스럽지 않습니다.",
    suggest: "궁금하신 점은 고객센터 1:1 문의로 연락주시면 처리를 도와드립니다. (마이페이지 > 고객지원 > 1:1문의)",
  },
  {
    id: "check-5",
    text: "해당 사이트에 등록하고 싶은 소리가 없습니다.",
    suggest: "꼭 특별하지 않아도 좋습니다. 자신의 목소리를 이용해 오늘 하루를 기록해보세요.",
  },
  {
    id: "check-6",
    text: "개인 정보 유출이 우려됩니다.",
    suggest: "아카이브 오브 옹알은 강력한 보안 정책을 운영 중입니다. 개인정보 보호 정책을 확인해보세요.",
  },
];

export default function AccountWithdrawalPage() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleCheckboxChange = (id: string): void => {
    setSelectedReason((prev) => (prev === id ? null : id));
  };
  const navigate = useNavigate();

  return (
    <div className="flex-center flex-col bg-neutral-100">
      <section className="w-full md:w-[50%] flex flex-col p-10">
        <span className="text-2xl">탈퇴 사유</span>
        <p className="font-extralight mt-3">그동안 아카이브 오브 옹알 웹사이트를 이용해 주셔서 감사합니다.</p>
        <p className="font-extralight mb-3">아래 해당되는 탈퇴 사유를 선택하여 주세요.</p>
        <ul className="flex flex-col gap-3">
          {CHECK_LIST.map((item, index) => (
            <li key={index} className="px-2 py-4 bg-white ">
              <CustomCheckboxInput
                id={item.id}
                label={item.text}
                checked={selectedReason === item.id}
                onChange={() => handleCheckboxChange(item.id)}
                justify="start"
              />
              {selectedReason === item.id && item.suggest && (
                <p className="pl-5 text-sm text-gray-600">- {item.suggest}</p>
              )}
            </li>
          ))}
        </ul>

        <form className="w-full my-3">
          <span className="py-1 text-lg">기타(선택)</span>
          <textarea
            className=" w-full p-4 my-1 bg-white"
            rows={5}
            placeholder="위 내용 외에 불편하셨던 점이나 기타 개선사항이 있을 경우 내용을 입력해 주세요. "
          />
        </form>

        <div className="flex-center flex-col my-5 ">
          <div className="flex gap-10">
            <Button label="취소" variant="outline" onClick={() => navigate("/mypage/account")} />
            <Button
              label="다음"
              disabled={!selectedReason}
              onClick={() => navigate("/mypage/account/withdraw/recheck")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
