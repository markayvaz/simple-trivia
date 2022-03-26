import QuestionCard from "../../components/modules/QuestionCard";
import { TriviaState } from "../../context/TriviaState";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Question() {
  const { triviaState, setTriviaState } = useContext(TriviaState);

  let navigate = useNavigate();

  let params = useParams();

  const questionNo = params.questionNo;

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    console.log(triviaState.started);
    if (
      !triviaState.started ||
      questionNo < 1 ||
      questionNo > triviaState.questions.length
    ) {
      navigate("/questions", { replace: true });
    }
  }, [triviaState.questions, questionNo]);

  useEffect(() => {
    setQuestion(triviaState.questions[questionNo - 1]);
  }, [triviaState.questions, questionNo]);

  return <>{question && <QuestionCard questionNo={questionNo} />}</>;
}
