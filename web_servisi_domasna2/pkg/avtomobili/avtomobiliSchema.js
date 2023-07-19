const mongoose = require("mongoose");

const avtomobilSchema = new mongoose.Schema({
    marka: {
        type: String,
        required: [true, "Mora da vnesete marka"]
    },
    model: {
        type: String,
        required: [true, "Mora da vnesete model"]
    },
    godina: {
        type: Number
    },
    kilometri: {
        type: Number
    },
    menuvac: {
        type: String,
        required: [true, "Mora da vnesete tip na menuvac"]
    }, 
    boja: {
        type: String,
        required: [true, "Mora da vnesete boja"]
    },
    registracija: {
        type: String,
        required: [true, "Mora da vnesete do koga e registracijata"]
    }, 
    ks: {
        type: Number
    },
    klasa: {
        type: String,
        required: [true, "Mora da vnesete klasa"]
    },
    opis: {
        type: String,
        required: [true, "Mora da vnesete opis"]
    }, 
    cenaEuro: {
        type: Number
    }
});

const Avtomobil = mongoose.model("Avtomobil", avtomobilSchema);

module.exports = Avtomobil;