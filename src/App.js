import { Outlet } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { TriviaStateProvider } from "./context/TriviaState";

export default function App() {
  return (
    <>
      <TriviaStateProvider>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </TriviaStateProvider>
    </>
  );
}
