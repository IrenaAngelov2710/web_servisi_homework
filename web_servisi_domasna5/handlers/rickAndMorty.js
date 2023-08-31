//! Prv nacin
//* Ovaa linija kod definira modificirana verzija na f-jata "fetch" koja se koristi za pravenje HTTP baranja vo Javascript aplikacii
//* Ovaa modifikacija vklucuva koristenje na "import("node-fetch") za vcituvanje na modulot "node-fetch"
//* "fetch = ( ...args) =>" -  Ovaa sintaksa gi koristi argumentite na f-jata "fetch" kako parametri
//* "import("node-fetch") - Ova e dinamicko vcituvanje na modulot
//* ".then(({ default: fetch }) => fetch(...args))" - Po uspesnoto vcituvanje na modulot, ".then" metodot se povikuva i prenesuva objekt vo koj imeto "default" od objektot se prisvojuva na promenlivata "fetch"
//* "import" go vraka celiot modul kako objekt i edna od negovite svojstva e "default
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

//* Ovaa linija kod kreira objekt "cache" (kes) koj moze da se koristi za zacuvuvanje na podatoci vo memorijata
//* Kesot obicno se koristi za zacuvuvanje rezultati od skapi operacii ili podatoci koi se koristat cesto, so cel da se podobri performansata i da se namali vremeto potrebno za dobivanje na podatocite 
// let cache = {};

//* "getCharacter" e asinhrona f-ja sto znaci deka koristi "async" i moze da izvrsuva operacii koi se asinhroni (kako HTTP baranja) bez da go blokiraat izvrsuvanjeto
//* "characterId" - se cita od parametrite ne URL, sto go oznacuva ID na karakterot koj sto sakame da go prevzememe
//* "apiUrl" -  e sostaven od bazniot URL na Rick an Morty API i "characterId", sto kreira celosen URL za prevzemanje na podatoci za konkretniot karakter
// const getCharacter = async (req, res) => {
//     const characterId = req.params.id;
//     const apiUrl = `https://rickandmortyapi.com/api/character/${characterId}`;
//* Se pravi proverka dali veke ima zacuvani podatoci za karakterot i dali podatocite se aktuelni (ne pominalo poveke od 1 min). Ako podatocite se vo kesot i se aktuelni, togas se vrakaat od kesot
// if (
//     cache[characterId] &&
//     cache[characterId].cacheTime + 60 * 1000 > new Date().getTime()
//   ) {
//     console.log("Using data from cache");
//     return res.json(cache);
//   }
//* Ako podatocite ne se vo kesot ili se stari, se pravi HTTP baranje do API-to so pomos na "fetch". Ako baranjeto e uspesno ("response.ok"), podatocite se konvertiraat vo JSON format
//* Podatocite se zacuvuvaat vo kesot so dodavanje na "data", i "cacheTime" (momentot na zacuvuvanje). Podatocite se iskoristuvaat kako odgovor na klientot
// try {
//   const response = await fetch(apiUrl);
//   if (response.ok) {
//     const data = await response.json();
//     cache[characterId] = {
//       data,
//       cacheTime: new Date().getTime(),
//     };
//     console.log("Saving data to cache");
//     res.json(data);
//   } else {
//* Ako baranjeto do API ne e uspesno ("response.ok" e "false"), se vraka soodvetna greska
//   res.status(response.status).json({ error: "Failed to fetch from API" });
// }
//* Ako se sluci greska pri prevzemanje na podatocite ili nekade vo kodot, se vraka greska so soodveten status
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal error" });
//   }
// };
    
// module.exports = {
//   getCharacter,
// };

    //! Vtor nacin
//* Ovaa linija kod definira modificirana verzija na f-jata "fetch" koja se koristi za pravenje HTTP baranja vo Javascript aplikacii
//* Ovaa modifikacija vklucuva koristenje na "import("node-fetch") za vcituvanje na modulot "node-fetch"
//* "fetch = ( ...args) =>" -  Ovaa sintaksa gi koristi argumentite na f-jata "fetch" kako parametri
//* "import("node-fetch") - Ova e dinamicko vcituvanje na modulot
//* ".then(({ default: fetch }) => fetch(...args))" - Po uspesnoto vcituvanje na modulot, ".then" metodot se povikuva i prenesuva objekt vo koj imeto "default" od objektot se prisvojuva na promenlivata "fetch"
//* "import" go vraka celiot modul kako objekt i edna od negovite svojstva e "default
    const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

//* Ovaa linija kod kreira objekt "cache" (kes) koj moze da se koristi za zacuvuvanje na podatoci vo memorijata
//* Kesot obicno se koristi za zacuvuvanje rezultati od skapi operacii ili podatoci koi se koristat cesto, so cel da se podobri performansata i da se namali vremeto potrebno za dobivanje na podatocite 
    let cache = {};

//* "getCharacter" e asinhrona f-ja sto znaci deka koristi "async" i moze da izvrsuva operacii koi se asinhroni (kako HTTP baranja) bez da go blokiraat izvrsuvanjeto
//* "url" e URL-to za baranje kon RickN'Morty API. Karakterot koj se bara se prenesuva kako parametar vo URL-to
    const getCharacter = async (req, res) => {
      let url = `https://rickandmortyapi.com/api/character/${req.params.id}`;
//* Ovie linii na kod sluzat za proverka i presmetuvanje na lokalniot kes ("localCache") na podatoci vo slucaj koga istite treba da se osvezat ili zamenat so novi informacii
//* "cache[req.params.id]" - se obiduva da pristapi do kesot za odredeniot karakter(id)
//* "cache[req.params.id].cacheTime !== null" - proveruva dali vo kesot ima informacii za vremeto na cuvanje na podatocite. Ako nema, toa znaci deka nema zacuvani podatoci vo kesot
//* "cache[req.params.id].cacheTime + 60 * 1000 < new Date().getTime()" - proveruva dali vremeto od poslednoto cuvanje na podatocite vo kesot e pogolemo od 60 sek (1 min). Ako pominalo poveke od 1 min, togas podatocite vo kesot treba da bidat osvezeni
//* "cache[req.params.id].localCache = null" - ako podatocite treba da se osvezat, se postavuva "localCache=null", sto znaci deka kesot za karakterot(id) e isciten i podatocite treba da se zamenat so novi
//! So ovoj if proveruvame dali e zastarena datata, i posle kolku vreme da se brise datata
      if ( 
//! dali imame vo kesot kluc so imeto na karakterot(id)
        cache[req.params.id] &&
//! dali vo objektot sto imame kluc i vremeto cacheTimeot ne e null
        cache[req.params.id].cacheTime !== null &&
//! ako ne e null i  vremeto cacheTime < segasnoto za 60 sekundi izbrisi gi podatocite za toj karakter(id)
        cache[req.params.id].cacheTime + 60 * 1000 < new Date().getTime()
        ) {
          cache[req.params.id].localCache = null;
        }

//* "!cache[req.params.id] || cache[req.params.id].localCache === null" - proveruva dali nema zacuvano podatoci vo kesot za odredeniot karakter(id), ili ako ima podatoci proveruvame dali "localCache === null". Ako uslovot e ispolnet, toa znaci deka podatocite ne s zacuvani ili zacuvanite podatocite se stari i treba da se zamenat
//* "let data = await fetch(url);" - pravi HTTP baranje do RickN'Morty API za da dobie svezi informacii za vremeto i gradot
//* "cache[req.params.id] = { ... }" - kreira nov objekt vo kesot za karakterot(id). Vo ovoj objekt se zacuvuvaat novite informacii za vremeto kako "localCache", a "cacheTime" go postavuva momentalnoto vreme
//* "return res.send(cache);" - go vraka celiot kes kako odgovor na baranjeto 
//! ako nemame karakter(id) vo kesot ili ako karakterot(id) so localCache = null  togas da se refetceneme so RickN'Morty API
          if (!cache[req.params.id] || cache[req.params.id].localCache === null) {
            let data = await fetch(url);
            cache[req.params.id] = { 
              localCache: await data.json(),
              cacheTime: new Date().getTime(),
            };
          }
          return res.send(cache);
        };

        module.exports = {
          getCharacter,
        };