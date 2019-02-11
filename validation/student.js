const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentInput(data) {
  let errors = {};

  data.studentid = !isEmpty(data.studentid) ? data.studentid : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.middleinitial = !isEmpty(data.middleinitial) ? data.middleinitial : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.grade = !isEmpty(data.grade) ? data.grade : "10";

  if (!Validator.isLength(data.studentid, { min: 4, max: 5 })) {
    errors.studentid = "Student ID must be between 4 or 5 digits long";
  }

  if (!Validator.isInt(data.studentid)) {
    errors.studentid = "Student ID must be 4 to 5 numbers";
  }

  if (Validator.isEmpty(data.studentid)) {
    errors.studentid = "Student ID field is required";
  }

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "First name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }

  if (!Validator.isLength(data.middleinitial, { min: 0, max: 1 })) {
    errors.middleinitial = "Middle initial must be 1 letter long";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Last name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isInt(data.grade, { min: 9, max: 12 })) {
    errors.grade = "Grade must be between 9 and 12";
  }

  if (Validator.isEmpty(data.grade)) {
    errors.grade = "Grade field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
