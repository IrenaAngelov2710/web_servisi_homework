const mongoose = require("mongoose");

const telefonSchema = new mongoose.Schema({
    marka: {
        type: String,
        required: [true, "Mora da vnesete marka"]
    },
    model: {
        type: String,
        required: [true, "Mora da vnesete model"]
    },
    boja: {
        type: String,
        required: [true, "Mora da vnesete boja"]
    },
    internaMemorija: {
        type: String,
        required: [true, "Mora da vnesete memorija"]
    },
    ramMemorija: {
        type: String,
        required: [true, "Mora da vnesete memorija"]
    }, 
    goleminaNaEkran: {
            type: String,
            required: [true, "Mora da vnesete golemina na ekran"]
        },
    opis: {
            type: String,
            required: [true, "Mora da vnesete opis"]
        },
    cenaDenari: {
        type: Number
    }
});

const Telefon = mongoose.model("Telefon", telefonSchema);

module.exports = Telefon;