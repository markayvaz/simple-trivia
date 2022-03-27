import QuestionCard from "../../components/modules/QuestionCard";
import { useTriviaState } from "../../context/TriviaState";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { convertStringToBoolean } from "../../utils/HelperFunctions";

export default function Question() {
  const { triviaState, handleResponse } = useTriviaState();

  let navigate = useNavigate();

  let params = useParams();

  const questionNo = params.questionNo;

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (
      !triviaState.started ||
      questionNo < 1 ||
      questionNo > triviaState.questions.length
    ) {
      navigate("/quiz", { replace: true });
    }
  }, [triviaState.questions, questionNo]);

  useEffect(() => {
    setQuestion(triviaState.questions[questionNo - 1]);
  }, [triviaState.questions, questionNo]);

  const relayResponse = (response) => {
    const isCorrect =
      convertStringToBoolean(question.correct_answer) === response;

    const isFinalQuestion =
      triviaState.currentQuestion === triviaState.questions.length;

    handleResponse(
      triviaState,
      question.question,
      response,
      isCorrect,
      isFinalQuestion
    );

    if (triviaState.currentQuestion === null) {
      // ? The questions have finished, proceed to the results screen.
      navigate("/results", { replace: true });
    } else {
      // ? Navigate to the next question.
      navigate(`/quiz/${triviaState.currentQuestion}`);
    }
  };

  return (
    <>
      {question && (
        <QuestionCard
          questionNo={questionNo}
          category={question.category}
          question={question.question}
          handleResponse={relayResponse}
        />
      )}
    </>
  );
}
