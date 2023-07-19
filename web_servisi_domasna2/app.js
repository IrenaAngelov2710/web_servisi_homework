//? DA SE KE KREIRA WEB SERVIS ILI REST API
//? DA SE KREIRA OGLAS
//? KAKO REKLAMA5
//? I DA SE KREIRA AFTENTIKACIJA (korisnici - logirtanje)
//? DA IMAME KOLEKCIJA SO AVTOMOBILI, VELOSIPEDI, NEDVIZNINI, TELEFONI
//? SITE KORISNICI BEZ RAZLIKA NA LOGIRANJE DA IMAAT PRISTAP DO SITE KOLEKCII
//? SAMO LOGIRANI KORISNI DA MOZE DA KREIRAAT BRISHAT I UPDEJTIRAAT DOKUMENTI VO KOLKECIITE

//! Vo terminal
// npm init -y
// npm install express
// npm install mongoose
// npm install dotenv
// npm install express-jwt 
// npm install jsonwebtoken
// npm install bcryptjs 
// npm install bcrypt
// npm install validator


//? gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");
// npm install express-jwt
// so ovoj paket implementirame protekcija
const jwt = require("express-jwt");

//? go povikuvame handlerot
const authHandler = require("./handlers/authHandler")
const avtomobiliHandler = require("./handlers/avtomobiliHandler");
const velosipediHandler = require("./handlers/velosipediHandler");
const telefoniHandler = require("./handlers/telefoniHandler");
const stanoviHandler = require("./handlers/stanoviHandler");


//? ja inicijalizirame aplikacijata
const app = express();

//? Povikuvame middlewares
app.set("view engine", "ejs");
app.use(express.json()); //persiranje na podatocite
app.use(express.urlencoded({extended: true}));

//? izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

// ovde koristime middelwarot sto ni ovozmuzva da gi protektirame rutite,kako prv parametar imame jwt.expressjwt, 
// vnatre go stavame algoritmot za hashiranje i tajnaata poraka
// i so pomosh na ovaj middelware gi protektirame site ruti osven onie ruti koi se vo unless metodata
app.use(
    jwt
      .expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
      })
      .unless({
        path: ["/api/v1/signup", "/api/v1/login", "/avtomobili", "/velosipedi", "/telefoni", "/stanovi"],
      })
  );

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.post("/api/avtomobili", avtomobiliHandler.create);
app.get("/api/avtomobili", avtomobiliHandler.getAll);
app.get("/api/avtomobili/:id", avtomobiliHandler.getOne);
app.patch("/api/avtomobili/:id", avtomobiliHandler.update);
app.delete("/api/avtomobili/:id", avtomobiliHandler.delete);

app.post("/api/velosipedi", velosipediHandler.create);
app.get("/api/velosipedi", velosipediHandler.getAll);
app.get("/api/velosipedi/:id", velosipediHandler.getOne);
app.patch("/api/velosipedi/:id", velosipediHandler.update);
app.delete("/api/velosipedi/:id", velosipediHandler.delete);

app.post("/api/telefoni", telefoniHandler.create);
app.get("/api/telefoni", telefoniHandler.getAll);
app.get("/api/telefoni/:id", telefoniHandler.getOne);
app.patch("/api/teleofni/:id", telefoniHandler.update);
app.delete("/api/telefoni/:id", telefoniHandler.delete);

app.post("/api/stanovi", stanoviHandler.create);
app.get("/api/stanovi", stanoviHandler.getAll);
app.get("/api/stanovi/:id", stanoviHandler.getOne);
app.patch("/api/stanovi/:id", stanoviHandler.update);
app.delete("/api/stanovi/:id", stanoviHandler.delete);



//? startuvanje i slusanje na web serverot
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log("Could not start service");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});
