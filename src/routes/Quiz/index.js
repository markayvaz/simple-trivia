import { TriviaState } from "../../context/TriviaState";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getTrivia } from "../../api/OpenTableDB";
import Spinner from "../../components/elements/Spinner";

export default function Quiz() {
  const { triviaState, setTriviaState } = useContext(TriviaState);

  let navigate = useNavigate();

  console.log(triviaState);

  useEffect(() => {
    if (!triviaState.started) {
      getTrivia(triviaState, setTriviaState);
    }
  }, []);

  useEffect(() => {
    if (triviaState.questions.length > 0) {
      let updatedTriviaState = triviaState;

      updatedTriviaState.started = true;

      setTriviaState(updatedTriviaState);

      navigate(`${triviaState.currentQuestion}`);
    }
  }, [triviaState]);

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
                getTrivia(triviaState, setTriviaState);
              }}
            >
              try again
            </span>
            .
          </p>
        </div>
      ) : triviaState.questions.length === 0 ? (
        <Spinner />
      ) : null}
      <Outlet />
    </div>
  );
}
