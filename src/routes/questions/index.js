import { TriviaState } from "../../context/TriviaState";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Questions() {
  const { triviaState, setTriviaState } = useContext(TriviaState);

  let navigate = useNavigate();

  useEffect(() => {
    if (!triviaState.started) {
      navigate("/", { replace: true });
    }
  }, []);

  // TODO: Display error if trivia couldn't be fetched.
  return (
    <div>
      {/* SHOW ERROR HERE */}
      <Outlet />
    </div>
  );
}
