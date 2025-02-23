import API_CONFIG from "../../config/api";
import { useHomeList } from "../../hooks/useHomeList";
import { HomeListItem } from "../../types/home";
import SpinnerIcon from "../icons/SpinnerIcon";
import UserInformation from "./UserInformation";

export default function AccountTab() {
  const { data: homeList, isLoading: homeListLoading, isError: homeListError } = useHomeList();

  return (
    <section className="py-5 px-24 ">
      <UserInformation />
      <div>
        <p className="text-2xl mb-5">보유 홈 목록</p>
        {homeListLoading && <SpinnerIcon />}
        {homeListError && <div>홈 목록을 불러올 수 없습니다.</div>}
        <ul className="flex gap-5">
          {homeList &&
            homeList.map((house: HomeListItem) => {
              return (
                <li key={house.id} className="bg-white p-3 shadow">
                  <img
                    alt={house.name}
                    width={220}
                    height={220}
                    className=" object-contain outline-none "
                    src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${house.basicImageId}`}
                  />
                  <p className="text-center text-xs w-[220px] line-clamp-2 overflow-hidden break-words">{house.name}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
