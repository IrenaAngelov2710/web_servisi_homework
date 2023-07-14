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

//? Gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");

const moviesHandler = require("./handlers/moviesHandler");

//? Ja inicijalizirame aplikacijata
const app = express();

//? Povikuvame middelware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? Se izvrsuva init funkcijata so koja funkcija se konektirame so data baza
db.init();

app.post("/api/movies", moviesHandler.createMovie);
app.get("/api/movies", moviesHandler.getAllMovies);
app.get("/api/movies/:id", moviesHandler.getOneMovie);
app.patch("/api/movies/:id", moviesHandler.updateMovie);
app.delete("/api/movies/:id", moviesHandler.deleteMovie);

console.log(process.env);

// Startuvanje i slusanje na web serverot
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log("Could not start service");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});