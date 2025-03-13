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
import ModalAlertMessage from "../modal/ModalAlertMessage";
import { MAX_NICKNAME } from "../../constants/size";

export default function UserInformation() {
  const { user } = useUserStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState({ show: false, message: "" });

  const { isLoading: userLoading } = useUserData();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  const toggleNicknameField = () => {
    setIsEditing((prev) => !prev);
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  };

  const handleConfirmNicknameChange = async () => {
    if (nickname.trim() === "") {
      setShowMessage({
        show: true,
        message: "공란입니다. 닉네임 값을 입력해주세요.",
      });
      return;
    }
    if (nickname.trim().length > MAX_NICKNAME) {
      setShowMessage({
        show: true,
        message: `입력한 닉네임 길이가 현재 ${nickname.length}자 입니다. 닉네임은 최대 20자까지 설정 가능합니다.`,
      });
      return;
    }

    try {
      await updateUser.mutateAsync({ nickname });
      setIsEditing(false);
      setShowMessage({
        show: true,
        message: `닉네임이 성공적으로 변경되었습니다.`,
      });
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
    <div>
      <h3 className="text-xl md:text-2xl mb-5">회원 정보</h3>
      <section className="w-full rounded-md bg-stone-700  md:p-6 lg:p-12 text-white flex flex-col  lg:flex-row lg:justify-between min-h-32">
        <div className="flex flex-col gap-0.5 items-center md:items-start  justify-center p-6 md:p-4">
          <div className="flex items-center gap-3  ">
            <strong className="text-sm md:text-lg">{user.nickname} 님,</strong>
            <p>안녕하세요.</p>
          </div>
          <p className="text-sm md:text-base"> 아카이브 오브 옹알의 [일반회원] 입니다.</p>
        </div>
        <div className="flex justify-around p-4 lg:p-0">
          {/* 집 개수 */}
          <div className="flex-center gap-1 lg:gap-5  lg:border-r md:px-10 lg:px-15  ">
            <BiHomeAlt color="#F5946D" className="text-2xl md:text-5xl " />
            <div className="flex flex-col items-center">
              <strong className="text-sm md:text-2xl">{user.myHomeCount} 개</strong>
              <span className="text-[10px] md:text-sm">보유 집</span>
            </div>
          </div>
          {/* 음원 개수 */}
          <div
            className="flex-center gap-1 lg:gap-5 lg:border-r md:px-10 lg:px-15 cursor-pointer"
            onClick={() => navigate("/mypage/sound-list")}
          >
            <MdAudiotrack color="#F5946D" className="text-2xl md:text-5xl" />
            <div className="flex flex-col items-center">
              <strong className="text-sm md:text-2xl">{user.mySoundSourceCount} 개</strong>
              <span className="text-[10px] md:text-sm">보유 소리</span>
            </div>
          </div>
          {/* 예약 */}
          <div
            className="flex-center gap-1 lg:gap-5 md:px-10 lg:px-15 cursor-pointer "
            onClick={() => navigate("/reservation")}
          >
            <MdCalendarMonth color="#F5946D" className="text-2xl md:text-5xl" />
            <div className="flex flex-col items-center">
              <strong className="text-sm md:text-2xl">- 개 </strong>
              <span className="text-[10px] md:text-sm">예약 현황</span>
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-10  md:w-1/2 lg:w-1/3">
        <div>
          <div className="py-3 flex flex-col gap-1">
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

          <div className=" flex justify-end">
            {isEditing ? (
              <div className="flex gap-2">
                <BorderButton label="확인" onClick={handleConfirmNicknameChange} />
                <BorderButton label="취소" onClick={toggleNicknameField} />
              </div>
            ) : (
              <BorderButton type="submit" label="닉네임 변경" onClick={toggleNicknameField} />
            )}
          </div>
        </div>

        <div>
          <FlexColBox label="이메일" content={user.email} fill hasPadding />
          <FlexColBox label="가입 일자" content={user.registeredDate} fill hasPadding />
        </div>

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
      {showMessage.show && (
        <ModalAlertMessage onClose={() => setShowMessage({ show: false, message: "" })}>
          <p className="text-white">{showMessage.message}</p>
        </ModalAlertMessage>
      )}
    </div>
  );
}
