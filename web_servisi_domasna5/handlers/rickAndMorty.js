//* Ovaa linija kod definira modificirana verzija na f-jata "fetch" koja se koristi za pravenje HTTP baranja vo Javascript aplikacii
//* Ovaa modifikacija vklucuva koristenje na "import("node-fetch") za vcituvanje na modulot "node-fetch"
//* "fetch = ( ...args) =>" -  Ovaa sintaksa gi koristi argumentite na f-jata "fetch" kako parametri
//* "import("node-fetch") - Ova e dinamicko vcituvanje na modulot
//* ".then(({ default: fetch }) => fetch(...args))" - Po uspesnoto vcituvanje na modulot, ".then" metodot se povikuva i prenesuva objekt vo koj imeto "default" od objektot se prisvojuva na promenlivata "fetch"
//* "import" go vraka celiot modul kako objekt i edna od negovite svojstva e "default
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//* Ovaa linija kod kreira objekt "cache" (kes) koj moze da se koristi za zacuvuvanje na podatoci vo memorijata
//* Kesot obicno se koristi za zacuvuvanje rezultati od skapi operacii ili podatoci koi se koristat cesto, so cel da se podobri performansata i da se namali vremeto potrebno za dobivanje na podatocite 
let cache = {};

//* "getCharacter" e asinhrona f-ja sto znaci deka koristi "async" i moze da izvrsuva operacii koi se asinhroni (kako HTTP baranja) bez da go blokiraat izvrsuvanjeto
//* "characterId" - se cita od parametrite ne URL, sto go oznacuva ID na karakterot koj sto sakame da go prevzememe
//* "apiUrl" -  e sostaven od bazniot URL na Rick an Morty API i "characterId", sto kreira celosen URL za prevzemanje na podatoci za konkretniot karakter
const getCharacter = async (req, res) => {
    const characterId = req.params.id;
    const apiUrl = `https://rickandmortyapi.com/api/character/${characterId}`;
    //* Se pravi proverka dali veke ima zacuvani podatoci za karakterot i dali podatocite se aktuelni (ne pominalo poveke od 1 min). Ako podatocite se vo kesot i se aktuelni, togas se vrakaat od kesot
    if (
        cache[characterId] &&
        cache[characterId].cacheTime + 60 * 1000 > new Date().getTime()
      ) {
        console.log("Using data from cache");
        return res.json(cache[characterId].data);
      }
    //* Ako podatocite ne se vo kesot ili se stari, se pravi HTTP baranje do API-to so pomos na "fetch". Ako baranjeto e uspesno ("response.ok"), podatocite se konvertiraat vo JSON format
    //* Podatocite se zacuvuvaat vo kesot so dodavanje na "data", i "cacheTime" (momentot na zacuvuvanje). Podatocite se iskoristuvaat kako odgovor na klientot
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          cache[characterId] = {
            data,
            cacheTime: new Date().getTime(),
          };
          console.log("Saving data to cache");
          res.json(data);
        } else {
        //* Ako baranjeto do API ne e uspesno ("response.ok" e "false"), se vraka soodvetna greska
          res.status(response.status).json({ error: "Failed to fetch from API" });
        }
        //* Ako se sluci greska pri prevzemanje na podatocite ili nekade vo kodot, se vraka greska so soodveten status
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal error" });
      }
    };
    
    module.exports = {
      getCharacter,
    };