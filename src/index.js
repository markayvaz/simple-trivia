import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "flowbite";
import App from "./App";
import Home from "./routes/Home";
import Questions from "./routes/questions";
import Question from "./routes/questions/Question";
import Results from "./routes/Results";
import NotFound from "./routes/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />}>
            <Route path=":questionNo" element={<Question />} />
          </Route>
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
