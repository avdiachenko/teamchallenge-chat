import { Card } from "../utils/Card";
import styles from "./NewsItem.module.css";
const newsTitle = "Зелений куточок: Оновлення території житлового комплексу";
const NewsItem = () => {
  return (
    <Card title={newsTitle}>
      <div className={styles.text}>
        🌿 Роботи з благоустрою завершено! Свіжоскошений газон і щойно висаджені квіти роблять нашу
        ділянку ще затишнішою та зеленішою. Ці приємні зміни дарують красу та затишок усім
        мешканцям. 🌸 Запрошуємо прогулятися та насолодитися новою зеленню!
      </div>
    </Card>
  );
};

export default NewsItem;
