const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTrackBookInput(data) {
  let errors = {};

  data.bookname = !isEmpty(data.bookname) ? data.bookname : "";
  data.redemptioncode = !isEmpty(data.redemptioncode)
    ? data.redemptioncode
    : "";
  data.studentid = !isEmpty(data.studentid) ? data.studentid : "";

  if (Validator.isEmpty(data.bookname)) {
    errors.bookname = "A book must be selected";
  }

  if (Validator.isEmpty(data.redemptioncode)) {
    errors.redemptioncode = "The redemptioncode of the book is required";
  }

  if (Validator.isEmpty(data.studentid)) {
    errors.studentid = "The student id is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
