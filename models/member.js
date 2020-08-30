const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cityId: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  employeeTag: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  groupid: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  renewalFlag: {
    type: String,
    required: true,
  },
  activeFlag: {
    type: String,
    required: true,
  },
  activePlanId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);
