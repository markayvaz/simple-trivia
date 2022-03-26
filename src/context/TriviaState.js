import React from "react";

export const states = {
  UNSTARTED: "UNSTARTED",
  ONGOING: "ONGOING",
  FINISHED: "FINISHED",
};

export const TriviaState = React.createContext(states.UNSTARTED);
