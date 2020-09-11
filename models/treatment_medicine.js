const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentMedicine = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    providerTypeCode: {
      type: String,
      required: true,
    },
    procedureName: {
      type: String,
      required: true,
    },
    preProcedureDetails: {
      type: String,
      required: true,
    },
    postProcedureDetails: {
      type: String,
      required: true,
    },
    procedureVideo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    procedureDetails: {
      type: String,
      required: true,
    },
    testDetails: {
      type: String,
      required: true,
    },
    drugDetails: {
      type: String,
      required: true,
    },
    homeHealthcare: {
      type: String,
      required: true,
    },
    qualificationNeeded: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    minCost: {
      type: String,
      required: true,
    },
    maxCost: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Treatment&Medicine", treatmentMedicine);
