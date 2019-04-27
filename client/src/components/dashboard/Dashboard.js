import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentEbook,
  getUnassignedEbooks,
  getAssignedEbooks,
  getAllStudents
} from "../../actions/ebookActions";
import Spinner from "../common/Spinner";
import EbookActions from "./EbookActions";
import TrackCode from "./TrackCode";
import IssuedBooks from "./IssuedBooks";
import TrackStudent from "./TrackStudent";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }
    }
    this.props.getCurrentEbook();
    this.props.getAllStudents();
    this.props.getAssignedEbooks();
    this.props.getUnassignedEbooks();
  }

  render() {
    const { user } = this.props.auth;
    const { ebook, loading } = this.props.ebook;
    const { allstudents } = this.props.allstudents;
    const { ebookassigned } = this.props.ebookassigned;
    const { ebookunassigned } = this.props.ebookunassigned;

    let dashboardbookname;
    let dashboardebookContent;
    let dashboardallstudentsContent;
    let dashboardSpinnerContent;
    let dashboardebookassignedContent;
    let dashboardebookunassignedContent;

    if (ebook === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      // Check if logged in user has ebook data
      if (Object.keys(ebook).length > 0) {
        dashboardbookname = ebook[0].bookname;

        dashboardebookContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <EbookActions />
          </div>
        );
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

    if (allstudents === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      // Check if logged in user has ebook data
      if (Object.keys(allstudents).length > 0) {
        dashboardallstudentsContent = (
          <div>
            <TrackStudent allstudents={allstudents} />
          </div>
        );
      } else {
        // User is logged in but has no student record
        dashboardallstudentsContent = (
          <div>
            <h4 className="mb-4">Track the student information</h4>
            <p>
              You have not yet created any students, please add a student
              record, using the above button
            </p>
          </div>
        );
      }
    }

    if (ebookassigned === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      if (Object.keys(ebookassigned).length > 0) {
        dashboardebookassignedContent = (
          <div>
            <IssuedBooks ebookassigned={ebookassigned} />
          </div>
        );
      } else {
        // User is logged in but has no ebook
        dashboardebookassignedContent = (
          <div>
            <h4 className="mb-4">Track the issuance of e-books</h4>
            <p>
              You have not yet assigned an ebook to any student, please assign
              using the above button
            </p>
          </div>
        );
      }
    }

    if (ebookunassigned === null || loading) {
      dashboardSpinnerContent = <Spinner />;
    } else {
      // Check if logged in user has ebook data
      if (Object.keys(ebookunassigned).length > 0) {
        dashboardebookunassignedContent = (
          <div>
            <TrackCode ebookunassigned={ebookunassigned} />
          </div>
        );
      } else {
        // User is logged in but has no ebook
        dashboardebookunassignedContent = (
          <div>
            <h4 className="mb-4">Track the redemption codes</h4>
            <p>
              You have not yet created an ebook copy, please add an ebook copy,
              using the above button
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
              <h3 className="mb-4 text-center">
                Book Name: {dashboardbookname}
              </h3>
              {dashboardebookContent}
              {dashboardallstudentsContent}
              {dashboardSpinnerContent}
              {dashboardebookassignedContent}
              {dashboardebookunassignedContent}
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
  ebookunassigned: state.ebookunassigned,
  ebookassigned: state.ebookassigned,
  allstudents: state.allstudents
});

Dashboard.propTypes = {
  getCurrentEbook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ebook: PropTypes.object.isRequired,
  getUnassignedEbooks: PropTypes.func.isRequired,
  getAssignedEbooks: PropTypes.func.isRequired,
  getAllStudents: PropTypes.func.isRequired,
  ebookunassigned: PropTypes.object.isRequired,
  ebookassigned: PropTypes.object.isRequired,
  allstudents: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getCurrentEbook,
    getAllStudents,
    getAssignedEbooks,
    getUnassignedEbooks
  }
)(Dashboard);
