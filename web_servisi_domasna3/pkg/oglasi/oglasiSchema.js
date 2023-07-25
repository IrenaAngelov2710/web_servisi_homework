const mongoose = require("mongoose");

const oglasiSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["avtomobili", "velosipedi", "stanovi", "telefoni"],
        required: [true, "You must enter the category."],
    },
    title: {
        type: String,
        required: [true, "You must enter a title."],
    },
    description: {
        type: String,
        required: [true, "You must enter a description."],
    },
    price: {
        type: Number,
        required: [true, "You must enter the price."]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
});

const Oglas = mongoose.model("Oglas", oglasiSchema);
module.exports = Oglas