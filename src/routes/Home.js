import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="space-y-6">
        <h1>🎉</h1>
        <h1>Welcome to the Trivia Challenge!</h1>
      </div>

      <h3>You'll be presented with 10 True or False questions.</h3>

      <div className="flex flex-col text-center space-y-4">
        <span className="text-slate-600 text-sm">Can you score 100%?</span>
        <Link to="/question">
          <button
            type="button"
            className="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Bring it on...
          </button>
        </Link>
      </div>
    </>
  );
}
