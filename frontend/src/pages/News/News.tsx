import { FC, useState } from "react";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { NewsMenu } from "../../widgets/NewsMenu/NewsMenu";
import { NewsSelector } from "./NewsSelector/NewsSelector";
import styles from "./News.module.css";
import { Votings } from "../Votings/Votings";

export const News: FC = () => {
  const [selectedComplex, setSelectedComplex] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <>
      <AsideMenu />
      <Header title="News" />
      <div className={styles.container}>
        <NewsSelector
          selectedComplex={selectedComplex}
          selectedSection={selectedSection}
          setSelectedComplex={setSelectedComplex}
          setSelectedSection={setSelectedSection}
        />
        <div className={styles.content}>
          <NewsMenu />

          <div className={styles.wrapper}>
            <div className={styles.list}>
              <Votings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
