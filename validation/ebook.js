const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEbookInput(data) {
  let errors = {};

  data.bookname = !isEmpty(data.bookname) ? data.bookname : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.datepublished = !isEmpty(data.datepublished) ? data.datepublished : "";
  data.isbn13 = !isEmpty(data.isbn13) ? data.isbn13 : "";

  if (Validator.isEmpty(data.bookname)) {
    errors.bookname = "A book must be selected";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "The author of the book is required";
  }

  if (Validator.isEmpty(data.datepublished)) {
    errors.datepublished = "The publication date of the book is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
