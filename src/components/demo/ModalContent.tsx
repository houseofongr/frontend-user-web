import WaveformWithAudio from "../Waveform";

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

export default function ModalContent({ data }: { data: PreviewContentProp }) {
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
            className="absolute bg-cover bg-center w-[300px] h-[300px] md:w-[420px] md:h-[400px]"
            style={{
              backgroundImage: 'url("/images/notepad/notepad_5.png")',
            }}
          />
          <div className="relative flex items-center text-gray-700 w-[250px] md:w-[400px] min-h-[300px] md:h-[400px]">
            <div className={`flex flex-col w-full ${description.length > 230 ? "md:px-5" : "md:px-10 "} `}>
              <h2
                className={`leading-4.5 md:leading-6 text-2xl md:text-3xl ${
                  description.length > 230 ? "pt-10" : "pt-10 pb-3"
                } `}
                style={{ fontFamily: "SangSangShinb7" }}
              >
                제목 : {name}
              </h2>
              <div
                className={`leading-4 md:leading-5.5 text-lg md:text-2xl min-h-[120px] max-h-fit ${
                  description.length > 230 ? "md:max-h-fit" : "md:max-h-[260px] "
                } pt-3 `}
                style={{ fontFamily: "SangSangShinb7", whiteSpace: "pre-wrap" }}
              >
                {description}
                {/* description - 255자 테스트 */}
                {/* 도자기를 굽는 데는 1,000°C 이상의 고온이 필요한데, 이를 위한 장치가 가마라 불리는 것으로, 최소한의
                연료를 사용하여 최고의 온도를 얻을 수 있도록 고안되어 있다. 도자기를 굽는 데는 1,000°C 이상의 고온이
                필요한데, 이를 위한 장치가 가마라 불리는 것으로, 최소한의 연료를 사용하여 최고의 온도를 얻을 수 있도록
                고안되어 있다.. 도자기를 
                굽는 데는 1,000°C 이상의 고온이 필요한데,이를 위한 장치가 가마라 불리는 것으로,
                최소한의연료. */}
              </div>
              <p className="text-right md:text-2xl pb-3" style={{ fontFamily: "SangSangShinb7" }}>
                {updatedDate}
              </p>
            </div>
          </div>
        </div>
        {/* 파형 섹션 */}
        <div className="w-full lg:w-1/2 flex-center sm:mt-14 md:mt-10 lg:mt-0">
          <WaveformWithAudio
            audioUrl={`https://dev.file.archiveofongr.site/public/audios/${audioFileId}`}
            audioTitle={name}
          />
        </div>
      </div>
    </div>
    // <div className="flex flex-col gap-5 text-black min-h-[400px] sm:min-h-[550px] min-w-[330px] md:min-w-[500px] lg:min-w-[900px]">
    //   {/* 로고 */}
    //   <div className="flex px-5 py-3 md:py-5 md:px-10 mt-2 gap-1 items-end">
    //     <img src="/images/logo/logo_for-dark-bg.png" alt="아카이브 오브 옹알 로고" width={30} height={30} />
    //     <span className="text-xs text-gray-300">아카이브 오브 옹알</span>
    //   </div>

    //   <div className="pt-0 flex flex-col lg:flex-row">
    //     {/* 포스트잇 */}
    //     <div className="w-full lg:w-1/2 relative flex-center ">
    //       <div
    //         className="absolute bg-cover bg-center w-[300px] h-[280px] md:w-[400px] md:h-[400px]"
    //         style={{
    //           backgroundImage: 'url("/images/notepad/notepad_5.png")',
    //         }}
    //       />

    //       {/* 포스트잇에 들어가는 컨텐츠의 높이는 포스트잇 이미지 width  - 50px , 포스트잇 height 동일 */}
    //       <div className="relative flex items-center text-gray-700 w-[250px] md:w-[400px] min-h-[280px] md:h-[400px]">
    //         <div className="flex flex-col w-full  md:px-10">
    //           <h2
    //             className="leading-4.5 md:leading-6 text-2xl md:text-3xl pt-10"
    //             style={{ fontFamily: "SangSangShinb7" }}
    //           >
    //             제목 : {name}
    //           </h2>
    //           <p
    //             className="leading-4.5 md:leading-6 text-lg md:text-2xl min-h-[100px] max-h-[300px] md:max-h-[200px]  pt-3 "
    //             style={{ fontFamily: "SangSangShinb7" }}
    //           >
    //             {description}

    //             {/* description - 255자 테스트 */}
    //             {/* 도자기를 굽는 데는 1,000°C 이상의 고온이 필요한데, 이를 위한 장치가 가마라 불리는 것으로, 최소한의
    //             연료를 사용하여 최고의 온도를 얻을 수 있도록 고안되어 있다. 도자기를 굽는 데는 1,000°C 이상의 고온이
    //             필요한데, 이를 위한 장치가 가마라 불리는 것으로, 최소한의 연료를 사용하여 최고의 온도를 얻을 수 있도록
    //             고안되어 있다.. 도자기를 굽는 데는 1,000°C 이상의 고온이 필요한데,이를 위한 장치가 가마라 불리는 것으로,
    //             최소한의연료. */}
    //           </p>
    //           <p className="text-right md:text-2xl p-2" style={{ fontFamily: "SangSangShinb7" }}>
    //             {updatedDate}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     {/* 파형 섹션 */}
    //     <div className="w-full lg:w-1/2 flex-center sm:mt-14 md:mt-10 lg:mt-0">
    //       <WaveformWithAudio
    //         audioUrl={`https://dev.file.archiveofongr.site/public/audios/${audioFileId}`}
    //         audioTitle={name}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
