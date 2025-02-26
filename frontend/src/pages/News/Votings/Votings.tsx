import { useState, FC, useEffect } from "react";
import styles from "./Votings.module.css";
import { Card } from "../utils/Card/Card";
import useApi from "../../../shared/api/useApi";
import { Poll } from "./votings.types";
import { api } from "../../../shared/api/api";
import { useNavigate } from "react-router-dom";

export const Votings: FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ optionsIds: string[] } | null>(null);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const navigate = useNavigate();
  const [polls, setPolls] = useState<Poll[] | null>([]);
  const { data, refetch } = useApi<Poll[]>(`/votings?displayType=Percentages&status=active`);
  useEffect(() => {
    setPolls(data);
  }, [data]);

  const handleVote = (id: string, pollId: string) => {
    const selectedOptions = { optionsIds: [id] };
    setSelectedOptions(selectedOptions);
    setSelectedPoll(pollId);
  };

  useEffect(() => {
    if (selectedOptions?.optionsIds?.length) {
      api(`/votings/${selectedPoll}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedOptions),
      }).then(() => {
        refetch();
      });
      navigate("/news?checked=votings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, selectedPoll, navigate]);
  return (
    <>
      {polls &&
        polls.map(({ headline, options, _id }) => (
          <Card title={headline} key={_id}>
            <form key={_id} className={styles.option}>
              {options.map((option) => (
                <div key={option._id} className={styles.radiobox}>
                  <input
                    type="radio"
                    name={option.name}
                    id={`${option._id}-${option.name}`}
                    checked={
                      selectedOptions?.optionsIds &&
                      selectedOptions?.optionsIds[selectedOptions?.optionsIds.length - 1] ===
                        option._id
                    }
                    onChange={() => handleVote(option._id, _id)}
                    className={styles.radiobox_input}
                  />

                  <div className={styles.votings_container}>
                    <h2 className={styles.votings_title}>
                      <label className={styles.label} htmlFor="radioBox">
                        <span>{option.name}</span>
                      </label>
                      <span className={styles.percentage}>
                        {typeof option.quantity === "number" ? option.quantity.toFixed(2) : 0}%
                      </span>
                    </h2>
                    <div className={styles.bar_container}>
                      <div className={styles.bar} style={{ width: `${option.quantity}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </Card>
        ))}
    </>
  );
};
