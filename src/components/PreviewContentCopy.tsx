import WaveformWithAudio from "./Waveform";

type PreviewContentProp = {
  id: number;
  name: string;
  description: string;
  imgSrc: string;
  soundSrc: string;
  imageId: number;
  audioFileId: number;
  updatedDate: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  z?: number;
};

export default function PreviewContentCopy({ data }: { data: PreviewContentProp }) {
  const { name, description, updatedDate, audioFileId } = data;
  return (
    <div className="flex flex-col md:flex-row gap-5 text-black px-7 min-h-[550px]  md:min-w-[800px] lg:min-w-[1000px]">
      <div className="fixed mt-2 flex  gap-2 items-end">
        <img src="/images/logo/logo_for-dark-bg.png" alt="아카이브 오브 옹알 로그" width={30} height={30} />
        <span className="text-xs text-gray-300">아카이브 오브 옹알</span>
      </div>

      <div className="w-1/2 relative flex-center ">
        {/* 포스트잇 섹션 */}
        <div
          className="absolute bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/notepad/notepad_5.png")', width: 435, height: 430 }}
        />

        <div className="relative  flex items-center px-13 pt-5 text-gray-700 w-full h-[400px] ">
          <div className="gap-3 flex flex-col ">
            <h2 className="text-4xl " style={{ fontFamily: "SangSangShinb7" }}>
              제목 : {name}
            </h2>
            <p
              className="leading-tight break-words text-2xl w-full min-h-[140px] "
              style={{ fontFamily: "SangSangShinb7" }}
            >
              {description}
            </p>
            <p className="text-2xl text-end pr-2 w-[350px] " style={{ fontFamily: "SangSangShinb7" }}>
              {updatedDate}
            </p>
          </div>
        </div>
      </div>

      {/* 파형 섹션 */}
      <div className="w-1/2 flex-center  ">
        {/* <WaveformWithAudio audioUrl={soundSrc} audioTitle={name} /> */}
        {/* https://dev.file.archiveofongr.site/public/audios */}
        <WaveformWithAudio
          audioUrl={`https://dev.file.archiveofongr.site/public/audios/${audioFileId}`}
          audioTitle={name}
        />
        {/* <WaveformWithAudio audioUrl={`${API_CONFIG.PUBLIC_AUDIO_LOAD_API}/${audioFileId}`} audioTitle={name} /> */}
      </div>
    </div>
  );
}
