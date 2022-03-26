import { Link } from "react-router-dom";
import NotFoundArt from "../assets/svgs/NotFoundArt.svg";

export default function NotFound() {
  return (
    <>
      <img
        src={NotFoundArt}
        alt="404 - The page you're looking for could not be found."
        width={400}
      />

      <h3>Oops, there's nothing here...</h3>
      <p>
        Let's take you back{" "}
        <Link to="/" className="font-bold text-blue-700">
          home
        </Link>
        .
      </p>
    </>
  );
}
