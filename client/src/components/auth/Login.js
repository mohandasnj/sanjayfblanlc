import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <small className="d-block pb-3">* = required fields</small>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="* Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
                <div />
                <hr />
                <center>
                  <Link
                    to="/NLCPreSubmission"
                    className="btn btn-lg btn-info mr-2"
                  >
                    <center>Click Here - NLC Prejudging Homepage</center>
                  </Link>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
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
)(Login);
