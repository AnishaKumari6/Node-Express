
import express from "express";
import { students } from "../data/students.data.js";

const router = express.Router();


const getNextId = () => {
  if (students.length === 0) return 1;
  return Math.max(...students.map((s) => s.id)) + 1;
};

router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || typeof age !== "number" || !course) {
    return res.status(400).json({
      message: "Invalid input. Required: name (string), age (number), course (string).",
    });
  }

  const newStudent = { id: getNextId(), name, age, course };
  students.push(newStudent);

  return res.status(201).json({
    message: "Student created",
    student: newStudent,
  });
});


router.get("/", (req, res) => {
  return res.json(students);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.json(student);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;

  if (!name || typeof age !== "number" || !course) {
    return res.status(400).json({
      message: "Invalid input. Required: name (string), age (number), course (string).",
    });
  }

  students[studentIndex] = { id, name, age, course };

  return res.json({
    message: "Student updated",
    student: students[studentIndex],
  });
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(studentIndex, 1)[0];

  return res.json({
    message: "Student deleted",
    student: deleted,
  });
});

export default router;