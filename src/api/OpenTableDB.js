const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

export async function getTrivia(
  setTriviaQuestions,
  setTriviaError
) {
  await fetch(URL)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }

      res
        .json()
        .then((data) => {
          setTriviaQuestions(data.results);
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
