const Telefon = require("../pkg/telefoni/telefoniSchema");

// Kreiranje na nov dokument vo kolekcijata
exports.create = async (req, res) => {
    try {
      const newTelefon = await Telefon.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          telefon: Telefon,
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
      let telefoni = await Telefon.find();
      res.status(200).json({
        status: "success",
        data: {
          telefoni,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  // Prikazuvanje na eden dokument od kolekcijata po ID
  exports.getOne = async (req, res) => {
    try {
      const telefon = await Telefon.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          telefon,
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
  
      const telefon = await Telefon.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          telefon,
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
      await Telefon.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: err });
    }
  };