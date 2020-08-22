const Medicine = require("../models/medicine");

exports.getMedicines = (req, res, next) => {
	Medicine.find()
		.then((medicines) => {
			res.status(200).json(medicines);
		})
		.catch((err) => {
			console.log(err);
		});
};
