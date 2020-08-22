const Diagnolotic = require("../models/diagnolotic");

exports.getDiagnolotic = (req, res, next) => {
	Diagnolotic.find()
		.then((diagnolotics) => res.status(200).json(diagnolotics))
		.catch((err) => console.log(err));
};
