const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicine = new Schema(
	{
		id: {
			type: Number,
			required: true,
		},
		drug_name: {
			type: String,
			required: true,
		},
		composition: {
			type: String,
			required: true,
		},
		manufacturer: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		packing: {
			type: String,
			required: true,
		},
		introduction: {
			type: String,
			required: true,
		},
		use_of_medicine: {
			type: String,
			required: true,
		},
		side_effect: {
			type: String,
			required: true,
		},
		how_to_cope: {
			type: String,
			required: true,
		},
		how_to_use: {
			type: String,
			required: true,
		},
		how_it_work: {
			type: String,
			required: true,
		},
		saftey_Advice: {
			type: String,
			required: true,
		},
		if_forget: {
			type: String,
			required: true,
		},
		expert_advice: {
			type: String,
			required: true,
		},
		alternate_brand: {
			type: String,
			required: true,
		},
		interaction_with_drug: {
			type: String,
			required: true,
		},
		patient_concerns: {
			type: String,
			required: true,
		},
		related_product: {
			type: String,
			required: true,
		},
		feed_backs: {
			type: String,
			required: true,
		},
		ayurvedic_ingredients: {
			type: String,
			required: true,
		},
		related_lab_test: {
			type: String,
			required: true,
		},
		faq: {
			type: String,
			required: true,
		},
		references: {
			type: String,
			required: true,
		},
		manufacturer_address: {
			type: String,
			required: true,
		},
		vendor_partner: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Medicine", medicine);
