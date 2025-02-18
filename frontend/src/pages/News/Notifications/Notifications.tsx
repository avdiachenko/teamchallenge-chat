import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../entities/user/user.store";
import useApi from "../../../shared/api/useApi";
import { Spinner } from "../../../shared/components/Spinner/Spinner";
import { NotificationCard } from "./NotificationCard/NotificationCard";
import { NotificationInput } from "./NotificationInput/NotificationInput";
import styles from "./Notifications.module.css";
import { Notification } from "./notifications.types";

export function Notifications({
  selectedSection,
  selectedComplex,
}: {
  selectedSection: string | null;
  selectedComplex: string | null;
}) {
  const { user } = useUserStore();
  const [limit, setLimit] = useState(7);
  const [isInited, setIsInited] = useState(false);
  const url = `/notifications/${selectedComplex}?builsing_id=${selectedSection}&limit=${limit}&page=1`;
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
    </>
  );
}
