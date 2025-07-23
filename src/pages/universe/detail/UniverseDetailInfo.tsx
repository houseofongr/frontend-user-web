import { useEffect, useState } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useUniverseStore } from '../../../hooks/admin/useUniverseStore';
import { useParams } from 'react-router-dom';
import { public_getUniverseDetail } from '../../../service/user_universeService';
import { convertUnixToDate } from '../../../utils/formatDate';

export default function UniverseDetailInfo() {
  // 라우터 파라미터 및 전역 상태 접근
  const { universeId } = useParams();
  const universeIdParsed = parseInt(universeId || '', 10);
  const { setUniverseId, setUniverseInfo, universeInfo } = useUniverseStore();

  // 내부 상태
  const [showMore, setShowMore] = useState(false);
  const [maxDescriptionLength, setMaxDescriptionLength] = useState(200);

  // 화면 높이에 따라 설명 길이 설정
  useEffect(() => {
    const updateDescriptionLength = () => {
      const height = window.innerHeight;
      if (height > 1000) setMaxDescriptionLength(300);
      else if (height > 900) setMaxDescriptionLength(200);
      else if (height > 800) setMaxDescriptionLength(120);
      else if (height > 700) setMaxDescriptionLength(80);
      else setMaxDescriptionLength(30);
    };

    updateDescriptionLength();
    window.addEventListener('resize', updateDescriptionLength);
    return () => window.removeEventListener('resize', updateDescriptionLength);
  }, []);

  // 유니버스 상세 데이터 가져오기
  useEffect(() => {
    if (!universeIdParsed) return;

    const fetchUniverse = async () => {
      try {
        const data = await public_getUniverseDetail(universeIdParsed);
        setUniverseInfo(data);
        setUniverseId(data.id!);
      } catch (error) {
        console.error('유니버스 조회 실패:', error);
      }
    };

    fetchUniverse();
  }, [universeIdParsed]);

  // null 체크 후 반환
  if (!universeInfo) return null;

  // description 계산
  const description = universeInfo.description ?? '';
  const isLong = description.length > maxDescriptionLength;
  const shortDesc = description.slice(0, maxDescriptionLength);

  // JSX 반환
  return (
    <div className="w-full flex flex-col gap-1 text-gray-800 px-2">
      {/* 제목 */}
      <span className="text-2xl font-bold">{universeInfo.title}</span>

      {/* 메타 정보 */}
      <div className="flex flex-wrap justify-between gap-4 text-gray-5400">
        <span className="text-lg font-bold">{universeInfo.author}</span>
        <div className="flex gap-4 self-end">
          <div className="flex flex-col gap-1 justify-center text-center text-xs">
            <span className='text-xs'>조회수 {universeInfo.view}회</span>
            <span>{convertUnixToDate(universeInfo.createdTime).default}</span>
          </div>
          <button className="flex flex-col items-center gap-1.5">
            <IoIosHeartEmpty size={16} color="red" />
            <span className='text-xs'>{universeInfo.like}</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <IoShareSocialOutline size={16} />
            <div className='text-xs'>공유</div>
          </button>
        </div>
      </div>

      {/* 해시태그 */}
      <div className="flex flex-wrap gap-2 text-sm">
        {universeInfo.hashtags.map((tag: string, idx: number) => (
          <span key={idx}>#{tag}</span>
        ))}
      </div>

      {/* 설명 */}
      <div className="text-base leading-relaxed whitespace-pre-wrap">
        {isLong && !showMore ? `${shortDesc}...` : description}
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
