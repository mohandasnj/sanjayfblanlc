import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentEbook,
  clearCurrentAssignedEbooks,
  clearCurrentUnassignedEbooks,
  clearCurrentStudents,
  clearCurrentStudent,
  clearCurrentWeeklyReport,
  clearCurrentUserStudent
} from "../../actions/ebookActions";
import logo from "./img/logo.png";
import default_face from "./img/default_face.png";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentEbook();
    this.props.clearCurrentAssignedEbooks();
    this.props.clearCurrentUnassignedEbooks();
    this.props.clearCurrentStudents();
    this.props.clearCurrentStudent();
    this.props.clearCurrentWeeklyReport();
    this.props.clearCurrentUserStudent();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    //console.log(user);
    const authLinksTeacher = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-6">
          <a
            href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={default_face}
              //{user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const authLinksStudents = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-6">
          <a
            href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={default_face}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-2">
        <div id="nav" className="navbar-left">
          <a href="/" className="nav-link">
            <img
              className="navbar-brand"
              src={logo}
              alt="AP STAT"
              // style={{ width: "121px", height: "50px" }}
              style={{ width: "80px", height: "80px" }}
            />{" "}
          </a>
        </div>

        <div className="container">
          <div className="collapse navbar-collapse text-white" id="mobile-nav">
            <ul className="navbar-nav ml-left">
              <li className="navbar-brand active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-left">
              <li className="navbar-brand active">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
            </ul>
            {isAuthenticated
              ? user.role === "teacher"
                ? authLinksTeacher
                : user.role === "student"
                ? authLinksStudents
                : guestLinks
              : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentEbook,
    clearCurrentAssignedEbooks,
    clearCurrentUnassignedEbooks,
    clearCurrentStudents,
    clearCurrentStudent,
    clearCurrentWeeklyReport,
    clearCurrentUserStudent
  }
)(Navbar);
