import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link, withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import { editStudent, getStudentByStudentID } from "../../actions/ebookActions";
import isEmpty from "../../validation/is-empty";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentid: "",
      firstname: "",
      middleinitial: "",
      lastname: "",
      email: "",
      grade: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.student.student) {
      const student_record = nextProps.student.student[0];

      student_record.studentid = !isEmpty(student_record.studentid)
        ? student_record.studentid
        : "";
      student_record.firstname = !isEmpty(student_record.firstname)
        ? student_record.firstname
        : "";
      student_record.middleinitial = !isEmpty(student_record.middleinitial)
        ? student_record.middleinitial
        : "";
      student_record.lastname = !isEmpty(student_record.lastname)
        ? student_record.lastname
        : "";
      student_record.email = !isEmpty(student_record.email)
        ? student_record.email
        : "";
      student_record.grade = !isEmpty(student_record.grade)
        ? student_record.grade
        : "";

      // Set component fields state
      this.setState({
        studentid: student_record.studentid,
        firstname: student_record.firstname,
        middleinitial: student_record.middleinitial,
        lastname: student_record.lastname,
        email: student_record.email,
        grade: student_record.grade
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const studentData = {
      studentid: this.state.studentid,
      firstname: this.state.firstname,
      middleinitial: this.state.middleinitial,
      lastname: this.state.lastname,
      email: this.state.email,
      grade: this.state.grade,
      errors: {}
    };
    this.props.editStudent(studentData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for grade
    const options = [
      { label: "* Select the grade", value: 0 },
      {
        label: "9",
        value: "9"
      },
      {
        label: "10",
        value: "10"
      },
      {
        label: "11",
        value: "11"
      },
      {
        label: "12",
        value: "12"
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Student</h1>
              <p className="lead text-center">Update a student record</p>
              <small className="d-block pb-3">* = Required Fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Student ID"
                  name="studentid"
                  value={this.state.studentid}
                  onChange={this.onChange}
                  error={errors.studentid}
                  info="Student ID is unique and cannot be edited."
                  label={"true"}
                />
                <TextFieldGroup
                  placeholder="* First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.firstname}
                  info="Enter the First Name"
                />
                <TextFieldGroup
                  placeholder="Middle Initials"
                  name="middleinitial"
                  value={this.state.middleinitial}
                  onChange={this.onChange}
                  error={errors.middleinitial}
                  info="Enter the Middle Initials"
                />
                <TextFieldGroup
                  placeholder="* Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                  info="Enter the Last Name"
                />
                <TextFieldGroup
                  placeholder="* Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Enter the Email ID"
                />
                <SelectListGroup
                  placeholder="* Grade"
                  name="grade"
                  value={this.state.grade}
                  options={options}
                  onChange={this.onChange}
                  error={errors.grade}
                  info="Select Grade"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditStudent.propTypes = {
  editStudent: PropTypes.func.isRequired,
  getStudentByStudentID: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { editStudent, getStudentByStudentID }
)(withRouter(EditStudent));
