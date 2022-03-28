import { createContext, useContext, useState } from "react";

export const initialTriviaState = {
  started: false,
  finished: false,
  questions: [],
  questionIndex: null,
  currentQuestion: null,
  responses: [],
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
        questionIndex: 0,
        currentQuestion: questions[0],
        responses: [],
        error: null,
      });
    },
    setTriviaError: (error) => {
      setTriviaState({
        started: false,
        finished: false,
        questions: [],
        questionIndex: null,
        currentQuestion: null,
        responses: [],
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
        questionIndex: isFinalQuestion ? null : prevState.questionIndex + 1,
        currentQuestion: isFinalQuestion ? null : prevState.questions[prevState.questionIndex + 1],
        responses: [
          ...prevState.responses,
          {
            question,
            response,
            isCorrect,
          },
        ],
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
