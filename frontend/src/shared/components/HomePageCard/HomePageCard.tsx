import React from "react";
import styles from "./HomePageCard.module.css";
import accept from "./Tick.svg";

type HomePageCardProps = {
  title: string;
  location?: { ltd: number; lng: number } | undefined;
  img: string;
  parking: boolean;
  security: boolean;
  accessControl: boolean;
  concierge: boolean;
  playground: boolean;
  closedArea: boolean;
  video: boolean;
};

export const HomePageCard: React.FC<HomePageCardProps> = ({
  title,
  location,
  img,
  parking,
  security,
  accessControl,
  concierge,
  playground,
  closedArea,
  video,
}) => {
  const { ltd, lng } = location || {};
  return (
    <div className={styles.home_page_card}>
      <div>
        <img className={styles.card_img} src={img} alt="" />
        <h1 className={styles.card_title}>{title}</h1>
        <h2 className={styles.card_subtitle}>
          Location:{ltd}, {lng}
        </h2>
      </div>
      <div className={styles.card_info}>
        {parking && (
          <span>
            <img src={accept} alt="" /> Parking
          </span>
        )}
        {security && (
          <span>
            <img src={accept} alt="" /> Security
          </span>
        )}
        {accessControl && (
          <span>
            {" "}
            <img src={accept} alt="" />
            Access control
          </span>
        )}
        {concierge && (
          <span>
            {" "}
            <img src={accept} alt="" />
            Concierge service
          </span>
        )}
        {playground && (
          <span>
            {" "}
            <img src={accept} alt="" />
            Playgrounds
          </span>
        )}
        {closedArea && (
          <span>
            {" "}
            <img src={accept} alt="" />
            Closed area
          </span>
        )}
        {video && (
          <span>
            {" "}
            <img src={accept} alt="" />
            Video surveillance
          </span>
        )}
      </div>
    </div>
  );
};
