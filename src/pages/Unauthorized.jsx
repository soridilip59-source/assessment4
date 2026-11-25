import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold text-red-600">
                403
            </h1>

            <h2 className="text-2xl mt-3">
                Access Denied
            </h2>

            <p className="mt-2 text-gray-600">
                You do not have permission to access this page.
            </p>

            <Link
                to="/"
                className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
            >
                Go to Login
            </Link>

        </div>
    );
}

export default Unauthorized;