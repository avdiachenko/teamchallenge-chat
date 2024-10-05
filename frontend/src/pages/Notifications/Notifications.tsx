import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import { NewsMenu } from "../../widgets/NewsMenu/NewsMenu";
import { NotificationCard } from "./NotificationCard/NotificationCard";
import styles from "./Notifications.module.css";
import { Notification } from "./notifications.types";

const notifications: Notification[] = [
  {
    text: "We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids!",
    type: "Events",
    residential_complex: "Квартира 3",
    updatedAt: "2024-06-20T15:39:24.000Z",
  },
  {
    text: "Due to scheduled power outages, there will be a temporary electricity shutdown in sections 5 to 15 from 4:00 PM to 9:00 PM",
    type: "Emergency messages",
    residential_complex: "Квартира 3",
    updatedAt: "2024-07-20T15:39:24.000Z",
  },
  {
    text: "We remind you that it's time to make the September payments for the services of the maintenance company and security. Please make the payment as soon as possible to avoid any outstanding balances.",
    type: "Payments",
    residential_complex: "Квартира 3",
    updatedAt: "2024-08-20T15:39:24.000Z",
  },
  {
    text: "Due to scheduled power outages, there will be a temporary electricity shutdown in sections 5 to 15 from 4:00 PM to 9:00 PM",
    type: "Emergency messages",
    residential_complex: "Квартира 3",
    updatedAt: "2024-09-20T15:39:24.000Z",
  },
  {
    text: "We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances.",
    type: "Events",
    residential_complex: "Квартира 3",
    updatedAt: "2024-10-05T15:39:24.000Z",
  },
  {
    text: "Due to scheduled power outages, there will be a temporary electricity shutdown in sections 5 to 15 from 4:00 PM to 9:00 PM",
    type: "Emergency messages",
    residential_complex: "Квартира 3",
    updatedAt: "2024-07-06T15:39:24.000Z",
  },
  {
    text: "We remind you that it's time to make the September payments for the services of the maintenance company and security. Please make the payment as soon as possible to avoid any outstanding balances.",
    type: "Payments",
    residential_complex: "Квартира 3",
    updatedAt: "2024-08-20T15:39:24.000Z",
  },
  {
    text: "We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances. We invite you and your children to a festive gathering to celebrate a birthday at 12:00 p.m at the main playground. A fun foam party awaits the kids! In the meantime, we encourage you to make the payment as soon as possible to avoid any outstanding balances.",
    type: "Events",
    residential_complex: "Квартира 3",
    updatedAt: "2024-10-05T15:39:24.000Z",
  },
];

export function Notifications() {
  // const { data: notifications } = useApi<Notification[]>("/notifications");

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const message = e.currentTarget.value;
      console.log(message);
      e.currentTarget.value = "";
    }
  };

  return (
    <>
      <AsideMenu />
      <Header title="Notifications" />
      <div className={styles.container}>
        <div className={styles.content}>
          <NewsMenu />

          <div className={styles.wrapper}>
            <div className={styles.notificationList}>
              {notifications.map((notification, index) => (
                <NotificationCard key={index} notification={notification} />
              ))}
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder={"Type your message here"}
                onKeyDown={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
