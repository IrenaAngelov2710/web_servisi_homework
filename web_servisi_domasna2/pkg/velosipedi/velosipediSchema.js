const mongoose = require("mongoose");

const velosipedSchema = new mongoose.Schema({
    vid: {
    type: String,
    required: [true, "Mora da vnesete vid na velosiped"]
    },
    pol: {
        type: String,
        required: [true, "Mora da vnesete pol na velosiped"]
    },
    goleminaNaTrkalo: {
        type: String,
        required: [true, "Mora da vnesete golemina na trkalo"]    
    },
    goleminaNaRam: {
        type: String,
        required: [true, "Mora da vnesete goleina na ram"]
    },
    opis: {
        type: String,
        required: [true, "Mora da vnesete opis"]
    },
    cenaDenari: {
        type: Number
    }
});

const  Velosiped = mongoose.model("Velosiped", velosipedSchema);

module.exports = Velosiped;