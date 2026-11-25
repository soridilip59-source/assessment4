import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../register/auth/authSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        let user = null;

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {
            user = {
                name: "Admin",
                email,
                role: "admin",
            };
        } else if (
            email === "student@gmail.com" &&
            password === "student123"
        ) {
            user = {
                name: "Student",
                email,
                role: "student",
            };
        }

        if (!user) {
            alert("Invalid email or password");
            return;
        }

        dispatch(login(user));

        if (user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/student");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Mini Admin Dashboard
                </h1>

                <label className="block mb-2">Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full border p-3 rounded-lg mb-4"
                    required
                />

                <label className="block mb-2">Password</label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border p-3 rounded-lg mb-6"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

                <div className="mt-6 text-sm text-gray-600">
                    <p>Admin: admin@gmail.com / admin123</p>
                    <p>Student: student@gmail.com / student123</p>
                </div>
            </form>
        </div>
    );
}

export default Login;