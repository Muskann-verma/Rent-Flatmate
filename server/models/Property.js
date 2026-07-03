const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    rent: {
        type: Number,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    propertyType: {
        type: String,
        enum: ["Apartment", "PG", "Hostel", "House"],
        required: true,
    },

    availableFor: {
        type: String,
        enum: ["Male", "Female", "Anyone"],
        default: "Anyone",
    },

    bedrooms: {
        type: Number,
        default: 1,
    },

    bathrooms: {
        type: Number,
        default: 1,
    },

    furnished: {
        type: Boolean,
        default: false,
    },

    images: [
        {
            type: String,
        }
    ],

    amenities: [
        {
            type: String,
        }
    ],

    isAvailable: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Property", propertySchema);