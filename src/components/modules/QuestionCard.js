import { TriviaState } from "../../context/TriviaState";
import { useContext } from "react";

export default function QuestionCard({ questionNo, category, question }) {
  const { triviaState, setTriviaState } = useContext(TriviaState);

  return (
    <div className="">
      <h1>{questionNo}</h1>
      <h3>{category}</h3>
      <p>{question}</p>
    </div>
  );
}
