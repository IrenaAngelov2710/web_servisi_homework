const mongoose = require("mongoose");
// npm install validator
// paket na Node.js koj obezbeduva funkcii za validacija i sanitacija na razlicni tipovi na podatoci
const validator = require("validator");
// npm install bcryptjs
// paken na Node.js koj obezbeduva funkcii za hesiranje na lozinkite
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: true, 
    lowercase: true,
    validate: [validator.isEmail, "Prease provide a valid email"], // validacija dali vrednosta e vistinki email
  },
  role: {
    type: String,
    enum: ["user", "admin", "administarot"], // enum se koristi koga imame tocno zadadeni parametri
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be at least 8 characters long"],
  },
});

userSchema.pre("save", async function (next) {
  // so ovaa metoda na prevremen return sprecuvame da se aktivira celosnata funkcija ako kondicijata e ispolneta
  if (!this.isModified("password")) return next();
  // so ovaa this.password go selektirame passwordot sto sakame da go hashirame so pomosh na bcrypt bibliotekata koja ima dva parametri i toa prviot parametar e vrednosta sto sakame da zivrsime promena i vtoriot parametar e jacinata na hashiranjeto, vo denesno vreme sekogash pisuvajte nad 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;