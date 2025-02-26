import { programImages } from "../../constants/programProgressOrder";

export default function ProgramPage() {
  return (
    <div className="py-10 w-full flex flex-col items-center ">
      <section className="w-[60%] ">
        <span className="text-xl md:text-2xl">프로그램 </span>
        <p className="text-sm md:text-base font-extralight mb-5">
          아카이브 오브 옹알의 프로그램 순서는 아래와 같이 진행됩니다.
        </p>
      </section>
      <ProgramImages images={programImages} />
    </div>
  );
}

type ProgramImageProp = {
  images: { src: string; caption: string }[];
};

const ProgramImages = ({ images }: ProgramImageProp) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 max-w-2xl mx-auto">
      {images.map((item, index) => (
        <li key={index} className="flex flex-col items-center">
          <img
            src={item.src}
            alt={`program-progress-${index + 1}`}
            className="w-1/2 md:w-full aspect-square object-cover"
          />
          <p className="mt-2 text-center text-sm">{item.caption}</p>
        </li>
      ))}
    </ul>
  );
};
