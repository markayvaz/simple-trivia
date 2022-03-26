import React from "react";

export const initialTriviaState = {
  started: false,
  questions: [],
  currentQuestion: null,
};

export const TriviaState = React.createContext(initialTriviaState);
