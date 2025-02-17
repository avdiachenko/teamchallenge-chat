import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Не забудь импортировать стили Swiper
import { Swiper as SwiperClass } from "swiper/types";
import { Spinner } from "../../shared/components/Spinner/Spinner";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import apartments from "./apartments.svg";
import entrances from "./entrances.svg";
import floors from "./floors.svg";
import style from "./ResidentComplexInfo.module.css";
import sections from "./sections.svg";
import accept from "./Tick.svg";
import { BASE_URL } from "../../shared/constants/urls";

export const ResidentComplexInfo: React.FC = () => {
  type complexData = {
    _id: string;
    name: string;
    images: string[];
    parking: boolean;
    sections: number;
    video_surveillance: boolean;
    floors: number;
    entrances: number;
    description: string;
    concierge: boolean;
    security: boolean;
    closed_area: boolean;
    playground: boolean;
    apartments: number;
    access_control: boolean;
    location?: { ltd: number; lng: number } | undefined;
  };

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [complexData, setComplexData] = useState<complexData | null>(null);
  const { name } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/complexes/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setComplexData(data);
      });
  }, [name]);

  if (!complexData) return <Spinner />;

  return (
    <div>
      <AsideMenu />
      <Header title="Residential Complexes" />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.resident_complex}>
            <div className={style.resident_complex_gallery_block}>
              <Swiper
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                style={{ width: "600px", height: "361px" }}
              >
                {complexData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      style={{ width: "600px", height: "361px", borderRadius: "20px" }}
                      src={image}
                      alt="Thumb 1"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                slidesPerView={6}
                style={{ width: "600px", height: "92px", marginTop: "18px" }}
              >
                {complexData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      style={{ width: "92px", height: "92px", borderRadius: "8px" }}
                      src={image}
                      alt="Thumb 1"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={style.resident_complex_info}>
              <div className={style.resident_complex_info_title}>
                Residential Complex "{complexData.name}"
              </div>
              <div className={style.resident_complex_info_subtitle}>{complexData.description}</div>
              <div className={style.resident_complex_info_params}>
                <div className={style.resident_complex_info_param}>
                  <img src={floors} alt="" /> {complexData.floors} floors
                </div>
                <div className={style.resident_complex_info_param}>
                  <img src={entrances} alt="" /> {complexData.entrances} entrances
                </div>
                <div className={style.resident_complex_info_param}>
                  <img src={sections} alt="" /> {complexData.sections} sections
                </div>
                <div className={style.resident_complex_info_param}>
                  <img src={apartments} alt="" /> {complexData.apartments} apartments
                </div>
              </div>
              <div className={style.resident_complex_info_facilities}>
                {complexData.parking && (
                  <span>
                    <img src={accept} alt="" /> Parking
                  </span>
                )}
                <span>
                  <img src={accept} alt="" /> Entry control
                </span>
                {complexData.concierge && (
                  <span>
                    <img src={accept} alt="" /> Concierge service
                  </span>
                )}
                {complexData.video_surveillance && (
                  <span>
                    <img src={accept} alt="" /> Video surveillance
                  </span>
                )}
                {complexData.closed_area && (
                  <span>
                    <img src={accept} alt="" /> Closed area
                  </span>
                )}
                {complexData.security && (
                  <span>
                    <img src={accept} alt="" /> Security
                  </span>
                )}
                {complexData.playground && (
                  <span>
                    <img src={accept} alt="" /> Playgrounds
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={style.resident_complex_location}>
            <div className={style.resident_complex_location_title}>
              Location Residential Complex
            </div>
            <div className={style.resident_complex_location_subtitle}>{complexData.location}</div>
            <span className={style.map}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162757.83842281808!2d30.367544991978317!3d50.402137450280556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1729165464413!5m2!1sru!2sua"
                width="100%"
                height="400"
                loading="lazy"
              ></iframe>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
