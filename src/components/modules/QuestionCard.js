export default function QuestionCard({
  questionNo,
  category,
  question,
  handleResponse,
}) {
  return (
    <div>
      <div className="space-y-10">
        <div className="space-y-2">
          <span className="text-slate-600 text-sm">{`${questionNo}/10`}</span>
          <h3>{category}</h3>
        </div>

        <p className="max-w-[20rem]">{question}</p>
        <div className="flex flex-row">
          <button
            type="button"
            className="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              handleResponse(true);
            }}
          >
            True
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-r w-full from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              handleResponse(false);
            }}
          >
            False
          </button>
        </div>
      </div>
    </div>
  );
}
