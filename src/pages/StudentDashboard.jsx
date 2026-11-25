import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../register/auth/authSlice";

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold text-blue-600">
          Student Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Welcome, {user?.name}
          </h2>

          <p className="mt-2 text-gray-600">
            You are logged in as a student.
          </p>

          <p className="mt-4">
            Email: {user?.email}
          </p>

          <p>
            Role: {user?.role}
          </p>
        </div>
      </main>

    </div>
  );
}

export default StudentDashboard;