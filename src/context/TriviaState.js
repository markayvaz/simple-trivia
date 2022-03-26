import React from "react";

const initialState = {
  started: false,
  questions: null,
  currentQuestion: null,
};

export const TriviaState = React.createContext(initialState);
