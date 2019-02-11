const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTrackRedemptionCodeInput(
  data,
  redemptioncode
) {
  let errors = {};

  data.bookname = !isEmpty(data.bookname) ? data.bookname : "";
  if (!isEmpty(data.redemptioncode)) {
    data.redemptioncode = data.redemptioncode;
  } else if (!isEmpty(redemptioncode)) {
    data.redemptioncode = redemptioncode;
  } else {
    data.redemptioncode = "";
  }

  if (Validator.isEmpty(data.bookname)) {
    errors.bookname = "A book must be selected";
  }

  if (Validator.isEmpty(data.redemptioncode)) {
    errors.redemptioncode = "The redemptioncode of the book is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
