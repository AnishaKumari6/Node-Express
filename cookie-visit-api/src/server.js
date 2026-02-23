import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get("/visit", (req, res) => {
  let visitCount = req.cookies.visitCount;

  if (!visitCount) {
    visitCount = 1;
  } else {
    visitCount = parseInt(visitCount) + 1;
  }

  // Set cookie
  res.cookie("visitCount", visitCount, {
    httpOnly: true,
  });

  res.json({
    message: `You have visited this page ${visitCount} times`,
  });
});

// 2️⃣ Reset Route
app.get("/reset", (req, res) => {
  res.clearCookie("visitCount");

  res.json({
    message: "Visit count reset",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
