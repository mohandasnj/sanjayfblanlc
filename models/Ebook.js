const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EbookSchema = new Schema({
  teacherid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  bookname: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  datepublished: {
    type: String,
    required: true
  },
  isbn13: {
    type: String
  }
});

module.exports = Ebook = mongoose.model("ebooks", EbookSchema);
