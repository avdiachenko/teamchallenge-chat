import { useState, FC } from "react";
import styles from "./Votings.module.css";
import { Card } from "../utils/Card";
// Тип для варіантів голосування
interface PollOption {
  id: number;
  text: string;
  votes: number;
}
const votingsTitle =
  "Пропонуємо проголосувати встановлення в будинку відеодомофону для посилення безпеки.";
export const Votings: FC = () => {
  const initialOptions: PollOption[] = [
    { id: 1, text: "Встановити відеодомофон", votes: 85.71 },
    { id: 2, text: "Зберегти діючу систему внутрішнього зв'язку", votes: 10.14 },
    { id: 3, text: "Утриматись", votes: 4.71 },
  ];

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [pollResults, setPollResults] = useState<PollOption[]>(initialOptions);

  const handleVote = (id: number) => {
    setSelectedOption(id);
    setPollResults((prev) =>
      prev.map((option) => (option.id === id ? { ...option, votes: option.votes + 1 } : option))
    );
  };

  return (
    <Card title={votingsTitle}>
      {pollResults.map((option) => (
        <div key={option.id} className={styles.option}>
          <input
            type="radio"
            name="poll"
            checked={selectedOption === option.id}
            onChange={() => handleVote(option.id)}
            className={styles.radiobox_input}
            id="radioBox"
          />

          <div className={styles.votings_container}>
            <h2 className={styles.votings_title}>
              <label className={styles.label} htmlFor="radioBox">
                <span>{option.text}</span>
              </label>
              <span className={styles.percentage}>{option.votes.toFixed(2)}%</span>
            </h2>
            <div className={styles.bar_container}>
              <div className={styles.bar} style={{ width: `${option.votes}%` }}></div>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};
