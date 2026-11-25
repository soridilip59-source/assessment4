import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [
    {
      id: 1,
      name: "Rahul",
      course: "React",
      marks: 85,
    },
    {
      id: 2,
      name: "Amit",
      course: "Python",
      marks: 90,
    },
    {
      id: 3,
      name: "Priya",
      course: "JavaScript",
      marks: 78,
    },
    {
      id: 4,
      name: "Neha",
      course: "React",
      marks: 92,
    },
    {
      id: 5,
      name: "Rohit",
      course: "Python",
      marks: 75,
    },
    {
      id: 6,
      name: "Anjali",
      course: "JavaScript",
      marks: 88,
    },
    {
      id: 7,
      name: "Vikas",
      course: "React",
      marks: 80,
    },
    {
      id: 8,
      name: "Pooja",
      course: "Python",
      marks: 95,
    },
    {
      id: 9,
      name: "Karan",
      course: "JavaScript",
      marks: 82,
    },
    {
      id: 10,
      name: "Suman",
      course: "React",
      marks: 91,
    },
  ],
};

const studentSlice = createSlice({
  name: "students",
  initialState,

  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },

    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload,
      );
    },

    updateStudent: (state, action) => {
      const student = state.students.find(
        (student) => student.id === action.payload.id,
      );

      if (student) {
        student.name = action.payload.name;
        student.course = action.payload.course;
        student.marks = action.payload.marks;
      }
    },
  },
});

export const { addStudent, deleteStudent, updateStudent } =
  studentSlice.actions;

export default studentSlice.reducer;
