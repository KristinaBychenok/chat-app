import { useEffect, useState } from "react";
import ChatInput from "../chat-input/chat-input";
import classes from "./chat-conversation.module.css";
import ConversationItem from "./conversation-item";

export type Conversation = {
  question: string;
  answer: string;
};

function ChatConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const changeInputHandler = (question: string) => {
    setQuestion(question);
  };

  const changeAnswerHandler = (answer: string) => {
    setAnswer(answer);
  };

  useEffect(() => {
    if (question && answer) {
      setConversations((prevConversations) => [
        { question: question, answer: answer },
        ...prevConversations,
      ]);

      const storedData = localStorage.getItem("conversations-history");

      if (!!storedData) {
        const updatedHistory = [
          { question: question, answer: answer },
          ...JSON.parse(storedData),
        ];
        localStorage.setItem(
          "conversations-history",
          JSON.stringify(updatedHistory)
        );
      } else {
        localStorage.setItem(
          "conversations-history",
          JSON.stringify([{ question: question, answer: answer }])
        );
      }

      setQuestion("");
      setAnswer("");
    }
  }, [answer, question]);

  useEffect(() => {
    const storedData = localStorage.getItem("conversations-history");

    if (!!storedData) {
      setConversations(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className={classes.conversationWrapper}>
      <ChatInput
        onChangeInput={changeInputHandler}
        onChangeAnswer={changeAnswerHandler}
      />
      <ul className={classes.conversation}>
        {conversations?.map((conversation) => (
          <ConversationItem
            key={new Date().toISOString() + Math.random()}
            question={conversation.question}
            answer={conversation.answer}
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatConversation;
