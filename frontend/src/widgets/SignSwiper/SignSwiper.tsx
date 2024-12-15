import "swiper/css";
import "swiper/css/navigation";

import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { fetchResidentialComplexList } from "@/shared/api/residential-complex-list";

import ArrowLeft from "./icons/ArrowLeft.svg";
import ArrowRight from "./icons/ArrowRight.svg";
import styles from "./SignSwiper.module.css";

export const SignSwiper = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["residential_complex_list"],
    queryFn: fetchResidentialComplexList,
  });

  const swiperNavNextRef = useRef(null);
  const swiperNavPrevRef = useRef(null);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.prevButton} ref={swiperNavPrevRef} title="Prev button">
        <img src={ArrowLeft} alt="next Button" />
      </button>
      <button className={styles.nextButton} ref={swiperNavNextRef} title="Next button">
        <img src={ArrowRight} alt="prev Button" />
      </button>

      <Swiper
        slidesPerView={"auto"}
        modules={[Navigation]}
        grabCursor={true}
        navigation={{ prevEl: swiperNavPrevRef.current, nextEl: swiperNavNextRef.current }}
        className={styles.swiper}
      >
        {data
          ?.map((complex) => complex.images)
          .flat()
          .map((img) => (
            <SwiperSlide className={styles.slide} key={img}>
              <img src={img} alt="complex" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
