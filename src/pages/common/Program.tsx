import { programImages } from "../../constants/programProgressOrder";

export default function ProgramPage() {
  return (
    <div className="py-10">
      {/* <p className="text-center text-xl  mb-6">제목</p> */}
      <ProgramImages images={programImages} />
    </div>
  );
}

type ProgramImageProp = {
  images: { src: string; caption: string }[];
};

const ProgramImages = ({ images }: ProgramImageProp) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 p-10 max-w-2xl mx-auto">
      {images.map((item, index) => (
        <li key={index} className="flex flex-col items-center">
          <img src={item.src} alt={`program-progress-${index + 1}`} className="w-full aspect-square object-cover" />
          <h1 className="mt-2 text-center text-sm">{item.caption}</h1>
        </li>
      ))}
    </ul>
  );
};
