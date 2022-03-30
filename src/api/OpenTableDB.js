import { decodeHtml } from "../utils/HelperFunctions";

const TRIVIA_BASE = process.env.REACT_APP_TRIVIA_BASE;

const url = new URL(TRIVIA_BASE);

export async function fetchTrivia(params, setTriviaQuestions, setTriviaError) {
  url.search = new URLSearchParams(params).toString();

  await fetch(url)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }

      res
        .json()
        .then((data) => {
          const questions = data.results;
          const decodedQuestions = questions.map((q) => {
            return { ...q, question: decodeHtml(q.question) };
          });

          setTriviaQuestions(decodedQuestions);
        })
        .catch((err) => {
          setTriviaError(err);
          throw new Error("unable to fetch trivia.");
        });
    })
    .catch((err) => {
      setTriviaError(err);
      throw new Error("unable to fetch trivia.");
    });
}
