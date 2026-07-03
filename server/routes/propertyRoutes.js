const express = require("express");
const router = express.Router();

const { addProperty, getProperties, getMyProperties, getPropertyById } = require("../controllers/propertyController");
const auth = require("../middleware/authMiddleware");

router.get("/", getProperties);
router.get("/mine", auth, getMyProperties);
router.get("/:id", getPropertyById);
router.post("/add", auth, addProperty);

module.exports = router;