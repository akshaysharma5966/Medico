const Medicine = require("../models/medicine");

const ITEMS_PER_PAGE = 15;

exports.getMedicines = (req, res, next) => {
  const page = req.query.page;
  Medicine.find()
    .skip(ITEMS_PER_PAGE * page)
    .limit(ITEMS_PER_PAGE)
    .then((medicines) => {
      res.status(200).json(medicines);
    })
    .catch((err) => {
      console.log(err);
    });
};
