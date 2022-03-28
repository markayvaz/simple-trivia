import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrivia } from "../api/OpenTableDB";
import Spinner from "../components/elements/Spinner";
import QuestionCard from "../components/modules/QuestionCard";
import { useTriviaState } from "../context/TriviaState";
import { convertStringToBoolean } from "../utils/HelperFunctions";

export default function Quiz() {
  const { triviaState, setTriviaQuestions, setTriviaError, handleResponse } =
    useTriviaState();

  let navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (!triviaState.started) {
      getTrivia(setTriviaQuestions, setTriviaError);
    } else if (triviaState.finished) {
      navigate(`/results`);
    }
  }, []);

  useEffect(() => {
    setCurrentQuestion(triviaState.questions[triviaState.questionIndex]);
  }, [triviaState.questionIndex]);

  const relayResponse = (response) => {
    const isCorrect =
      convertStringToBoolean(currentQuestion.correct_answer) === response;

    const isFinalQuestion =
      triviaState.questionIndex === triviaState.questions.length - 1;

    handleResponse(
      triviaState,
      currentQuestion.question,
      response,
      isCorrect,
      isFinalQuestion
    );

    if (isFinalQuestion) {
      navigate("/results");
    }
  };

  return (
    <div>
      {triviaState.error ? (
        <div className="space-y-4">
          <h3>Oops, there was an error in getting the quiz...</h3>

          <p>
            Please{" "}
            <span
              className="font-medium text-blue-700 hover:cursor-pointer"
              onClick={() => {
                // TODO: Implement loading on try again and disable button
                getTrivia(setTriviaQuestions, setTriviaError);
              }}
            >
              try again
            </span>
            .
          </p>
        </div>
      ) : triviaState.questions.length === 0 ? (
        <div className="p-16">
          <Spinner />
        </div>
      ) : (
        currentQuestion && (
          <QuestionCard
            questionNo={triviaState.questionIndex + 1}
            category={currentQuestion.category}
            question={currentQuestion.question}
            handleResponse={relayResponse}
          />
        )
      )}
    </div>
  );
}
