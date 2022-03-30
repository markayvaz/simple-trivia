import { decodeHtml } from "../utils/HelperFunctions";

const TRIVIA_BASE = process.env.REACT_APP_TRIVIA_BASE;

const url = new URL(TRIVIA_BASE);

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
          return data.results.map((q) => {
            // TODO: Create new object with own properties e.g, id, correctAnswer, etc.
            return { ...q, question: decodeHtml(q.question) };
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
