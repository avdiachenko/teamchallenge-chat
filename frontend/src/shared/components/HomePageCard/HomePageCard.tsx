import React from "react";
import styles from "./HomePageCard.module.css";

type HomePageCardProps = {
  title: string;
  location: string;
  img: string;
};

export const HomePageCard: React.FC<HomePageCardProps> = ({ title, location, img }) => {
  return (
    <div className={styles.home_page_card}>
      <div>
        <img src={img} alt="" />
        <h1 className={styles.card_title}>{title}</h1>
        <h2 className={styles.card_subtitle}>Location:{location}</h2>
      </div>
      <div className={styles.card_info}>
        <span>Parking</span>
        <span>Security</span>
        <span>Access control</span>
        <span>Concierge service</span>
        <span>Playgrounds</span>
        <span>Closed area</span>
        <span>Video surveillance</span>
      </div>
    </div>
  );
};
