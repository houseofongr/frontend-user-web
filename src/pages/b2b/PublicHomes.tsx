import { Link } from "react-router-dom";
import { PUBLIC_HOMES } from "../../mock/publicHomes";
import PageLayout from "../../components/layout/PageLayout";

export default function PublicHomesPage() {
  return (
    <PageLayout>
      <section className="w-[70%] h-screen py-10 md:py-20">
        <h3 className="text-xl md:text-2xl">퍼블릭 홈 목록 (페이지 타이틀) </h3>
        <p className="text-sm md:text-base font-extralight mb-5">
          아카이브 오브 옹알과 협약을 맺고 프로그램을 진행한 기업 목록 입니다.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
          {PUBLIC_HOMES.map((home, index) => {
            return (
              <li key={index} className="flex flex-col p-1">
                <Link to={`/common/homes/${home.id}/demo`}>
                  <img src={home.thumbnailImg} />
                  <div className="mt-2">
                    <p>{home.brand}</p>
                    <p className="font-extralight text-sm md:text-base line-clamp-2">{home.brandIntroduce}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </PageLayout>
  );
}
