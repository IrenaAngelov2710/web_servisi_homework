const mongoose = require("mongoose");

const stanSchema = new mongoose.Schema({
    sobi: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    greenje: {
        type: String,
        required: [true, "Mora da vnesete tip na greenje"]
    },
    sprat: {
        type: Number
    },
    sostojba: {
        type: String,
        required: [ true, "Mora da vnesete sojstojba na stanot"]
    },
    oprema: {
        type: String,
        required: [true, "Mora da vnesete dali ima oprema stanot"]
    },
    lift: {
        type: String,
        required: [true, "Mora da vnesete dali ima lift zgradata"]
    },
    izgradena: {
        type: String
    },
    balkoni: {
        type: Number
    },
    banji: {
        type: Number
    },
    podrum: {
        type: String,
        required: [true, "Mora da vnesete dali ima podrum"]
    },
    garaza: {
        type: String,
        required: [true, "Mora da vnesete dali ima garaza"]
    },
    orientacija: {
        type: String,
        required: [true, "Mora da vnesete orientacija"]
    },
    adresa: {
        type: String,
        required: [true, "Mora da vnesete adresa"]
    },
    opis: {
        type: String,
        required: [true, "Mora da vnesete opis"]
    },
    cenaEuro: {
        type: Number
    }
});

const Stan = mongoose.model("Stan", stanSchema);

module.exports = Stan;