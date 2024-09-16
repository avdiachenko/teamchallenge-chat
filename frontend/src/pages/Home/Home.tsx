import { HomePageCard } from "../../shared/components/HomePageCard/HomePageCard";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Home.module.css";
import image from "./image.png";

export function Home() {
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
              spaceBetween={101}
            >
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <HomePageCard
                  title="Residential Complex Panorama"
                  location="Simferopolska, 2k, Dnipro, Dnipropetrovsk region "
                  img={image}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
