import { MdOutlineRadioButtonChecked } from "react-icons/md";
import API_CONFIG from "../../config/api";
import { useHomeList } from "../../hooks/useHomeList";
import { HomeListItem } from "../../types/home";
import SpinnerIcon from "../icons/SpinnerIcon";
import UserInformation from "./UserInformation";
import BorderButton from "../common/BorderButton";
import { useState } from "react";
import { useHomeData } from "../../hooks/useHomeData";
import Modal from "../Modal";

export default function AccountTab() {
  const [targetHomeId, setTargetHomeId] = useState<number | null>(null);
  const [homeNameValue, setHomeNameValue] = useState("");
  const [showMessage, setShowMessage] = useState({ show: false, message: "" });
  const { data: homeList, isLoading: homeListLoading, isError: homeListError } = useHomeList();
  const { updateHomeName, isUpdatingName, updateNameError } = useHomeData(targetHomeId);

  const toggleHomeNameField = (homeId: number, currendName: string) => {
    if (targetHomeId === homeId) {
      setTargetHomeId(null);
    } else {
      setTargetHomeId(homeId);
      setHomeNameValue(currendName);
    }
  };

  const handleConfirmHomeNameChange = () => {
    if (homeNameValue.trim().length > 50) {
      setShowMessage({
        show: true,
        message: `입력한 홈 네임 길이가 현재 ${
          homeNameValue.trim().length
        }자 입니다. 홈 네임은 최대 50자까지 설정 가능합니다!`,
      });
      return;
    }
    if (!targetHomeId || homeNameValue.trim() === "") {
      setShowMessage({ show: true, message: "홈 네임 값을 입력해주세요!" });
      return;
    }
    //기존의 홈 네임 값과 변동 여부 체크
    const currentHome = homeList?.find((home: HomeListItem) => home.id === targetHomeId);
    if (currentHome && currentHome.name === homeNameValue.trim()) {
      setShowMessage({ show: true, message: "변경하려는 홈 이름과 기존의 홈 이름이 동일합니다." });
      return;
    }

    updateHomeName({ homeId: targetHomeId, newName: homeNameValue.trim() });
    setTargetHomeId(null);
    setShowMessage({ show: true, message: "홈네임 변경이 완료되었습니다." });
  };

  return (
    <section className="py-5 px-24 ">
      <UserInformation />
      <div>
        <p className="text-2xl">보유 홈 목록</p>
        <div className="flex gap-1 py-1 mb-5">
          <MdOutlineRadioButtonChecked size={20} className="text-primary " />
          <p className="text-sm">: 현재 메인 하우스로 설정되어 있는 집입니다.</p>
        </div>
        <div>
          {homeListLoading && <SpinnerIcon />}
          {homeListError && <div>홈 목록을 불러올 수 없습니다.</div>}
          <ul className="flex gap-5">
            {homeList &&
              homeList.map((home: HomeListItem) => {
                return (
                  <div key={home.id}>
                    <li className="bg-white px-3 pt-2 pb-6 shadow relative">
                      {home.isMain && (
                        <MdOutlineRadioButtonChecked size={20} className="text-primary absolute top-3 left-3" />
                      )}
                      <img
                        alt={home.name}
                        width={220}
                        height={220}
                        className=" object-contain outline-none "
                        src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${home.basicImageId}`}
                      />
                      <p className="text-center text-xs w-[220px] line-clamp-1 overflow-hidden break-words">
                        {home.name}
                      </p>
                    </li>

                    {targetHomeId === home.id ? (
                      <input
                        className={`w-full my-2 outline-none bg-white text-start border border-gray-300 px-3 py-2 text-sm `}
                        placeholder="새로운 홈 네임을 입력하여주세요"
                        value={homeNameValue}
                        onChange={(e) => setHomeNameValue(e.target.value)}
                      />
                    ) : (
                      ""
                    )}

                    <div className="mt-2 flex justify-center">
                      {targetHomeId === home.id ? (
                        <div className="flex gap-2">
                          <BorderButton label="확인" onClick={handleConfirmHomeNameChange} />
                          <BorderButton label="취소" onClick={() => setTargetHomeId(null)} />
                        </div>
                      ) : (
                        <BorderButton label="홈 네임 변경" onClick={() => toggleHomeNameField(home.id, home.name)} />
                      )}
                    </div>
                  </div>
                );
              })}
          </ul>
          {isUpdatingName && <SpinnerIcon />}
          {showMessage.show && (
            <Modal onClose={() => setShowMessage({ show: false, message: "" })}>
              <p className="text-white">{showMessage.message}</p>
            </Modal>
          )}
          {updateNameError && <div className="text-red-500 text-xs ">홈 이름 변경에 실패했습니다.</div>}
        </div>
      </div>
    </section>
  );
}
