import { Outlet } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";

export default function App() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
