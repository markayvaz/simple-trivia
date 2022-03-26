import { Outlet } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { TriviaState, initialTriviaState } from "./context/TriviaState";
import { useState, useEffect } from "react";
import { getTrivia } from "./api/OpenTableDB";

export default function App() {
  const [triviaState, setTriviaState] = useState(initialTriviaState);
  const triviaValue = { triviaState, setTriviaState };

  useEffect(() => {
    getTrivia(triviaState, setTriviaState);
  }, []);

  return (
    <TriviaState.Provider value={triviaValue}>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </TriviaState.Provider>
  );
}
