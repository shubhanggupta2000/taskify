const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS middleware
const authRoutes = require("./routes/auth");
const organizationRoutes = require("./routes/org");
const taskRoutes = require("./routes/task");
const dashboardRoutes = require("./routes/dashboard"); // Fixed typo
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/organizations", organizationRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes); // Fixed typo
app.post("/", (req, res) => {
  res.send("Hello World");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
