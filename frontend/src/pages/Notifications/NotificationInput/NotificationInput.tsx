/* eslint-disable no-console */
import { KeyboardArrowDown } from "@mui/icons-material";
import { Option, Select } from "@mui/joy";
import { useState } from "react";

import BsFillExclamation from "../Icons/BsFillExclamation.svg";
import EventIcon from "../Icons/EventIcon.svg";
import SendIcon from "../Icons/SendIcon.svg";
import styles from "./NotificationInput.module.css";

export function NotificationInput() {
  const [text, setText] = useState("");
  const [type, setType] = useState<null | string>("Events");

  const sendMessage = () => {
    console.log({ type, text });
    alert(type + ": " + text);
    setText("");
  };

  const handleKeySendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={styles.container}>
      <Select
        placeholder="type"
        variant="plain"
        startDecorator={
          <img src={type === "Events" ? EventIcon : BsFillExclamation} alt="search icon" />
        }
        indicator={<KeyboardArrowDown />}
        value={type}
        onChange={(_, value) => setType(value)}
        sx={{
          minWidth: "290px",
          height: "72px",
          fontSize: "20px",
          fontWeight: 400,
          padding: "13px 20px",
          color: `${type === "Events" ? "var(--purple-900)" : "var(--error-500)"}`,
          boxShadow: "none",
          backgroundColor: "var(--white)",
          borderRadius: "20px",
        }}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 220,
              overflow: "auto",
              borderRadius: "5px",
            },
          },
        }}
      >
        <Option value={"Events"}>Events</Option>
        <Option value={"Emergency messages"}>Emergency messages</Option>
      </Select>

      <input
        className={styles.input}
        type="text"
        placeholder={"Type your message here"}
        onKeyDown={handleKeySendMessage}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <img className={styles.sendIcon} onClick={sendMessage} src={SendIcon} alt="send icon" />
    </div>
  );
}
