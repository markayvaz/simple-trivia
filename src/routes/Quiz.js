import { useEffect } from "react";
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

  useEffect(() => {
    console.log("RAN");
    if (!triviaState.started) {
      getTrivia(setTriviaQuestions, setTriviaError);
    } else if (triviaState.finished) {
      navigate(`/results`);
    }
  }, []);

  const relayResponse = (response) => {
    const isCorrect =
      convertStringToBoolean(
        triviaState.questions[triviaState.currentQuestion - 1].correct_answer
      ) === response;

    const isFinalQuestion =
      triviaState.currentQuestion === triviaState.questions.length;

    handleResponse(
      triviaState,
      triviaState.questions[triviaState.currentQuestion - 1].question,
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
        <Spinner />
      ) : (
        <QuestionCard
          questionNo={triviaState.currentQuestion}
          category={
            triviaState.questions[triviaState.currentQuestion - 1].category
          }
          question={
            triviaState.questions[triviaState.currentQuestion - 1].question
          }
          handleResponse={relayResponse}
        />
      )}
    </div>
  );
}
