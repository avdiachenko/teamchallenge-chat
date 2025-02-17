import { Card } from "../utils/Card/Card";
import styles from "./NewsItem.module.css";
const newsTitle = "Зелений куточок: Оновлення території житлового комплексу";
const reactionButtons = [
  { id: 1, emoji: "❤️", count: 24 },
  { id: 2, emoji: "👍", count: 12 },
  { id: 3, emoji: "😁", count: 8 },
];
const NewsItem = () => {
  return (
    <Card title={newsTitle} reactionButtons={reactionButtons}>
      <div className={styles.text}>
        🌿 Роботи з благоустрою завершено! Свіжоскошений газон і щойно висаджені квіти роблять нашу
        ділянку ще затишнішою та зеленішою. Ці приємні зміни дарують красу та затишок усім
        мешканцям. 🌸 Запрошуємо прогулятися та насолодитися новою зеленню!
      </div>
    </Card>
  );
};

export default NewsItem;
