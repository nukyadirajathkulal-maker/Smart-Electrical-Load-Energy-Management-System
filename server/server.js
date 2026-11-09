require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const applianceRoutes = require("./routes/applianceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes"); // <-- Add this

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appliances", applianceRoutes);
app.use("/api/dashboard", dashboardRoutes); // <-- Add this

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/test", (req, res) => {
    res.json({
        message: "Server is working"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});