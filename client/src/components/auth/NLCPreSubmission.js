import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class NLCPreSubmission extends Component {
  constructor() {
    super();
    this.state = {
      email: "john.smith@gmail.com",
      password: "password",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "teacher") {
        this.props.history.push("/dashboard");
      } else if (this.props.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.user.role === "teacher") {
        this.props.history.push("/dashboard");
      } else if (nextProps.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <form onSubmit={this.onSubmit}>
                <input
                  type="submit"
                  value="NLC Demo Auto Login For Prejudging"
                  className="btn btn-info btn-block mt-4"
                />
                <br />
              </form>
            </div>
            <center>
              <p className="text-secondary">
                Instructions to run the Program: Judges may click "NLC Demo Auto
                Login For Prejudging" button above to access the website without
                having to login to the teacher's account, instead the demo
                account is ready to use. If you would like to sign or login to
                an account, you may logout of the demo account, and register for
                a teacher or student account and login manually.
              </p>
            </center>
          </div>
        </div>

        <p className="text-primary">
          This website program allows AP Statistics class teachers to manage the
          issuance of e-books to their class of students. Instructions to
          navigate the site & which buttons to use are as follows:
        </p>
        <div className="container">
          <div className="row">
            <div className="col-md-13 m-auto">
              <ul class="list-group">
                <li class="list-group-item">
                  1. To edit eBook info and/or to select a different eBook for
                  transaction. Click on the "Edit eBook" button. ==>
                  <button
                    type="button"
                    className="btn btn-secondary mr-3 btn-sm disabled"
                  >
                    <i className="fa fa-book text-info  mr-1" /> Edit eBook
                  </button>
                </li>
                <li class="list-group-item">
                  2. To add a student and enter their information. Click on the
                  "Add Student" button. ==>
                  <button
                    type="button"
                    className="btn btn-secondary mr-3 btn-sm disabled"
                  >
                    <i className="fa fa-user-plus text-info mr-1" />
                    Add Student
                  </button>
                </li>
                <li class="list-group-item">
                  3. To create the redemption codes for each individual copy of
                  the eBook. Click on the "Add eBook Copy" button. ==>
                  <button
                    type="button"
                    className="btn btn-secondary mr-3 btn-sm disabled"
                  >
                    <i className="fa fa-barcode fa_custom fa-1x text-info mr-1" />
                    Add eBook Copy
                  </button>
                </li>
                <li class="list-group-item">
                  4. To assign an eBook to a student. Click on the "Issue eBook"
                  button. ==>
                  <button
                    type="button"
                    className="btn btn-secondary mr-3 btn-sm disabled"
                  >
                    <i className="fa fa-shopping-cart text-info mr-1" />
                    Issue eBook
                  </button>
                </li>
                <li class="list-group-item">
                  5. To view the weekly report of all the transactions that have
                  occurred. Click on the "Weekly Report" button. ==>
                  <button
                    type="button"
                    className="btn btn-secondary mr-3 btn-sm disabled"
                  >
                    <i className="fa fa-table text-info mr-1" />
                    Weekly Report
                  </button>
                </li>
                <li class="list-group-item">
                  6. Below all the buttons, lies the dashboard where you can
                  view, edit, and delete all student information, issuance of
                  eBooks, and redemption codes.
                </li>
                <li class="list-group-item">
                  7. If you would like to know more about the purpose of the
                  application or contact the developer, click on the "About Us"
                  link at the top.
                </li>
                <li class="list-group-item">
                  8. Once you are done with the experience, you may log out.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NLCPreSubmission.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(NLCPreSubmission);
