const mongoogse = require("mongoose");
const Schema = mongoogse.Schema;

const diagnostic = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    pmhRate: {
      type: String,
      required: true,
    },
    homeTestFlag: {
      type: String,
      required: true,
    },
    fastingFlag: {
      type: String,
      required: true,
    },
    bloodQuantityRequired: {
      type: String,
      required: true,
    },
    testResults: {
      type: String,
      required: true,
    },
    detailedDescription: {
      type: String,
      required: true,
    },
    diseaseListForWhichTheseTestIsConducted: {
      type: String,
      required: true,
    },
    minAge: {
      type: Number,
      required: true,
    },
    maxAge: {
      type: Number,
      required: true,
    },
    needDocPrescriptionFlag: {
      type: String,
      required: true,
    },
    testType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoogse.model("Diagnostic", diagnostic);
