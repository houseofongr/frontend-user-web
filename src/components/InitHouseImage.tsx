import clsx from "clsx";

type InitHouseProp = {
  clickable?: boolean;
  imgType: "public" | "private";
};
const privateInitImage = "/images/house/AOO_INIT_HOUSE_GRAY.png";
const publicInitImage = "/images/house/AOO_INIT_HOUSE_ORANGE.png";

export default function InitHouseImage({ clickable = false, imgType }: InitHouseProp) {
  return (
    <div className={clsx({ "cursor-pointer animate-pulse": clickable })}>
      <img
        src={imgType === "private" ? privateInitImage : publicInitImage}
        alt="init-home"
        // width={220}
        // height={220}
        className="w-32 md:w-40 lg:w-44 xl:w-[200px] h-auto"
      />
    </div>
  );
}
