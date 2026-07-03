require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

connectDB();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"],
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

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});