import { decodeHtml } from "../utils/HelperFunctions";

const url = new URL(process.env.REACT_APP_TRIVIA_BASE);

export async function fetchTrivia(params) {
  url.search = new URLSearchParams(params).toString();

  return await fetch(url)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }

      return res
        .json()
        .then((data) => {
          return data.results.map((q, i) => {
            return {
              id: i,
              category: q.category,
              question: decodeHtml(q.question),
              correctAnswer: q.correct_answer,
            };
          });
        })
        .catch((err) => {
          throw new Error("unable to fetch trivia.");
        });
    })
    .catch((err) => {
      throw new Error("unable to fetch trivia.");
    });
}
