const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insurance = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    insuranceCo: {
      type: String,
      required: true,
    },
    insCode: {
      type: String,
      required: true,
    },
    telAreaCode: {
      type: String,
      required: true,
    },
    telNo: {
      type: String,
      required: true,
    },
    faxNo: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    webId: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    addressArea: {
      type: String,
      required: true,
    },
    cityCode: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    stateCode: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    officeType: {
      type: String,
      required: true,
    },
    parentCode: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    compAvail: {
      type: String,
      required: true,
    },
    oldInsCode: {
      type: String,
      required: true,
    },
    mainInsCode: {
      type: String,
      required: true,
    },
    doCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insurance", insurance);
