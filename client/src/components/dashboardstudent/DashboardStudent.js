import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getStudentAssignedEbooks,
  getCurrentUserStudent
} from "../../actions/ebookActions";
import Spinner from "../common/Spinner";
import StudentActions from "./StudentActions";
import StudentIssuedBooks from "./StudentIssuedBooks";

class DashboardStudent extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "teacher") {
        this.props.history.push("/dashboard");
      }
    }
    this.props.getStudentAssignedEbooks();
    this.props.getCurrentUserStudent();
  }

  render() {
    const { user } = this.props.auth;
    const { ebookassigned, loading } = this.props.ebookassigned;

    const { currentuserstudent } = this.props.currentuserstudent;

    let dashboardSpinnerContent;
    let dashboardstudentactionsContent;
    let dashboardstudentContent;
    let dashboardcurrentuserstudent;
    let dashboardstudentebookassignedContent;

    dashboardstudentactionsContent = (
      <div>
        <StudentActions />
      </div>
    );

    dashboardstudentContent = (
      <div>
        <h4 className="mb-3">Welcome {user.name}</h4>
      </div>
    );

    if (currentuserstudent === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      if (Object.keys(currentuserstudent).length > 0) {
        if (currentuserstudent.length > 0) {
          dashboardcurrentuserstudent = currentuserstudent.map(ab => (
            <p className="lead text-muted mb-5">
              Your teacher name : {ab.name}
            </p>
          ));
        }
      }
    }

    if (ebookassigned === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      if (Object.keys(ebookassigned).length > 0) {
        dashboardstudentebookassignedContent = (
          <div>
            <StudentIssuedBooks ebookassigned={ebookassigned} />
          </div>
        );
      } else {
        // User is logged in but has no ebook
        dashboardstudentebookassignedContent = (
          <div>
            <h4 className="mb-4">Assigned e-books</h4>
            <p>
              You have not been assigned with any eBooks. Reach out to your
              teacher if you have any questions.
            </p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-25">
              <h1 className="display-10 text-center">Student Dashboard</h1>
              {dashboardSpinnerContent}
              {dashboardstudentactionsContent}
              {dashboardstudentContent}
              {dashboardcurrentuserstudent}
              {dashboardstudentebookassignedContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ebookassigned: state.ebookassigned,
  currentuserstudent: state.currentuserstudent
});

DashboardStudent.propTypes = {
  auth: PropTypes.object.isRequired,
  getStudentAssignedEbooks: PropTypes.func.isRequired,
  ebookassigned: PropTypes.object.isRequired,
  getCurrentUserStudent: PropTypes.func.isRequired,
  currentuserstudent: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getStudentAssignedEbooks,
    getCurrentUserStudent
  }
)(DashboardStudent);
