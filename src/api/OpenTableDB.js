import { decodeHtml } from "../utils/HelperFunctions";

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

export async function getTrivia(setTriviaQuestions, setTriviaError) {
  await fetch(URL)
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
          console.log(err);
          setTriviaError(err);
        });
    })
    .catch((err) => {
      console.error(err);
      setTriviaError(err);
    });
}
