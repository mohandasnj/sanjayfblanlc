import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getStudentWeeklyReport,
  getCurrentUserStudent
} from "../../actions/ebookActions";
import Spinner from "../common/Spinner";
import SWRIssuedBooks from "./SWRIssuedBooks";

class StudentWeeklyReport extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "teacher") {
        this.props.history.push("/dashboard");
      }
      this.props.getStudentWeeklyReport();
      this.props.getCurrentUserStudent();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { weeklyreport, loading } = this.props.weeklyreport;
    const { currentuserstudent } = this.props.currentuserstudent;

    let dashboardstudentContent;
    let dashboardcurrentuserstudent;
    let dashboardSpinnerContent;
    let dashboardstudentweeklyreportContent;

    dashboardstudentContent = (
      <div>
        <p className="lead text-muted">Student name : {user.name}</p>
      </div>
    );

    if (currentuserstudent === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      if (Object.keys(currentuserstudent).length > 0) {
        if (currentuserstudent.length > 0) {
          dashboardcurrentuserstudent = currentuserstudent.map(ab => (
            <p className="lead text-muted">Teacher name : {ab.name}</p>
          ));
        }
      }
    }

    if (weeklyreport === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      if (Object.keys(weeklyreport).length > 0) {
        //console.log("inside weeklyreport");
        dashboardstudentweeklyreportContent = (
          <div>
            <SWRIssuedBooks weeklyreport={weeklyreport} />
          </div>
        );
      } else {
        // User is logged in but has no ebook
        dashboardstudentweeklyreportContent = (
          <div>
            <p>
              This week no ebooks are assigned to you. Reach out to your teacher
              if you have any questions.
            </p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/dashboardstudent" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-10 text-center">Weekly Report</h1>
              {dashboardSpinnerContent}
              {dashboardstudentContent}
              {dashboardcurrentuserstudent}
              {dashboardstudentweeklyreportContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  weeklyreport: state.weeklyreport,
  currentuserstudent: state.currentuserstudent
});

StudentWeeklyReport.propTypes = {
  auth: PropTypes.object.isRequired,
  getStudentWeeklyReport: PropTypes.func.isRequired,
  weeklyreport: PropTypes.object.isRequired,
  getCurrentUserStudent: PropTypes.func.isRequired,
  currentuserstudent: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getStudentWeeklyReport,
    getCurrentUserStudent
  }
)(StudentWeeklyReport);
