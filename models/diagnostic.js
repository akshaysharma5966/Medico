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
  },
  { timestamps: true }
);

module.exports = mongoogse.model("Diagnostic", diagnostic);
