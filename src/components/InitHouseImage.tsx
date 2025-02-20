import clsx from "clsx";

type InitHouseProp = {
  clickable?: boolean;
};
export default function InitHouseImage({ clickable = false }: InitHouseProp) {
  return (
    <div className={clsx({ "cursor-pointer animate-pulse": clickable })}>
      <img
        src={"/images/house/AOO_INIT_HOUSE_GRAY.png"}
        alt="init-home"
        // width={220}
        // height={220}
        className="w-32 md:w-40 lg:w-44 xl:w-[200px] h-auto"
      />
    </div>
  );
}
