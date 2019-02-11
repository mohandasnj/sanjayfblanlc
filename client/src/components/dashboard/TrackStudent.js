import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteStudent } from "../../actions/ebookActions";

class TrackStudent extends Component {
  onDeleteClick(id) {
    this.props.deleteStudent(id, this.props.history);
  }

  render() {
    const allstudents = this.props.allstudents.allstudents;

    let allstudentsItems;

    if (allstudents.length > 0) {
      allstudentsItems = allstudents.map(alls => (
        <tr key={alls._id}>
          <td>{allstudents.indexOf(alls) + 1}</td>
          <td>{alls.studentid}</td>
          <td>{alls.firstname}</td>
          <td>{alls.lastname}</td>
          <td>
            <Link
              to={`/inter-edit-student/${alls.studentid}`}
              className="btn btn-light mr-3"
            >
              <i className="fa fa-edit text-info  mr-1" /> Edit
            </Link>
          </td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, alls._id)}
              className="btn btn-block"
            >
              <i className="fa fa-trash"> </i> Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      allstudentsItems = <h4>No students record found...</h4>;
    }

    return (
      <div>
        <h4 className="mb-4">Track the student information</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th />
              <th />
            </tr>
            {allstudentsItems}
          </thead>
        </table>
      </div>
    );
  }
}

TrackStudent.propTypes = {
  allstudents: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allstudents: state.allstudents
});

export default connect(
  mapStateToProps,
  {
    deleteStudent
  }
)(withRouter(TrackStudent));
