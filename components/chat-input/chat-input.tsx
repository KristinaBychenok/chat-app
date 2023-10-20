import { ChangeEvent, useEffect, useState } from "react";
import classes from "./chat-input.module.css";
import { Conversation } from "../chat-conversation/chat-conversation";

type ChatInputProps = {
  onChangeInput: (question: string) => void;
  onChangeAnswer: (answer: string) => void;
};

function ChatInput({ onChangeInput, onChangeAnswer }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const changeInputHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.target.value);
  };

  const sendHandler = async () => {
    const response = await fetch("api/chat/chat-conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: inputValue,
      }),
    });

    const data = await response.json();

    onChangeInput(inputValue);
    onChangeAnswer(data.answer);
    setInputValue("");
  };

  return (
    <div className={classes.chatInput}>
      <input
        type="text"
        id="user-input"
        placeholder="Type your message..."
        value={inputValue}
        onChange={changeInputHandler}
      />
      <button id="send-button" onClick={sendHandler}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
