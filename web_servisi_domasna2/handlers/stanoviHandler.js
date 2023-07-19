const Stan = require("../pkg/stanovi/stanoviSchema");

// Kreiranje na nov dokument vo kolekcijata
exports.create = async (req, res) => {
    try {
        const newStan = await Stan.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                stan: Stan,
            }
        });
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

// Prikazuvanje na site dokumenti vo kolekcijata
exports.getAll = async (req, res) => {
    try {
        let stanovi = await Stan.find();
        res.status(200).json({
            status: "success",
            data: {
                stanovi,
            },
        });
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

// Prikazuvanje na eden dokument od kolekcijata po ID
exports.getOne = async (req, res) => {
    try {
      const stan = await Stan.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          stan,
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
  
      const stan = await Stan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          stan,
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
      await Stan.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: err });
    }
  };