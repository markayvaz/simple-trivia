import React from "react";

export const initialTriviaState = {
  started: false,
  finished: false,
  questions: [],
  responses: [],
  currentQuestion: null,
  error: null,
};

export const TriviaState = React.createContext(initialTriviaState);
