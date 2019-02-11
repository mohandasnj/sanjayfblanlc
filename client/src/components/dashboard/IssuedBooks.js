import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteIssuedBook } from "../../actions/ebookActions";
import { format } from "date-fns";

class IssuedBooks extends Component {
  onDeleteClick(id) {
    this.props.deleteIssuedBook(id);
  }

  render() {
    const ebookassigned = this.props.ebookassigned.ebookassigned;

    let assignedebooksItems;
    if (ebookassigned.length > 0) {
      assignedebooksItems = ebookassigned.map(ab => (
        <tr key={ab._id}>
          <td>{ebookassigned.indexOf(ab) + 1}</td>
          <td>{ab.studentid}</td>
          <td>{ab.redemptioncode}</td>
          <td>{format(ab.issueddate, "DD/MMM/YYYY hh:mm:ss A")}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, ab._id)}
              className="btn btn-block"
            >
              <i class="fa fa-trash"> </i> Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      assignedebooksItems = <h4>No eBooks issued...</h4>;
    }

    return (
      <div>
        <h4 className="mb-4">Track the issuance of e-books</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Redemption Code</th>
              <th>Issued Date</th>
              <th />
            </tr>
            {assignedebooksItems}
          </thead>
        </table>
      </div>
    );
  }
}

IssuedBooks.propTypes = {
  ebookassigned: PropTypes.object.isRequired,
  deleteIssuedBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ebookassigned: state.ebookassigned
});

export default connect(
  mapStateToProps,
  {
    deleteIssuedBook
  }
)(IssuedBooks);
