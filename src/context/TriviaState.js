import { createContext, useContext, useState } from "react";

export const initialTriviaState = {
  started: false,
  finished: false,
  questions: [],
  responses: [],
  currentQuestion: null,
  error: null,
};

export const TriviaState = createContext(initialTriviaState);

export const TriviaStateProvider = ({ children }) => {
  const [triviaState, setTriviaState] = useState(initialTriviaState);

  const triviaValue = {
    triviaState,
    setTriviaQuestions: (questions) => {
      setTriviaState({
        started: true,
        finished: false,
        questions,
        responses: [],
        currentQuestion: 1,
        error: null,
      });
    },
    setTriviaError: (error) => {
      setTriviaState({
        started: false,
        finished: false,
        questions: [],
        responses: [],
        currentQuestion: null,
        error,
      });
    },
    handleResponse: (
      prevState,
      question,
      response,
      isCorrect,
      isFinalQuestion
    ) => {
      setTriviaState({
        started: true,
        finished: isFinalQuestion ? true : false,
        questions: prevState.questions,
        responses: [
          ...prevState.responses,
          {
            question,
            response,
            isCorrect,
          },
        ],
        currentQuestion: isFinalQuestion ? null : prevState.currentQuestion + 1,
        error: null,
      });
    },
    resetTriviaState: () => {
      setTriviaState(initialTriviaState);
    },
  };

  return (
    <TriviaState.Provider value={triviaValue}>{children}</TriviaState.Provider>
  );
};

export const useTriviaState = () => {
  return useContext(TriviaState);
};
