import { useUserStore } from "../../stores/useUserStore";
import { useUpdateUser, useUserData } from "../../hooks/useUserData";
import SpinnerIcon from "../icons/SpinnerIcon";
import KakaoSymbol from "../icons/social-symbol/KakaoSymbol";
import { BiHomeAlt } from "react-icons/bi";
import { MdAudiotrack, MdCalendarMonth } from "react-icons/md";
import FlexColBox from "../FlexColBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BorderButton from "../common/BorderButton";

export default function UserInformation() {
  const { user } = useUserStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading: userLoading } = useUserData();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  const toggleNicknameField = () => {
    setIsEditing((prev) => !prev);
  };

  const handleConfirmNicknameChange = async () => {
    try {
      await updateUser.mutateAsync({ nickname });
      setIsEditing(false);
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
    }
  };

  const navigatePage = () => {
    navigate("/mypage/account/withdraw");
  };

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user?.nickname]);

  if (userLoading || !user) return <SpinnerIcon />;
  return (
    <div className="w-full ">
      <p className="text-2xl mb-5">회원 정보</p>
      <div className="w-full rounded-md bg-stone-700 p-12 text-white flex justify-between min-h-32">
        <div className="flex flex-col gap-0.5  justify-center">
          <div className="flex items-center gap-3">
            <strong className="text-lg">{user.nickname} 님,</strong>
            <p>안녕하세요.</p>
          </div>
          <p className="text-sm"> 아카이브 오브 옹알의 일반회원입니다.</p>
        </div>
        <div className="flex">
          {/* 집 개수 */}
          <div className="flex-center gap-5 border-r px-10  ">
            <BiHomeAlt size={50} color="#F5946D" />
            <div className="flex flex-col items-center">
              <strong className="text-2xl">{user.myHomeCount} 개</strong>
              <span className="text-xs">내가 보유한 집</span>
            </div>
          </div>
          {/* 음원 개수 */}
          <div className="flex-center gap-5 px-10 border-r ">
            <MdAudiotrack size={50} color="#F5946D" />
            <div className="flex flex-col items-center">
              <strong className="text-2xl">{user.mySoundSourceCount} 개</strong>
              <span className="text-xs">내가 보유한 소리</span>
            </div>
          </div>
          {/* 예약 */}
          <div className="flex-center gap-5 px-10">
            <MdCalendarMonth size={50} color="#F5946D" />
            <div className="flex flex-col items-center">
              <strong className="text-2xl">- </strong>
              <span className="text-xs">나의 예약 현황</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10">
        <>
          <div className="py-3 flex flex-col gap-1 w-[25%]">
            <label className="min-w-40 font-extralight text-sm">닉네임</label>

            <div
              className={`rounded-md text-start border border-gray-300 p-3 ${
                isEditing ? "bg-white" : "bg-neutral-100"
              }`}
            >
              <input
                value={nickname}
                readOnly={!isEditing}
                onChange={(e) => setNickname(e.target.value)}
                className={`w-full outline-none bg-transparent ${!isEditing ? "cursor-default" : ""}`}
                placeholder={isEditing ? "새로운 닉네임을 입력하여 주세요." : ""}
              />
            </div>
          </div>

          <div className="w-[25%] flex justify-end">
            {isEditing ? (
              <div className="flex gap-2">
                <BorderButton label="확인" onClick={handleConfirmNicknameChange} />
                <BorderButton label="취소" onClick={toggleNicknameField} />
              </div>
            ) : (
              <BorderButton type="submit" label="닉네임 변경" onClick={toggleNicknameField} />
            )}
          </div>
        </>

        <FlexColBox label="이메일" content={user.email} fill hasPadding />
        <FlexColBox label="가입 일자" content={user.registeredDate} fill hasPadding />
        <FlexColBox
          label="SNS 계정 정보"
          content={
            <ul className="m-0 p-0">
              {user.snsAccountInfos.map((info, index) => {
                return (
                  <div key={index}>
                    <li className="flex gap-3 items-center p-3 bg-white rounded">
                      <span>{info.domain === "KAKAO" && <KakaoSymbol />}</span>
                      <div className="flex flex-col leading-tight ">
                        <span className="text-sm text-gray-400">KAKAO</span>
                        <span className="">{info.email}</span>
                      </div>
                    </li>
                  </div>
                );
              })}
            </ul>
          }
        />
        <div className="text-end">
          <span onClick={navigatePage} className="text-gray-300 text-end border p-1 text-sm cursor-pointer">
            회원탈퇴
          </span>
        </div>
      </section>
    </div>
  );
}
