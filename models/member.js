const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    id: {
      type: String,
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
    groupId: {
      type: Number,
      required: true,
    },
    relation: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    renewalFlag: {
      type: Number,
      required: true,
    },
    activeFlag: {
      type: Number,
      required: true,
    },
    activePlanId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
