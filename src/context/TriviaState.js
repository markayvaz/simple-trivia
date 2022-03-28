import { createContext, useContext, useState } from "react";

export const initialTriviaState = {
  started: false,
  finished: false,
  questions: [],
  responses: [],
  questionIndex: null,
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
        questionIndex: 0,
        error: null,
      });
    },
    setTriviaError: (error) => {
      setTriviaState({
        started: false,
        finished: false,
        questions: [],
        responses: [],
        questionIndex: null,
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
        questionIndex: isFinalQuestion ? null : prevState.questionIndex + 1,
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
