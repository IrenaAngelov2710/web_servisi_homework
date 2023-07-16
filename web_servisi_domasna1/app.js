//? ZA DOMASHNA DA SE ZAVRSHI WEB SERVISOT

//? SHEMATA DA SE SOSTOI OD
//? NASLOV
//? Godina
//? Reziser
//? imdbRating:
//? metascore:

//? Da se krera CRUD - CREATE- READ - UPDATE - DELETE
//? baza na rutata da e /api/movies
//? Da se stavat 10 filma preku postman so koristenje na raw jason format

//? getAll
//? getOne
//? create
//? update
//? delete

//! Vo terminal
// npm init -y
// npm install express
// npm install mongoose
// npm install dotenv
// npm install express-jwt
// npm install jsonwebtoken
// npm install bcryptjs
// npm install bcrypt

//? Gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");
// npm install express-jwt
// so ovaj paket implementirame protekcija
const jwt = require("express-jwt");

const moviesHandler = require("./handlers/moviesHandler");
const authHandler = require("./handlers/authHandler");

//? Ja inicijalizirame aplikacijata
const app = express();

//? Povikuvame middelware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? Se izvrsuva init funkcijata so koja funkcija se konektirame so data baza
db.init();

// ovde koristime middelwarot sto ni ovozmuzva da gi protektirame rutite, kako prv parametar imame jwt.expressjwt , vnatre go stavame algoritmot za hashiranje i tajnaata poraka. i so pomosh na ovaj middelware gi protektirame site ruti osven onie ruti koi se vo unless metodata
app.use(
    jwt
      .expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
      })
      .unless({
        path: ["/api/v1/signup", "/api/v1/login", "/movies"],
      })
  );

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.post("/api/movies", moviesHandler.createMovie);
app.get("/api/movies", moviesHandler.getAllMovies);
app.get("/api/movies/:id", moviesHandler.getOneMovie);
app.patch("/api/movies/:id", moviesHandler.updateMovie);
app.delete("/api/movies/:id", moviesHandler.deleteMovie);

// Startuvanje i slusanje na web serverot
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log("Could not start service");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});