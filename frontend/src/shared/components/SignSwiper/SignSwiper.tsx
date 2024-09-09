import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import signImage from "../../assets/images/signImage.jpg";
import signImage1 from "../../assets/images/signImage1.jpg";
import signImage2 from "../../assets/images/signImage2.jpg";
import styles from "./SignSwiper.module.css";

export function SignSwiper() {
  return (
    <Swiper navigation={true} modules={[Navigation]} className={styles.swiper}>
      <SwiperSlide className={styles.slide}>
        <img src={signImage} alt="logo" className={styles.logo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <img src={signImage1} alt="logo" className={styles.logo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <img src={signImage2} alt="logo" className={styles.logo} />
      </SwiperSlide>
    </Swiper>
  );
}
