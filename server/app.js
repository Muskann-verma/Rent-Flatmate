require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

connectDB();

// Allow local dev origins + any production frontend URL set via env
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
];
if (process.env.CORS_ORIGIN) {
    allowedOrigins.push(process.env.CORS_ORIGIN);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Rent & Flatmate Finder Backend is Running");
});

const PORT = process.env.PORT || 5000;

// Only start the server when running locally (not on Vercel serverless)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
}

module.exports = app;