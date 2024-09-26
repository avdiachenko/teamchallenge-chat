import { HomePageCard } from "../../shared/components/HomePageCard/HomePageCard";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper/types";
import styles from "./Home.module.css";
import { BASE_URL } from "../../shared/constants/urls";
import { useEffect, useState } from "react";

interface ResidentialComplex {
  name: string;
  location: string;
  images: string;
  security: boolean;
  access_control: boolean;
  concierge: boolean;
  playground: boolean;
  closed_area: boolean;
  video_surveillance: boolean;
  parking: boolean;
  _id: string;
}

export function Home() {
  const [complex, setComplexes] = useState<ResidentialComplex[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/residential_complex`)
      .then((res) => res.json())
      .then((data) => {
        setComplexes(data);
      });
  }, []);
  const handleSlideChange = (swiper: SwiperType) => {
    const swiperWidth = swiper.width;
    const swiperLeftEdge = swiper.translate;

    swiper.slides.forEach((slide: HTMLElement) => {
      const slideLeft = slide.offsetLeft;
      const slideRight = slideLeft + slide.offsetWidth;
      if (
        slideLeft >= Math.abs(swiperLeftEdge) &&
        slideRight <= Math.abs(swiperLeftEdge) + swiperWidth
      ) {
        slide.style.opacity = "1";
        slide.style.transition = "1s all";
      } else {
        slide.style.transition = "1s all";
        slide.style.opacity = "0";
      }
    });
  };

  return (
    <div>
      <AsideMenu />
      <Header title="Residential Complexes" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h4 className={styles.main_page_info}>
            <strong>Horizon Development LLC</strong> is a construction company with over 15 years of
            experience. experience. Specializing in the creation of high-quality residential
            complexes focused and well-being. The company employs innovative architectural
            solutions, uses eco-friendly materials, and ensures quality control at all stages. It
            implements energy-efficient technologies and offers "smart homes," modern
            infrastructure, and green spaces.
          </h4>
          <div>
            <Swiper
              modules={[Pagination]}
              className={styles.home_page_cards}
              slidesPerView={4}
              pagination={{ clickable: true }}
              spaceBetween={90}
              onSlideChange={handleSlideChange}
              onSwiper={handleSlideChange}
            >
              {complex.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <HomePageCard
                      title={item.name}
                      location={item.location}
                      img={item.images.split(" ")[1]}
                      parking={item.parking}
                      security={item.security}
                      accessControl={item.access_control}
                      concierge={item.concierge}
                      playground={item.playground}
                      closedArea={item.closed_area}
                      video={item.video_surveillance}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
