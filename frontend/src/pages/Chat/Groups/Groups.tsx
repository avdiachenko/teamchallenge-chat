import styles from "./Groups.module.css";

const groupsArray = [
  { title: "Group 1", img: "img.png", members: 599 },
  { title: "Group 2", img: "img.png", members: 255 },
  { title: "Group 3", img: "img.png", members: 10 },
  { title: "Group 4", img: "img.png", members: 58 },
  { title: "Group 5", img: "img.png", members: 35 },
];

export function Groups() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Groups</span>

      <div className={styles.wrapper}>
        {groupsArray.map((group) => (
          <div className={styles.card}>
            <img src={group.img} alt={group.title} className={styles.cardImg} />
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>{group.title}</span>
              <span className={styles.cardMembers}>{group.members} members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
