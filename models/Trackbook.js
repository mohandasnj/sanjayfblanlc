const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TrackbookSchema = new Schema({
  bookname: {
    type: String,
    required: true
  },
  studentid: {
    type: String
  },
  redemptioncode: {
    type: String,
    required: true
  },
  issueddate: {
    type: Date,
    default: Date.now
  },
  teacherid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Trackbook = mongoose.model("trackbooks", TrackbookSchema);
