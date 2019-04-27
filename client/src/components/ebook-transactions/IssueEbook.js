import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  issueEbook,
  getCurrentEbook,
  getUnassignedEbooks,
  getAllStudents
} from "../../actions/ebookActions";
import isEmpty from "../../validation/is-empty";

class IssueEbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: "",
      studentid: "",
      redemptioncode: "",
      errors: {},
      redemption_codes: [],
      all_students: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }
      this.props.getCurrentEbook();
      this.props.getUnassignedEbooks();
      this.props.getAllStudents();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.ebook.ebook) {
      const ebook = nextProps.ebook.ebook[0];
      ebook.bookname = !isEmpty(ebook.bookname) ? ebook.bookname : "";
      this.setState({
        bookname: ebook.bookname
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const assignedEbookData = {
      bookname: this.state.bookname,
      studentid: this.state.studentid,
      redemptioncode: this.state.redemptioncode
    };

    this.props.issueEbook(assignedEbookData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const allstudents = this.props.allstudents.allstudents;
    const unassigned_redemption_codes = this.props.ebookunassigned
      .ebookunassigned;

    if (unassigned_redemption_codes) {
      this.state.redemption_codes = unassigned_redemption_codes.map(
        redemption_code => {
          return {
            label: redemption_code.redemptioncode,
            value: redemption_code.redemptioncode
          };
        }
      );
    }
    this.state.redemption_codes.unshift({
      label: "* Select redemption code",
      value: 0
    });

    if (allstudents) {
      this.state.all_students = allstudents.map(student_id => {
        return {
          label:
            student_id.lastname +
            ", " +
            student_id.firstname +
            " ( " +
            student_id.studentid +
            " )",
          value: student_id.studentid
        };
      });
    }

    this.state.all_students.unshift({
      label: "* Select student",
      value: 0
    });

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Issue eBook</h1>
              <p className="lead text-center">
                Issue eBook for the selected student
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Book Name"
                  name="bookname"
                  value={this.state.bookname}
                  onChange={this.onChange}
                  error={errors.bookname}
                  label={"false"}
                />
                <SelectListGroup
                  placeholder="* Student ID"
                  name="studentid"
                  value={this.state.studentid}
                  options={this.state.all_students}
                  onChange={this.onChange}
                  error={errors.studentid}
                  info="Select Student ID"
                />
                <SelectListGroup
                  placeholder="* Redemption Code"
                  name="redemptioncode"
                  value={this.state.redemptioncode}
                  options={this.state.redemption_codes}
                  onChange={this.onChange}
                  error={errors.redemptioncode}
                  info="Select Redemption Code"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IssueEbook.propTypes = {
  auth: PropTypes.object.isRequired,
  issueEbook: PropTypes.func.isRequired,
  trackebook: PropTypes.object.isRequired,
  getCurrentEbook: PropTypes.func.isRequired,
  getUnassignedEbooks: PropTypes.func.isRequired,
  ebook: PropTypes.object.isRequired,
  ebookunassigned: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  allstudents: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trackebook: state.trackebook,
  ebook: state.ebook,
  ebookunassigned: state.ebookunassigned,
  allstudents: state.allstudents,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    issueEbook,
    getCurrentEbook,
    getUnassignedEbooks,
    getAllStudents
  }
)(withRouter(IssueEbook));
