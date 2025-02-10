import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../entities/user/user.store";
import useApi from "../../shared/api/useApi";
import { Spinner } from "../../shared/components/Spinner/Spinner";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { NewsMenu } from "../../widgets/NewsMenu/NewsMenu";
import { NotificationCard } from "./NotificationCard/NotificationCard";
import { NotificationInput } from "./NotificationInput/NotificationInput";
import styles from "./Notifications.module.css";
import { Notification } from "./notifications.types";
import { NotificationsSelector } from "./NotificationsSelector/NotificationsSelector";

export function Notifications() {
  const { user } = useUserStore();
  const [selectedComplex, setSelectedComplex] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [limit, setLimit] = useState(7);
  const [isInited, setIsInited] = useState(false);

  const url = `/notifications/${setSelectedComplex}?builsing_id=${setSelectedSection}&limit=${limit}&page=1`;
  const { data: notifications, isLoading } = useApi<Notification[]>(
    selectedSection || selectedComplex ? url : null
  );
  const notificationListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (px?: number) => {
    const notificationListCurrent = notificationListRef.current;

    if (notificationListCurrent) {
      if (px) notificationListCurrent.scrollTo(0, px);
      else notificationListCurrent.scrollTop = notificationListCurrent.scrollHeight;
    }
  };

  useEffect(() => {
    setLimit(7);
  }, [selectedComplex, selectedSection]);

  useEffect(() => {
    if (notifications && !isInited) {
      scrollToBottom();
      setIsInited(true);
    }

    if (notifications && isInited) {
      scrollToBottom(150);
    }
  }, [isInited, notifications]);

  useEffect(() => {
    const notificationListCurrent = notificationListRef.current;
    const onScrollToTopReqest = () => {
      if (notificationListCurrent && notificationListCurrent.scrollTop === 0) {
        setLimit((prev) => prev + 3);
      }
    };

    if (notificationListCurrent) {
      notificationListCurrent.addEventListener("scroll", onScrollToTopReqest);
    }

    return () => {
      if (notificationListCurrent) {
        notificationListCurrent.removeEventListener("scroll", onScrollToTopReqest);
      }
    };
  }, [limit]);
  return (
    <>
      <AsideMenu />
      <Header title="Notifications" />
      <div className={styles.container}>
        <NotificationsSelector
          selectedComplex={selectedComplex}
          selectedSection={selectedSection}
          setSelectedComplex={setSelectedComplex}
          setSelectedSection={setSelectedSection}
        />
        <div className={styles.content}>
          <NewsMenu />

          <div className={styles.wrapper}>
            <div className={styles.notificationList} ref={notificationListRef}>
              {isLoading && <Spinner />}
              {notifications &&
                [...notifications]
                  .reverse()
                  .map((notification, index) => (
                    <NotificationCard key={index} notification={notification} />
                  ))}
            </div>

            {user?.is_admin && <NotificationInput />}
          </div>
        </div>
      </div>
    </>
  );
}
