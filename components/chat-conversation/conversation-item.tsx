import classes from "./conversation-item.module.css";

type ConversationItemProps = {
  question: string;
  answer: string;
};

function ConversationItem({ question, answer }: ConversationItemProps) {
  return (
    <li className={classes.conversationItem}>
      <div className={classes.questionWrapper}>
        <div className={classes.question}>{question}</div>
      </div>
      <div className={classes.answerWrapper}>
        <div className={classes.answer}>{answer}</div>
      </div>
    </li>
  );
}

export default ConversationItem;
