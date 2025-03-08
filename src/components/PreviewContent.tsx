import API_CONFIG from "../config/api";
import { formatDate } from "../utils/formatDate";
import WaveformWithAudio from "./Waveform";

type PreviewContent = {
  data: {
    name: string;
    description: string;
    createdDate: string;
    updatedDate: string;
    audioFileId: number;
  };
};

export default function PreviewContent({ data }: PreviewContent) {
  const { name, description, audioFileId, updatedDate } = data;

  return (
    <div className="flex flex-col gap-5 text-black min-h-[400px] sm:min-h-[550px] min-w-[330px] md:min-w-[500px] lg:min-w-[900px]">
      <div className="flex px-5 py-3 md:py-5 md:px-10 mt-2 gap-1 items-end">
        <img src="/images/logo/logo_for-dark-bg.png" alt="아카이브 오브 옹알 로고" width={30} height={30} />
        <span className="text-xs text-gray-300">아카이브 오브 옹알</span>
      </div>

      <div className="pt-0 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 relative flex-center ">
          <div
            className="absolute bg-cover bg-center w-[300px] h-[280px] md:w-[400px] md:h-[400px]"
            style={{
              backgroundImage: 'url("/images/notepad/notepad_5.png")',
            }}
          />
          <div className="relative flex items-center text-gray-700 w-[250px] md:w-[400px] min-h-[280px] md:h-[400px]">
            <div className="flex flex-col w-full  md:px-10">
              <h2
                className="leading-4.5 md:leading-6 text-2xl md:text-3xl pt-10"
                style={{ fontFamily: "SangSangShinb7" }}
              >
                제목 : {name}
              </h2>
              <p
                className="leading-4.5 md:leading-6 text-lg md:text-2xl min-h-[100px] max-h-[300px] md:max-h-[200px]  pt-3 "
                style={{ fontFamily: "SangSangShinb7" }}
              >
                {description}
                {/* description - 255자 테스트 */}
                {/* 도자기를 굽는 데는 1,000°C 이상의 고온이 필요한데, 이를 위한 장치가 가마라 불리는 것으로, 최소한의
                연료를 사용하여 최고의 온도를 얻을 수 있도록 고안되어 있다. 도자기를 굽는 데는 1,000°C 이상의 고온이
                필요한데, 이를 위한 장치가 가마라 불리는 것으로, 최소한의 연료를 사용하여 최고의 온도를 얻을 수 있도록
                고안되어 있다.. 도자기를 굽는 데는 1,000°C 이상의 고온이 필요한데,이를 위한 장치가 가마라 불리는 것으로,
                최소한의연료. */}
              </p>
              <p className="text-right md:text-2xl p-2" style={{ fontFamily: "SangSangShinb7" }}>
                {formatDate(updatedDate)}
              </p>
            </div>
          </div>
        </div>
        {/* 파형 섹션 */}
        <div className="w-full lg:w-1/2 flex-center sm:mt-14 md:mt-10 lg:mt-0">
          <WaveformWithAudio audioUrl={`${API_CONFIG.PRIVATE_AUDIO_LOAD_API}/${audioFileId}`} audioTitle={name} />
        </div>
      </div>
    </div>
  );
}
