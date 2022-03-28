import QuestionCard from "../../components/modules/QuestionCard";
import { useTriviaState } from "../../context/TriviaState";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { convertStringToBoolean } from "../../utils/HelperFunctions";

export default function Question() {
  const { triviaState, handleResponse } = useTriviaState();

  let navigate = useNavigate();

  let params = useParams();

  const questionNo = parseInt(params.questionNo, 10);

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    enforceCorrectRoute();
  });

  const enforceCorrectRoute = () => {
    if (!triviaState.started) {
      navigate("/quiz");
    } else if (
      questionNo < 1 ||
      questionNo > triviaState.questions.length ||
      triviaState.responses[questionNo]
    ) {
      // ? The question number is out of bounds or alredy answered.
      navigate(`/quiz/${triviaState.currentQuestion}`);
    }
  };

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

    isFinalQuestion
      ? navigate("/results")
      : navigate(`/quiz/${questionNo + 1}`, { replace: true });
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
