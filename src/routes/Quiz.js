import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrivia } from "../api/OpenTableDB";
import Spinner from "../components/elements/Spinner";
import QuestionCard from "../components/modules/QuestionCard";
import { useTriviaState } from "../context/TriviaState";
import { convertStringToBoolean } from "../utils/HelperFunctions";

export const NUMBER_OF_QUESTIONS = 10;

const params = {
  amount: NUMBER_OF_QUESTIONS,
  difficulty: "hard",
  type: "boolean",
};

export default function Quiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { triviaState, setTriviaQuestions, handleResponse } = useTriviaState();

  let navigate = useNavigate();

  const getTrivia = async () => {
    try {
      setLoading(true);
      const questions = await fetchTrivia(params);
      setTriviaQuestions(questions);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!triviaState.started) {
      getTrivia();
    } else if (triviaState.finished) {
      navigate(`/results`);
    }
  }, []);

  const relayResponse = (response) => {
    const isCorrect =
      convertStringToBoolean(triviaState.currentQuestion.correctAnswer) ===
      response;

    const isFinalQuestion =
      triviaState.questionIndex === triviaState.questions.length - 1;

    handleResponse(
      triviaState,
      triviaState.currentQuestion.question,
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
      {error ? (
        <div className="space-y-4">
          <h3>Oops, there was an error in getting the quiz...</h3>

          <p>
            Please{" "}
            <span
              className="font-medium text-blue-700 hover:cursor-pointer"
              onClick={() => {
                getTrivia();
              }}
            >
              try again
            </span>
            .
          </p>
        </div>
      ) : loading ? (
        <div className="p-16">
          <Spinner />
        </div>
      ) : (
        triviaState.currentQuestion && (
          <QuestionCard
            questionNo={triviaState.questionIndex + 1}
            totalQuestionCount={triviaState.questions.length}
            category={triviaState.currentQuestion.category}
            question={triviaState.currentQuestion.question}
            handleResponse={relayResponse}
          />
        )
      )}
    </div>
  );
}
