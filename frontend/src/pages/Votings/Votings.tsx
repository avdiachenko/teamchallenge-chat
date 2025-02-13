import { useState, FC } from "react";
import styles from "./Votings.module.css";
// Тип для варіантів голосування
interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export const Votings: FC = () => {
  const initialOptions: PollOption[] = [
    { id: 1, text: "Install a video intercom", votes: 85.71 },
    { id: 2, text: "Keep the current intercom system", votes: 10.14 },
    { id: 3, text: "Abstain", votes: 4.71 },
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
    <div className={styles.container}>
      <div className={styles.image_header}></div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          We propose holding a vote on the removal of the wall covering in the entrance and common
          corridor.
        </h1>
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
        <p className={styles.date}>08.08.2024</p>
      </main>
    </div>
  );
};
