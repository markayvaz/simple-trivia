function App() {
  return (
    <div className="flex h-screen bg-indigo-200 p-6">
      <div className="m-auto space-y-14 bg-white p-12 rounded-xl text-center ">
        <div className="space-y-6">
          <h1>🎉</h1>
          <h1>Welcome to the Trivia Challenge!</h1>
        </div>

        <h3>You'll be presented with 10 True or False questions.</h3>

        <div className="flex flex-col text-center space-y-4">
          <span className="text-slate-600 text-sm">Can you score 100%?</span>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-base focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Bring it on...
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
