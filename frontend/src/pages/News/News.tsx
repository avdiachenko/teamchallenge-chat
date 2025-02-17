import { FC, useState } from "react";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { NewsMenu } from "../../widgets/NewsMenu/NewsMenu";
import { NewsSelector } from "./NewsSelector/NewsSelector";
import styles from "./News.module.css";
import { Votings } from "../Votings/Votings";
import { Notifications } from "./Notifications/Notifications";

export const News: FC = () => {
  const [selectedComplex, setSelectedComplex] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [checked, setChecked] = useState<string>("");
  const handleOnClick = (e: React.MouseEvent): void => {
    setChecked(e.currentTarget.innerHTML);
  };
  // const url = `/notifications/${selectedComplex}?builsing_id=${selectedSection}&limit=${limit}&page=1`;
  // const { data: notifications, isLoading } = useApi<Notification[]>(
  //   selectedSection || selectedComplex ? url : null
  // );

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
          <NewsMenu onClick={handleOnClick} />

          <div className={styles.wrapper}>
            {checked.toLowerCase() === "notifications" && <Notifications />}
            {checked.toLowerCase() === "votings" && (
              <div className={styles.list}>
                <Votings />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
