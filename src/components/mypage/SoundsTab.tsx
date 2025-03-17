import { useState } from "react";
import { useAllSound } from "../../hooks/useSoundData";
import SoundListItem from "../SoundListItem";
import Pagination from "../common/Pagination";
import { soundListHeaderTitles } from "../../constants/headerList";
import { SoundListItem as SoundData } from "../../types/sound";
import SpinnerIcon from "../icons/SpinnerIcon";
import { IoIosArrowForward } from "react-icons/io";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ListHeader from "../ListHeader";

export default function SoundsTab() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useAllSound(currentPage);
  const soundSources: SoundData[] = data?.soundSources || [];
  const totalPages: number = data?.pagination?.totalPages || 0;

  console.log("soundsouces", data);

  if (!data) return <SpinnerIcon />;

  return (
    <main className="md:py-5 lg:px-24">
      <section className="w-full flex flex-col ">
        {/* <SearchComponent onSearch={() => {}} options={soundSouceSearchOptions} /> */}

        <h3 className="text-xl md:text-2xl mb-5">소리 목록 및 경로</h3>
        {/* 모바일에서는 hidden 처리 */}
        <ListHeader headerTitles={soundListHeaderTitles} />

        {soundSources.length > 0 && (
          <ul className="hidden md:flex flex-col gap-5  ">
            {soundSources.map((sound: SoundData, index: number) => {
              return <SoundListItem key={index} sound={sound} currentPage={currentPage} size={10} index={index} />;
            })}
          </ul>
        )}

        <div className="w-full md:hidden">
          <div className="pb-5">
            <div className="flex items-center text-xs gap-1">
              <IoMdInformationCircleOutline color="tomato" />
              <span>홈</span>
              <IoIosArrowForward color="#F5946D" />
              <span>룸</span>
              <IoIosArrowForward color="#F5946D" />
              <span>아이템</span>
              <IoIosArrowForward color="#F5946D" />
              <span>소리명 </span>
              <p className="pl-1">순으로 경로가 표시됩니다.</p>
            </div>
            <div className="flex items-center text-xs gap-1">
              <IoMdInformationCircleOutline color="tomato" />
              <p>클릭 시 소리가 담겨있는 방으로 이동합니다.</p>
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {soundSources.map((sound: SoundData, index: number) => {
              return (
                <Link
                  key={index}
                  to={`/main/home/${sound.homeId}/rooms/${sound.roomId}`}
                  className="cusor-poiner border border-transparent hover:border-[#F5946D]"
                >
                  <li className="flex bg-white text-xs md:text-sm ">
                    <div className="px-3 flex-center border-r border-gray-200">{index + 1}</div>
                    <div className="w-full">
                      <div className="w-full p-1  flex-center gap-1 border-b border-gray-200">
                        <p className="line-clamp-1 text-center w-full ">{sound.homeName}</p>
                        <IoIosArrowForward color="#F5946D" />
                      </div>
                      <div className="flex items-center p-1  border-b border-gray-200">
                        <p className="text-center w-[45%] ">{sound.roomName}</p>
                        <IoIosArrowForward color="#F5946D" className="w-[5%] " />
                        <p className="text-center w-[45%] ">{sound.itemName}</p>
                        <IoIosArrowForward color="#F5946D" className="w-[5%] " />
                      </div>

                      <p className="p-1 w-full text-center ">{sound.name}</p>
                      <p className="p-1 w-full text-center text-gray-500 border-t border-gray-200">
                        생성 날짜 : {formatDate(sound.updatedDate)}
                      </p>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>

        {soundSources.length === 0 && <div className="text-center py-10">보유하고 있는 소리가 없습니다.</div>}

        {totalPages > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </section>
    </main>
  );
}
