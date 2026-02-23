
import express from "express";
import studentRoutes from "./routes/student.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Student API is running at /students");
});

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});