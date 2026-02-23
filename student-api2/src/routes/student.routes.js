import express from "express";
import { students } from "../data/students.data.js";
import { validateStudent } from "../middleware/validateStudent.middleware.js";

const router = express.Router();

const getNextId = () => (students.length ? Math.max(...students.map(s => s.id)) + 1 : 1);

// GET all
router.get("/", (req, res) => {
  res.json(students);
});

// GET by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) return res.status(404).json({ message: "Student not found" });

  res.json(student);
});

// POST (Validation middleware used here)
router.post("/", validateStudent, (req, res) => {
  const { name, age, course } = req.body;
  const newStudent = { id: getNextId(), name, age, course };
  students.push(newStudent);

  res.status(201).json({ message: "Student created", student: newStudent });
});

export default router;