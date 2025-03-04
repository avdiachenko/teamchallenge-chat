import { FC, useEffect, useState } from "react";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { NewsMenu } from "../../widgets/NewsMenu/NewsMenu";
import { NewsSelector } from "./NewsSelector/NewsSelector";
import styles from "./News.module.css";
import { Votings } from "./Votings/Votings";
import { Notifications } from "./Notifications/Notifications";
import NewsItem from "./NewsItem/NewsItem";
import { useSearchParams } from "react-router-dom";
import AddVotingsBtn from "./Votings/AddVotingsBtn";
import { useStore } from "../../store/store";
import ModalContainer from "../../widgets/Modal/Modal";
import { CreateVote } from "./CreateVote/CreateVote";

export const News: FC = () => {
  const { isModal, toggleModal } = useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedComplex, setSelectedComplex] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [checked, setChecked] = useState<string>("notifications");
  const handleOnClick = (e: React.MouseEvent): void => {
    setSearchParams({ checked: e.currentTarget.innerHTML });
  };
  useEffect(() => {
    setChecked(searchParams.get("checked") || "notifications");
  }, [searchParams]);
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
          <NewsMenu onClick={handleOnClick} checked={checked} />

          <div className={styles.wrapper} id="newsBox">
            {checked.toLowerCase() === "notifications" && (
              <Notifications selectedComplex={selectedComplex} selectedSection={selectedSection} />
            )}

            <div className={styles.list}>
              {checked.toLowerCase() === "votings" && <Votings />}
              {checked.toLowerCase() === "news" && <NewsItem />}
            </div>
            <AddVotingsBtn />
            <ModalContainer isModal={isModal} toggleModal={toggleModal}>
              <CreateVote />
            </ModalContainer>
          </div>
        </div>
      </div>
    </>
  );
};
