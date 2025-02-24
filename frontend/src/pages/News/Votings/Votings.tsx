import { useState, FC, useEffect } from "react";
import styles from "./Votings.module.css";
import { Card } from "../utils/Card/Card";
import useApi from "../../../shared/api/useApi";
import { Poll } from "./votings.types";
import { getVoteOption } from "./utils";
import { api } from "../../../shared/api/api";
import { useNavigate } from "react-router-dom";
const initialOption: Poll = {
  _id: "",
  headline: "",
  options: [],
};
export const Votings: FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Partial<Poll> | null>(initialOption);
  const navigate = useNavigate();
  // const [pollResults, setPollResults] = useState<PollOption[]>(initialOptions);
  const [polls, setPolls] = useState<Poll[] | null>([]);
  const { data } = useApi<Poll[]>(`/votings?displayType=Percentages&status=active`);
  useEffect(() => {
    setPolls(data);
  }, [data]);
  const handleVote = (id: string, pollId: string) => {
    const selectedOptions = getVoteOption(pollId, id, polls);
    setSelectedOptions(selectedOptions as Partial<Poll>);
  };

  useEffect(() => {
    if (selectedOptions?._id !== "") {
      console.log("selectedOptions", selectedOptions);
      api(`/votings/${selectedOptions?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedOptions),
      });
      navigate("/news?checked=votings");
    }
  }, [selectedOptions, navigate]);
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
                      selectedOptions?.options &&
                      selectedOptions?.options[selectedOptions?.options.length - 1]?._id ===
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
