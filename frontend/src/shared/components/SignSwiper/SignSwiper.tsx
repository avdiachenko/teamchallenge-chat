import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import signImage from "../../assets/images/signImage.jpg";
import signImage1 from "../../assets/images/signImage1.jpg";
import signImage2 from "../../assets/images/signImage2.jpg";
import ArrowLeft from "./icons/ArrowLeft.svg";
import ArrowRight from "./icons/ArrowRight.svg";
import styles from "./SignSwiper.module.css";

export function SignSwiper() {
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
        <SwiperSlide className={styles.slide}>
          <img src={signImage} alt="complex" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src={signImage1} alt="complex 1" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src={signImage2} alt="complex 2" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
