import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTriviaState } from "../context/TriviaState";
import XCircle from "../components/elements/XCircle";
import CheckCircle from "../components/elements/CheckCircle";
import { convertBooleanToString } from "../utils/HelperFunctions";
import PrimaryButton from "../components/elements/PrimaryButton";

export default function Results() {
  let navigate = useNavigate();

  const [score, setScore] = useState(0);

  const { triviaState, resetTriviaState } = useTriviaState();

  useEffect(() => {
    if (!triviaState.started) {
      navigate("/");
    } else if (triviaState.started && !triviaState.finished) {
      navigate("/quiz");
    } else {
      triviaState.responses.reduce((previousValue, currentValue) => {
        if (currentValue.isCorrect) {
          setScore(previousValue + 1);
          return previousValue + 1;
        } else {
          setScore(previousValue);
          return previousValue;
        }
      }, 0);
    }
  }, []);

  const renderResponses = () => {
    return triviaState.responses.map(({ isCorrect, question, response }, i) => {
      return (
        <div
          key={`Q${i}.`}
          className="relative inline-flex items-center p-4 text-left border-b border-gray-200 rounded-t-lg"
        >
          <div className="mr-2">
            <span className="font-medium">Q{i + 1}.</span> {question}
          </div>
          <div
            className={`flex gap-1 items-center ${
              isCorrect ? "bg-blue-700" : "bg-red-700"
            } text-white text-sm font-medium mr-2 px-2.5 py-1 rounded`}
          >
            {convertBooleanToString(response)}
            {isCorrect ? <CheckCircle /> : <XCircle />}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      <h1>🎉</h1>
      <h3>Score: {`${score}/${triviaState.questions.length}`}</h3>

      <div className="flex flex-col text-gray-900 bg-white border border-gray-200 rounded-lg">
        {renderResponses()}
      </div>

      <div>
        <PrimaryButton
          title="Start over"
          onClick={() => {
            resetTriviaState();
            navigate("/", { replace: true });
          }}
        />
      </div>
    </div>
  );
}
