import { Link } from "react-router-dom";
import { useContext } from "react";
import { TriviaState } from "../context/TriviaState";
import { getTrivia } from "../api/OpenTableDB";

export default function Home() {
  const { triviaState, setTriviaState } = useContext(TriviaState);

  return (
    <>
      <div className="space-y-6">
        <h1>🎉</h1>
        {triviaState.started ? (
          <h1>Hey, welcome back!</h1>
        ) : (
          <h1>Welcome to the Trivia Challenge!</h1>
        )}
      </div>

      {triviaState.started ? (
        <h3>{`You still have ${
          // TODO: Change 10 to the number of questions.
          10 - triviaState.currentQuestion
        } questions to go...`}</h3>
      ) : (
        <h3>You'll be presented with 10 True or False questions.</h3>
      )}

      <div className="flex flex-col text-center space-y-4">
        {!triviaState.started && (
          <span className="text-slate-600 text-sm">Can you score 100%?</span>
        )}

        <div>
          {triviaState.started ? (
            // TODO: Link this button to the appropriate question.
            <Link to={`/questions/${triviaState.currentQuestion}`}>
              <button
                type="button"
                className="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 "
              >
                Continue...
              </button>
            </Link>
          ) : (
            <Link to="/questions/1">
              <button
                type="button"
                className="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 "
                onClick={() =>
                  setTriviaState({
                    ...triviaState,
                    started: true,
                    currentQuestion: 1,
                  })
                }
              >
                Begin
              </button>
            </Link>
          )}
          {triviaState.started && (
            <span
              className="text-red-600 text-sm font-medium hover:cursor-pointer"
              onClick={() =>
                setTriviaState({
                  questions: getTrivia(triviaState, setTriviaState),
                  started: false,
                  currentQuestion: null,
                })
              }
            >
              Start over
            </span>
          )}
        </div>
      </div>
    </>
  );
}
