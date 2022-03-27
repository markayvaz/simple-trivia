import QuestionCard from "../../components/modules/QuestionCard";
import { TriviaState } from "../../context/TriviaState";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { convertStringToBoolean } from "../../utils/HelperFunctions";

export default function Question() {
  const { triviaState, setTriviaState } = useContext(TriviaState);

  let navigate = useNavigate();

  let params = useParams();

  const questionNo = params.questionNo;

  const [question, setQuestion] = useState(null);

  const handleAnswer = (response) => {
    const updatedTriviaState = triviaState;

    updatedTriviaState.responses[questionNo - 1] = {
      question: question.question,
      response,
      isCorrect: convertStringToBoolean(question.correct_answer) === response,
    };

    if (triviaState.currentQuestion < triviaState.questions.length) {
      // ? There are more questions to answer.
      updatedTriviaState.currentQuestion++;
      updatedTriviaState.finished = false;
    } else if (triviaState.currentQuestion === triviaState.questions.length) {
      // ? The final question has been answered.
      updatedTriviaState.currentQuestion = null;
      updatedTriviaState.finished = true;
    }

    setTriviaState(updatedTriviaState);

    if (triviaState.currentQuestion === null) {
      // ? The questions have finished, proceed to the results screen.
      navigate("/results", { replace: true });
    } else {
      // ? Navigate to the next question.
      navigate(`/quiz/${triviaState.currentQuestion}`);
    }
  };

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

  return (
    <>
      {question && (
        <QuestionCard
          questionNo={questionNo}
          category={question.category}
          question={question.question}
          handleAnswer={handleAnswer}
        />
      )}
    </>
  );
}
