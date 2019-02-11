const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  studentid: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  middleinitial: {
    type: String
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  teacherid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
