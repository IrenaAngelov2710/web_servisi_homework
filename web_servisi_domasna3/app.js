//!
//? ZA DOMASNA DA SE IMMPLEMENTIRA OGLASI, da moze sekoj korisnik da si kreira sopstveni oglasi
//? isto taka sekoj korisnik da moze da gi vidi samo sopstvenite oglasi
//? bonus: se sto imame uceno implementirajte

//! Vo terminal
// npm init -y (package.json)
// npm install express 
// npm install mongoose 
// npm install dotenv 
// npm install express-jwt 
// npm install jsonwebtoken
// npm install bcryptjs
// npm install bcrypt
// npm install validator 
// npm install ejs

//? Gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");
// npm install express-jwt
// so ovoj paket implementirame protekcija
const jwt = require("express-jwt");
// ovoj paket se grizi za parsiranje na cookies
const cookieParser = require("cookie-parser");

//? Go povikuvame handlerot
const oglasiHandler = require("./handlers/oglasiHandler");
const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");

//? Ja inicijalizirame aplikacijata
const app = express();

//? Povikuvame middlewares
app.set("view engine", "ejs");
app.use(express.json()); // persiranje na podatoci
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser()); // se grizi za parsiranje na cookisot
app.use(express.static("public")); // za da imame prispat za fajlovie od frotend

//? izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

// ovde koristime middelwarot sto ni ovozmuzva da gi protektirame rutite, kako prv parametar imame jwt.expressjwt, 
// vnatre go stavame algoritmot za hashiranje i tajnata poraka
// i so pomos na ovoj middelware gi protektirame site ruti osven onie ruti koi se vo unless metodata
app.use(
    jwt
      .expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
        getToken: (req) => {
          if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            return req.headers.authorization.split(" ")[1];
          }
          if (req.cookies.jwt) {
            return req.cookies.jwt;
          }
          return null; 
        },
      })
      .unless({
        // osven ovie ruti
        path: ["/api/v1/signup", "/api/v1/login", "/api/oglasi", "/login"],
      })
  );

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.post("/api/oglasi", oglasiHandler.createOglas);
app.get("/api/oglasi", oglasiHandler.getAllOglasi);
app.get("/api/oglasi/:id", oglasiHandler.getOneOglas);
app.patch("/api/oglasi/:id", oglasiHandler.updateOglas);
app.delete("/api/oglasi/:id", oglasiHandler.deleteOglas);

//? Moi oglasi
app.get("/me", oglasiHandler.getByUser);
app.post("/createuser", oglasiHandler.createByUser);

//? View ruti
app.get("/login", viewHandler.getLoginForm);
app.get("/viewOglasi", viewHandler.oglasiView);
app.post("/createOglas", viewHandler.createOglas);

//? Startuvanje i slusanje na web serverot
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log("Could not start service");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});
  