const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

export async function getTrivia(triviaState, setTriviaState) {
  await fetch(URL)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }

      res
        .json()
        .then((data) => {
          setTriviaState({ ...triviaState, questions: data.results });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
