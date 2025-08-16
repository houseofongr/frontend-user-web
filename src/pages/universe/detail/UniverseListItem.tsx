import { useNavigate } from "react-router-dom";
import API_CONFIG from "../../../config/api";
import { formatRelativeDate } from "../../../utils/formatDate";
import { useUniverseStore } from "../../../hooks/admin/useUniverseStore";

interface UniverseListItemProps {
  id: number;
  thumbnailId: number;
  title: string;
  author: string;
  view?: number;
  createdTime?: number;
}

export default function UniverseListItem({
  id,
  thumbnailId,
  title,
  author,
  view,
  createdTime,
}: UniverseListItemProps) {
  const { setUniverseId, resetUniverseStore } = useUniverseStore();

  const navigate = useNavigate();

  const handleClick = () => {
    resetUniverseStore();
    setUniverseId(id);
    navigate(`/universe/${id}`);
  };
  return (
    <div
      className="flex flex-col p-2 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* 썸네일 */}
      <img
        src={`${API_CONFIG.PUBLIC_FILE_API}/${thumbnailId}`} // 썸네일 파일 경로
        alt={title}
        className="object-cover bg-gray-100 mb-1.5"
      />

      {/* 텍스트 정보 */}
      <div className="text-lg font-semibold leading-tight">{title}</div>
      <div className="text-sm text-gray-400 leading-tight">{author}</div>
      {(view !== undefined || createdTime !== undefined) && (
        <div className="text-sm text-gray-500 leading-tight">
          {view !== undefined && `조회수 ${view.toLocaleString()}회`}
          {view !== undefined && createdTime !== undefined && " · "}
          {createdTime !== undefined && formatRelativeDate(createdTime)}
        </div>
      )}
    </div>
  );
}
