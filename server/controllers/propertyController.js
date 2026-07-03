const Property = require("../models/Property");

const addProperty = async (req, res) => {
    try {
        const property = await Property.create({
            owner: req.user.id,
            ...req.body,
        });

        res.status(201).json({
            message: "Property Added Successfully",
            property,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET /api/property — all available properties (public)
const getProperties = async (req, res) => {
    try {
        const { city, propertyType, furnished, availableFor } = req.query;

        const filter = { isAvailable: true };
        if (city) filter.city = city;
        if (propertyType) filter.propertyType = propertyType;
        if (furnished !== undefined) filter.furnished = furnished === "true";
        if (availableFor) filter.availableFor = availableFor;

        const properties = await Property.find(filter)
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ properties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/property/mine — logged-in user's own listings (auth required)
const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({ properties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/property/:id — single property by ID (public)
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate("owner", "name email");

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({ property });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addProperty,
    getProperties,
    getMyProperties,
    getPropertyById,
};