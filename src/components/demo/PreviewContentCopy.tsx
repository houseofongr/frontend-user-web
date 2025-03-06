// import WaveformWithAudio from "../Waveform";

// type PreviewContentProp = {
//   id: number;
//   name: string;
//   description: string;
//   imgSrc: string;
//   soundSrc: string;
//   imageId: number;
//   audioFileId: number;
//   updatedDate: string;
//   width?: number;
//   height?: number;
//   x?: number;
//   y?: number;
//   z?: number;
// };

// export default function PreviewContentCopy({ data }: { data: PreviewContentProp }) {
//   const { name, description, updatedDate, audioFileId } = data;
//   return (
//     <div className="flex flex-col md:flex-row gap-5 text-black px-7 min-h-[550px]  md:min-w-[800px] lg:min-w-[1000px]">
//       <div className="fixed mt-2 flex  gap-2 items-end">
//         <img src="/images/logo/logo_for-dark-bg.png" alt="아카이브 오브 옹알 로그" width={30} height={30} />
//         <span className="text-xs text-gray-300">아카이브 오브 옹알</span>
//       </div>

//       <div className="w-1/2 relative flex-center ">
//         <div
//           className="absolute bg-cover bg-center"
//           style={{ backgroundImage: 'url("/images/notepad/notepad_5.png")', width: 435, height: 430 }}
//         />

//         <div className="relative  flex items-center px-13 pt-5 text-gray-700 w-full h-[400px] ">
//           <div className="gap-3 flex flex-col ">
//             <h2 className="text-4xl " style={{ fontFamily: "SangSangShinb7" }}>
//               제목 : {name}
//             </h2>
//             <p
//               className="leading-tight break-words text-2xl w-full min-h-[140px] "
//               style={{ fontFamily: "SangSangShinb7" }}
//             >
//               {description}
//             </p>
//             <p className="text-2xl text-end pr-2 w-[350px] " style={{ fontFamily: "SangSangShinb7" }}>
//               {updatedDate}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 파형 섹션 */}
//       <div className="w-1/2 flex-center  ">
//         {/* <WaveformWithAudio audioUrl={soundSrc} audioTitle={name} /> */}
//         <WaveformWithAudio
//           audioUrl={`https://dev.file.archiveofongr.site/public/audios/${audioFileId}`}
//           audioTitle={name}
//         />
//         {/* <WaveformWithAudio audioUrl={`${API_CONFIG.PUBLIC_AUDIO_LOAD_API}/${audioFileId}`} audioTitle={name} /> */}
//       </div>
//     </div>
//   );
// }

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

export default function PreviewContentCopy({ data }: { data: PreviewContentProp }) {
  const { name, audioFileId } = data;
  return (
    <div className="flex flex-col gap-5 text-black min-h-[400px] sm:min-h-[550px] min-w-[280px] md:min-w-[500px] lg:min-w-[900px]">
      {/* 로고 */}
      <div className="flex p-2 md:p-4 mt-2 gap-1 items-end ">
        <img src="/images/logo/logo_for-dark-bg.png" alt="아카이브 오브 옹알 로고" width={30} height={30} />
        <span className="text-xs text-gray-300">아카이브 오브 옹알</span>
      </div>
      {/*  */}
      <div className="pt-0 flex flex-col lg:flex-row border">
        {/* 포스트잇 */}
        <div className="w-full lg:w-1/2 relative flex-center border border-white">
          <div
            className="absolute bg-cover bg-center w-[200px] h-[200px] md:w-[400px] md:h-[400px]"
            style={{
              backgroundImage: 'url("/images/notepad/notepad_5.png")',
              // width: "80%",
              // width: 350, // 모바일 : 200 // 태블릿&데스크탑: 400
              // height: 350,
            }}
          />

          {/* 포스트잇에 들어가는 컨텐츠의 높이는 포스트잇 이미지 widht + 10px */}
          <div className="relative flex items-center text-gray-700 w-full h-[210px] md:h-[410px]">
            <div className="gap-3 flex flex-col">
              <h2 className="text-xl sm:text-2xl" style={{ fontFamily: "SangSangShinb7" }}>
                {/* 제목 : {name} */}
              </h2>
              <p
                className="leading-tight break-words text-xl w-full min-h-[140px]"
                style={{ fontFamily: "SangSangShinb7" }}
              >
                {/* {description} */}
              </p>
              <p className="text-right text-lg pr-2 w-full md:w-[350px]" style={{ fontFamily: "SangSangShinb7" }}>
                {/* {updatedDate} */}
              </p>
            </div>
          </div>
        </div>
        {/* 파형 섹션 */}
        <div className="w-full lg:w-1/2 flex-center sm:mt-14 md:mt-10 lg:mt-0 border border-white">
          <WaveformWithAudio
            audioUrl={`https://dev.file.archiveofongr.site/public/audios/${audioFileId}`}
            audioTitle={name}
          />
        </div>
      </div>
    </div>
  );
}
