import { useEffect, useState } from "react";

import { useAllSound } from "../../hooks/useSoundData";
// import SearchComponent from "../SearchComponent";
import GridHeader from "../GridHeader";
// import { soundSouceSearchOptions } from "../../constants/searchOptions";
import { soundListHeaderTitles } from "../../constants/headerList";
import SoundListItem from "../SoundListItem";
import { SoundListItem as SoundData } from "../../types/sound";
import Pagination from "../common/Pagination";

export default function SoundsTab() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useAllSound(currentPage);

  const soundSources: SoundData[] = data?.soundSources || [];
  const totalPages: number = data?.pagination?.totalPages || 0;
  console.log("ttl pages", totalPages);

  useEffect(() => {}, [currentPage]);
  return (
    <section className="py-5 px-24 ">
      <div className="flex justify-between items-center mb-5">
        <p className="text-2xl">나의 소리 모음</p>

        {/* <SearchComponent onSearch={() => {}} options={soundSouceSearchOptions} /> */}
      </div>

      <div className="flex items-center flex-col py-4">
        <GridHeader headerTitles={soundListHeaderTitles} />

        {soundSources.length > 0 ? (
          <ul className="w-full flex flex-col gap-5 ">
            {soundSources.map((sound: SoundData, index: number) => {
              return <SoundListItem key={index} sound={sound} currentPage={currentPage} size={10} index={index} />;
            })}
          </ul>
        ) : (
          <p>보유하고 있는 소리가 없습니다.</p>
        )}
      </div>

      {totalPages > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </section>
  );
}
