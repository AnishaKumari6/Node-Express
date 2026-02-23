import express from "express";
import studentRoutes from "./routes/student.routes.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Middleware API running ");
});

app.use("/students", studentRoutes);

// Error handler (optional but nice)
app.use((err, req, res, next) => {
  console.log(" Error:", err.message);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});