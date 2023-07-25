const Oglas = require("../pkg/oglasi/oglasiSchema");

exports.getLoginForm = async (req, res) => {
  try{
      res.status(200).render("login", {
          title: "Login"
      }) //se renderira ejs file
  }
  catch(err) {
      res.status(500).send("Error!");
  }
};

exports.oglasiView = async (req, res) => {
    try{
        const oglasi = await Oglas.find();

        res.status(200).render("viewOglasi", {
            status: "Success",
            naslov: "OGLASI",
            text: "Kupi ili prodadi",
            oglasi,
        });
    }
    catch(err) {
        res.status(500).send("Error with this page!");
    }
};
exports.createOglas = async (req, res) => {
  try{
      console.log(req.auth);
      await Oglas.create(req.body);
      res.redirect("/viewOglasi");
  }
  catch(err) {
      res.status(500).send(err);
  }
}