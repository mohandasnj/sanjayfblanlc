import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link, withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import { createStudent } from "../../actions/ebookActions";

class CreateStudent extends Component {
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
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
      grade: this.state.grade
    };

    this.props.createStudent(studentData, this.props.history);
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
              <Link to="/dashboard" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Student</h1>
              <p className="lead text-center">
                Let's get some information to create a student record
              </p>
              <small className="d-block pb-3">* = Required Fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Student ID"
                  name="studentid"
                  value={this.state.studentid}
                  onChange={this.onChange}
                  error={errors.studentid}
                  info="Enter the Student ID"
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
                  value={this.state.aumiddleinitialthor}
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

CreateStudent.propTypes = {
  auth: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  student: state.student,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createStudent }
)(withRouter(CreateStudent));
