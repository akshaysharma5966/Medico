const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const physiotherapySpeciality = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    treatmentMode: {
      type: String,
      required: true,
    },
    provTypeCode: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PhysiotherapySepciality",
  physiotherapySpeciality,
  "physiotherapy_specialities"
);
