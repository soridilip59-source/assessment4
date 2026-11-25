import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold">404</h1>

            <p className="mt-3 text-gray-600">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-5 text-blue-600 underline"
            >
                Back to Login
            </Link>

        </div>
    );
}

export default NotFound;