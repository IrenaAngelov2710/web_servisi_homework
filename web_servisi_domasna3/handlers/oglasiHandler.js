const Oglas = require ("../pkg/oglasi/oglasiSchema");

  // Prikazuvanje na site dokumenti vo kolekcijata
  exports.getAllOglasi = async(req, res) => {
    try{
        //filtriranje na podatoci preku query
        const queryObj = {...req.query} //kreiranje kopija
        let queryString = JSON.stringify(queryObj) //konvertiranje vo string
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`) //da se zameni $
        const query = JSON.parse(queryString); //go vrakjame vo objekt

        const oglasi = await Oglas.find(query);

        res.status(200).json({
            status: "success",
            data: {
                oglasi
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

// Kreiranje na nov dokument vo kolekcijata
exports.createOglas = async (req, res) => {
    try{
      const newOglas = await Oglas.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          oglas: newOglas,
        }
      })
    }catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      });
    }
  };

// Prikazuvanje na eden dokument od kolekcijata po ID
exports.getOneOglas = async (req, res) => {
    try{
      const oglas = await Oglas.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          oglas,
        }
      })
    }catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      });
    }
  };

  // Promena nekoja vo dokumentot od kolekcijata  po ID
  exports.updateOglas = async (req, res) => {
    try{
      const updatedOglas = await Oglas.findByIdAndUpdate(req.params.id, req.body,
        {
          new: true,
          runValidators: true,        
        });
        res.status(200).json({
          status: "success",
          data: {
            updatedOglas,
          }
        });
    }catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      });
    }
  };

  // Brisenje na nekoj dokument od kolekcijata po ID
  exports.deleteOglas = async (req, res) => {
    try{
      await Oglas.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    }catch(err){
      res.status(404).json({
        status: "fail",
        message: err
      });
    }
  };

  // Kreiranje na nov dokument vo kolekcijata so ime na user
  exports.createByUser = async (req, res, next) => {
    try {
      const oglasPost = await Oglas.create({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        author: req.auth.id
      });

      res.status(201).json(oglasPost);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  // Prikazuvanje na odredeni dokumenti vo kolekcijata so ime na user
  exports.getByUser = async (req, res) => {
    try {
      const userId = req.auth.id;
      const myOglas = await Oglas.find({ author: userId });
  
      res.status(201).json(myOglas);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };