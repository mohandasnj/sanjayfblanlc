import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentEbook, getWeeklyReport } from "../../actions/ebookActions";
import Spinner from "../common/Spinner";
import WRIssuedBooks from "./WRIssuedBooks";

class WeeklyReport extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }

      this.props.getCurrentEbook();
      this.props.getWeeklyReport();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { ebook, loading } = this.props.ebook;
    const { weeklyreport } = this.props.weeklyreport;

    let dashboardbookname;
    let dashboardebookContent;
    let dashboardSpinnerContent;
    let dashboardweeklyreportContent;

    if (ebook === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      // Check if logged in user has ebook data
      if (Object.keys(ebook).length > 0) {
        //if (Object.keys(ebookassigned).length > 0) {
        dashboardbookname = ebook[0].bookname;

        dashboardebookContent = (
          <div>
            <p className="lead text-muted">Book Name : {dashboardbookname}</p>
            <p className="lead text-muted">Class Teacher : {user.name}</p>
          </div>
        );
        //}
      } else {
        // User is logged in but has no ebook
        dashboardebookContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet created an ebook, please add an ebook</p>
            <Link to="/create-ebook" className="btn btn-lg btn-info">
              Create an eBook
            </Link>
          </div>
        );
      }
    }

    if (weeklyreport === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      if (Object.keys(weeklyreport).length > 0) {
        //console.log("inside weeklyreport");
        dashboardweeklyreportContent = (
          <div>
            <WRIssuedBooks weeklyreport={weeklyreport} />
          </div>
        );
      } else {
        // User is logged in but has no ebook
        dashboardweeklyreportContent = (
          <div>
            <p>This week no ebooks are assigned to any student.</p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/dashboard" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-10 text-center">Weekly Report</h1>
              {dashboardebookContent}
              {dashboardSpinnerContent}
              {dashboardweeklyreportContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ebook: state.ebook,
  auth: state.auth,
  weeklyreport: state.weeklyreport
});

WeeklyReport.propTypes = {
  getCurrentEbook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ebook: PropTypes.object.isRequired,
  getWeeklyReport: PropTypes.func.isRequired,
  weeklyreport: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getCurrentEbook,
    getWeeklyReport
  }
)(WeeklyReport);
