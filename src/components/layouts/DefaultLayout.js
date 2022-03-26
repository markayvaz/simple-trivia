export default function DefaultLayout({ children }) {
  return (
    <div className="flex h-screen bg-indigo-200 p-6">
      <div className="m-auto space-y-14 bg-white p-10 rounded-xl text-center border border-gray-200 shadow-md">
        {children}
      </div>
    </div>
  );
}
