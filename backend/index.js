const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const organizationRoutes = require("./routes/org");
const taskRoutes = require("./routes/task");
const dashbaordRoutes = require("./routes/dashboard");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/organizations", organizationRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashbaord", dashbaordRoutes );
app.post("/", (req, res) => {
  res.send("Hello World");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
