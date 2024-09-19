import styles from "./PrivateMessages.module.css";

const messagesArray = [
  { name: "Jacob Jones", img: "img.png", status: "Good afternoon. Please kindly kee..." },
  { name: "Robert Fox", img: "img.png", status: "hello how are you" },
  { name: "Kathryn Murphy", img: "img.png", status: "Good afternoon." },
  { name: "Hello Mary", img: "img.png", status: "Good afternoon." },
  { name: "David Jones", img: "img.png", status: "Good afternoon." },
  { name: "Elizabeth Murphy", img: "img.png", status: "Good afternoon." },
];

export function PrivateMessages() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Private Messages</span>

      <div className={styles.wrapper}>
        {messagesArray.map((message) => (
          <div className={styles.card}>
            <img src={message.img} alt={message.name} className={styles.cardImg} />
            <div className={styles.cardInfo}>
              <span className={styles.cardName}>{message.name}</span>
              <span className={styles.cardStatus}>{message.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
