
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    addStudent,
    deleteStudent,
    updateStudent,
} from "../register/students/StudentSlice";

import { logout } from "../register/auth/authSlice";

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const students = useSelector(
        (state) => state.students.students
    );

    const user = useSelector(
        (state) => state.auth.user
    );

    // Form states
    const [name, setName] = useState("");
    const [course, setCourse] = useState("React");
    const [marks, setMarks] = useState("");
    const [editId, setEditId] = useState(null);

    // Search, filter and sorting states
    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Add or update student
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || marks === "") {
            alert("Please fill all fields");
            return;
        }

        const numericMarks = Number(marks);

        if (
            !Number.isFinite(numericMarks) ||
            numericMarks < 0 ||
            numericMarks > 100
        ) {
            alert("Marks must be between 0 and 100");
            return;
        }

        const studentData = {
            id: editId ?? Date.now(),
            name: name.trim(),
            course,
            marks: numericMarks,
        };

        if (editId !== null) {
            dispatch(updateStudent(studentData));
            setEditId(null);
        } else {
            dispatch(addStudent(studentData));
        }

        // Reset form
        setName("");
        setCourse("React");
        setMarks("");
        setCurrentPage(1);
    };

    // Edit student
    const handleEdit = (student) => {
        setEditId(student.id);
        setName(student.name);
        setCourse(student.course);
        setMarks(String(student.marks));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditId(null);
        setName("");
        setCourse("React");
        setMarks("");
    };

    // Delete student
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (confirmDelete) {
            dispatch(deleteStudent(id));
        }
    };

    // Search, filter and sorting
    const filteredStudents = useMemo(() => {
        let result = [...students];

        // Search by name
        result = result.filter((student) =>
            student.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        // Filter by course
        if (courseFilter !== "All") {
            result = result.filter(
                (student) => student.course === courseFilter
            );
        }

        // Sort by name
        if (sortBy === "name") {
            result.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        // Sort by marks (highest first)
        if (sortBy === "marks") {
            result.sort((a, b) => b.marks - a.marks);
        }

        return result;
    }, [students, search, courseFilter, sortBy]);

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredStudents.length / itemsPerPage
    );

    // Keep current page within valid range
    const page = Math.min(
        currentPage,
        Math.max(totalPages, 1)
    );

    const startIndex = (page - 1) * itemsPerPage;

    const currentStudents = filteredStudents.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Previous page
    const handlePrevious = () => {
        setCurrentPage(Math.max(page - 1, 1));
    };

    // Next page
    const handleNext = () => {
        setCurrentPage(Math.min(page + 1, totalPages));
    };

    // Logout
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                    Admin Dashboard
                </h1>

                <div className="flex items-center gap-4">
                    <span className="text-sm">
                        Welcome, {user?.name}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-6">

                {/* Add / Update Student Form */}
                <section className="bg-white p-6 rounded-xl shadow mb-6">

                    <h2 className="text-xl font-bold mb-4">
                        {editId !== null
                            ? "Update Student"
                            : "Add New Student"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-4 gap-3"
                    >
                        <input
                            type="text"
                            placeholder="Student name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="border p-3 rounded-lg"
                        >
                            <option value="React">React</option>
                            <option value="Python">Python</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Marks"
                            min="0"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
                        >
                            {editId !== null
                                ? "Update Student"
                                : "Add Student"}
                        </button>
                    </form>

                    {editId !== null && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="mt-3 text-red-600 hover:underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </section>

                {/* Search, Filter and Sorting */}
                <section className="bg-white p-6 rounded-xl shadow mb-6">

                    <h2 className="text-xl font-bold mb-4">
                        Manage Students
                    </h2>

                    <div className="grid md:grid-cols-3 gap-3">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border p-3 rounded-lg"
                        />

                        {/* Course filter */}
                        <select
                            value={courseFilter}
                            onChange={(e) => {
                                setCourseFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border p-3 rounded-lg"
                        >
                            <option value="All">All Courses</option>
                            <option value="React">React</option>
                            <option value="Python">Python</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>

                        {/* Sorting */}
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border p-3 rounded-lg"
                        >
                            <option value="default">Default Order</option>
                            <option value="name">Sort by Name</option>
                            <option value="marks">Sort by Marks</option>
                        </select>

                    </div>
                </section>

                {/* Student Records */}
                <section className="bg-white p-6 rounded-xl shadow">

                    <div className="flex justify-between items-center mb-4">

                        <h2 className="text-xl font-bold">
                            Student Records
                        </h2>

                        <span className="text-sm text-gray-500">
                            Total: {filteredStudents.length}
                        </span>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Course</th>
                                    <th className="p-3">Marks</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {currentStudents.length > 0 ? (

                                    currentStudents.map((student) => (

                                        <tr
                                            key={student.id}
                                            className="border-b hover:bg-slate-50"
                                        >

                                            <td className="p-3">
                                                {student.id}
                                            </td>

                                            <td className="p-3">
                                                {student.name}
                                            </td>

                                            <td className="p-3">
                                                {student.course}
                                            </td>

                                            <td className="p-3">
                                                {student.marks}
                                            </td>

                                            <td className="p-3">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => handleEdit(student)}
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(student.id)
                                                        }
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center p-6 text-gray-500"
                                        >
                                            No students found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-6">

                        <button
                            onClick={handlePrevious}
                            disabled={page === 1}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {Math.max(totalPages, 1)}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={
                                page === totalPages || totalPages === 0
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>

                    </div>

                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;
