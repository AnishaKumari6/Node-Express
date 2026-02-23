export const validateStudent = (req, res, next) => {
  const { name, age, course } = req.body;


  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Validation error: name must be a string with at least 2 characters",
    });
  }


  if (age === undefined || typeof age !== "number" || age < 1 || age > 100) {
    return res.status(400).json({
      message: "Validation error: age must be a number between 1 and 100",
    });
  }


  if (!course || typeof course !== "string" || course.trim().length < 2) {
    return res.status(400).json({
      message: "Validation error: course must be a string with at least 2 characters",
    });
  }

  next(); 
};