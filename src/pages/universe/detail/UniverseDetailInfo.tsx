import { useEffect, useState } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useUniverseStore } from '../../../hooks/admin/useUniverseStore';
import { Universe } from '../../../types/universe';
import { useParams } from 'react-router-dom';
import { getUniverseDetail } from '../../../service/universeService';
import { convertUnixToDate } from '../../../utils/formatDate';


export default function UniverseDetailInfo() {
  const { universeId } = useParams();
  const universeIdParsed = parseInt(universeId || "", 10);
  const { setUniverseId } = useUniverseStore();

  const [showMore, setShowMore] = useState<boolean>(false);
  const [universe, setUniverse] = useState<Universe>({
    id: 0,
    thumbnailId: -1,
    thumbMusicId: -1,
    innerImageId: -1,
    createdTime: Date.now(),
    updatedTime: Date.now(),
    view: 0,
    like: 0,
    title: "",
    description: "",
    category: {
      id: -1,
      eng: "",
      kor: "",
    },
    publicStatus: "PRIVATE",
    hashtags: [],
    authorId: 0,
    author: "",
  });

  useEffect(() => {
    if (!universeId) return;

    const fetchUniverse = async () => {
      try {
        const data = await getUniverseDetail(universeIdParsed);
        setUniverseId(data.id!);
        setUniverse(data);
        console.log(data);

      } catch (error) {
        console.error("유니버스 조회 실패:", error);
      }
    };

    fetchUniverse();
  }, [universeId]);


  const maxDescriptionLength = 2;
  const isLong = universe?.description!.length > maxDescriptionLength;
  const shortDesc = universe?.description!.slice(0, maxDescriptionLength);

  return (
    <div className="w-full flex flex-col gap-2 text-gray-800 pt-10">
      {/* 제목 */}
      <h2 className="text-2xl font-bold">{universe.title}123</h2>

      {/* 메타 정보 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span>{universe.author}</span>
        <div className='flex flex-col'>
          <span>{convertUnixToDate(universe.createdTime).default}</span>
          <span>조회수 {universe.view}회</span>
        </div>

        <button className="flex flex-col items-center">
          <IoIosHeartEmpty size={16} color='red' />
          <span>{universe.like}</span>

        </button>
        <button className="flex flex-col items-center gap-1">
          <IoShareSocialOutline size={16} />
          공유
        </button>
      </div>

      {/* 해시태그 */}
      <div className="flex flex-wrap gap-2 text-sm">
        {universe.hashtags.map((hashtag: string) => {
          return <span>#{hashtag}</span>
        })}
        <span>#SF</span>
        <span>#우주</span>
        <span>#모험</span>
      </div>

      {/* 설명 */}
      <div className="text-base leading-relaxed whitespace-pre-wrap">
        {isLong && !showMore ? `${shortDesc}...` : universe.description}
        {isLong && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="ml-2 text-sm font-bold cursor-pointer"
          >
            {showMore ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
}
