import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const requireLogin = (req, res, next) => {
  const role = req.cookies.role; 

  if (!role) {
    return res.status(401).json({ message: "Unauthorized: Please login first" });
  }

  req.role = role;
  next();
};


app.get("/login/admin", (req, res) => {
  res.cookie("role", "admin", {
    httpOnly: true,
  });

  res.json({ message: "Admin LoggedIn" });
});


app.get("/login/client", (req, res) => {
  res.cookie("role", "client", {
    httpOnly: true,
  });

  res.json({ message: "Client LoggedIn" });
});

app.get("/dashboard", requireLogin, (req, res) => {
  if (req.role === "admin") {
    return res.json({ message: "Welcome Admin" });
  }

  if (req.role === "client") {
    return res.json({ message: "Welcome Client" });
  }


  return res.status(403).json({ message: "Forbidden: Invalid role" });
});


app.get("/logout", (req, res) => {
  res.clearCookie("role");
  res.json({ message: "Logged out" });
});

app.listen(PORT, () => {
  console.log(`RBAC server running at http://localhost:${PORT}`);
});