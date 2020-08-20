const Doctor = require("../models/doctor");

exports.getDoctors = (req, res, next) => {
	Doctor.find()
		.then((doctors) => {
			res.status(200).json(doctors);
		})
		.catch((err) => console.log(err));
};
