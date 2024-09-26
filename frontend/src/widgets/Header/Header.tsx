import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { UserPanel } from "./UserPanel/UserPanel";
import * as images from "../AsideMenu/icons/index";
import eng from "./eng.svg";
import ua from "./ua.svg";
import openIcon from "./openIcon.svg";

type HeaderProps = {
  title: string;
};

const languages = [
  { value: "en", label: "Eng", icon: eng },
  { value: "uk", label: "Ukr", icon: ua },
];

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: { value: string; label: string; icon: string }) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.header_title_logo}>
        <Link className={styles.header_logo} to="/">
          <img src={images.Logo} alt="Logo" />
        </Link>
        <span className={styles.header_title}>{title}</span>
      </div>
      <div className={styles.links}>
        <div className={styles.custom_select} ref={selectRef}>
          <div className={styles.selected_language} onClick={() => setIsOpen((prev) => !prev)}>
            <img src={selectedLanguage.icon} alt={selectedLanguage.label} />
            <span>{selectedLanguage.label}</span>
            <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
              <img src={openIcon} alt="" />
            </span>
          </div>
          <ul className={`${styles.language_list} ${isOpen ? styles.show : ""}`}>
            {languages.map((language) => (
              <li
                key={language.value}
                onClick={() => handleLanguageChange(language)}
                className={styles.language_item}
              >
                <img src={language.icon} alt={language.label} />
                {language.label}
              </li>
            ))}
          </ul>
        </div>
        <UserPanel />
      </div>
    </header>
  );
};
