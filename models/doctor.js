const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		qualification: {
			type: String,
			required: true,
		},
		specialization: {
			type: String,
			required: true,
		},
		experience: {
			type: Number,
			required: true,
		},
		treatment_type: {
			type: String,
			required: true,
		},
		picture: {
			type: String,
			required: true,
		},
		city_id: {
			type: String,
			required: true,
		},
		pin_code: {
			type: Number,
			required: true,
		},
		reg_id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		mobile: {
			type: Number,
			required: true,
		},
		from_time: {
			type: String,
			required: true,
		},
		to_time: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
