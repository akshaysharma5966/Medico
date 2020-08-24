const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicine = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    drugName: {
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
    useOfMedicine: {
      type: String,
      required: true,
    },
    sideEffect: {
      type: String,
      required: true,
    },
    howToCope: {
      type: String,
      required: true,
    },
    howToUse: {
      type: String,
      required: true,
    },
    howItWork: {
      type: String,
      required: true,
    },
    safteyAdvice: {
      type: String,
      required: true,
    },
    ifForget: {
      type: String,
      required: true,
    },
    expertAdvice: {
      type: String,
      required: true,
    },
    alternateBrand: {
      type: String,
      required: true,
    },
    interactionWithDrug: {
      type: String,
      required: true,
    },
    patientConcerns: {
      type: String,
      required: true,
    },
    relatedProduct: {
      type: String,
      required: true,
    },
    feedBacks: {
      type: String,
      required: true,
    },
    ayurvedicIngredients: {
      type: String,
      required: true,
    },
    relatedLabTest: {
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
    manufacturerAddress: {
      type: String,
      required: true,
    },
    vendorPartner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicine);
