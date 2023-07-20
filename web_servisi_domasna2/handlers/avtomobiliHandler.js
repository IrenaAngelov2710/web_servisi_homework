const Avtomobil = require("../pkg/avtomobili/avtomobiliSchema");

// Kreiranje na nov dokument vo kolekcijata
exports.create = async (req, res) => {
    try {
      const newAvtomobil = await Avtomobil.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          avtomobil: Avtomobil,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  };

  // Prikazuvanje na site dokumenti vo kolekcijata
  exports.getAll = async (req, res) => {
    try {
      console.log(req.query);
      // pravime kopija od objektot ne sakame da go modificirame originalnoto query
      const queryObj = { ...req.query };
      // ovoj objekt go konvertirame vo string
      let queryString = JSON.stringify(queryObj);
      // go modificirame stringot
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      // od koga ke go modificirame go vrakame nazad vo objekt
      const query = JSON.parse(queryString);
      // so find metodagta gi zemame site dokumenti od edna kolekcija
      const avtomobili = await Avtomobil.find(query);
       
      res.status(200).json({
        status: "Success",
        data: {
          avtomobili: avtomobili,
        },
      }); 
    }
    catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      });
    }
  };

  // Prikazuvanje na eden dokument od kolekcijata po ID
  exports.getOne = async (req, res) => {
    try {
      const avtomobil = await Avtomobil.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          avtomobil,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  // Promena nekoja vo dokumentot od kolekcijata po ID
  exports.update = async (req, res) => {
    try {
      console.log(req.file);
      console.log(req.body);
  
      const avtomobil = await Avtomobil.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          avtomobil,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  // Brisenje na nekoj dokument od kolekcijata po ID
  exports.delete = async (req, res) => {
    try {
      await Avtomobil.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: err });
    }
  };