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
          setTriviaState({
            ...triviaState,
            questions: data.results,
            currentQuestion: 1,
            error: null,
          });
        })
        .catch((err) => {
          console.log(err);
          setTriviaState({ ...triviaState, error: err });
        });
    })
    .catch((err) => {
      console.error(err);
      setTriviaState({ ...triviaState, error: err });
    });
}
