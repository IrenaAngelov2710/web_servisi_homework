//? DOMASNA
//? - Преземање на податоци од RickN'Morty API-то и локално кеширање на податоците

//! npm init -y
//! npm install express
//! npm install node-fetch = so node-fetch vrsime interakcija so drugi web servisi

//* So ovaa linija na kod go vnesuvame modulot "express" vo Node.js aplikacijata
//* "express" e popularen web-frejmvork za Node.js koj ovozmozuva kreiranje na web aplikacii i API na ednostaven i efikasen nacin
const express = require("express");

//* Ovaa linija kod go vklucuva lokalniot modul "rickAndMorty" vo nasiot proekt
//* Koristenjeto na "require("./handlers/rickAndMorty"" ja pottiknuva Node.js da go vcita modulot koj se naoga vo direktorijata "handlers" i imeto na modulot e "rickAndMorty.js"
const rickAndMorty = require("./handlers/rickAndMorty");

//* So ovaa linija kod kreirame nova istanca na "express" aplikacijata
const app = express();

//* Ovaa linija kod definira ruta vo Express aplikacijata koja se odnesuva na HTTP GET baranje na patekata "/api/v1/rickAndMorty/:id"
app.get("/api/v1/rickAndMorty/:id", rickAndMorty.getCharacter);

//* Slusame aplikacija
app.listen(10002, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log("Service started successfully");
});