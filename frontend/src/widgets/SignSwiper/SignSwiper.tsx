import { memo, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ResidentialComplex } from "../../entities/residentialComplex/residentialComplex.types";
import useApi from "../../shared/api/useApi";
import ArrowLeft from "./icons/ArrowLeft.svg";
import ArrowRight from "./icons/ArrowRight.svg";
import styles from "./SignSwiper.module.css";

export const SignSwiper = memo(() => {
  const { data } = useApi<ResidentialComplex[]>("/complexes");
  const imgArr = data?.map((complex) => complex.images).flat();

  const swiperNavNextRef = useRef(null);
  const swiperNavPrevRef = useRef(null);

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
        {imgArr?.map((img) => (
          <SwiperSlide className={styles.slide} key={img}>
            <img src={img} alt="complex" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});
