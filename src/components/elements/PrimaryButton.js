export default function PrimaryButton({ title, onClick }) {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 "
      onClick={onClick}
    >
      {title}
    </button>
  );
}
