import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Link, withRouter } from "react-router-dom";

class StudentIssuedBooks extends Component {
  render() {
    const ebookassigned = this.props.ebookassigned.ebookassigned;
    //console.log(ebookassigned.length);
    let assignedebooksItems;
    if (ebookassigned.length > 0) {
      assignedebooksItems = ebookassigned.map(ab => (
        <tr key={ab._id}>
          <td>{ebookassigned.indexOf(ab) + 1}</td>
          <td>{ab.bookname}</td>
          <td>
            <Link
              to={`/inter-view-ebook/${ab.bookname}`}
              className="btn btn-secondary mr-1"
            >
              <i className="fa fa-edit text-info  mr-1" /> View eBook Details
            </Link>
          </td>
          <td>{ab.redemptioncode}</td>
          <td>{format(ab.issueddate, "DD/MMM/YYYY hh:mm:ss A")}</td>
        </tr>
      ));
    } else {
      assignedebooksItems = <h4>No eBooks issued...</h4>;
    }

    return (
      <div>
        <h4 className="mb-4">Assigned e-books</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th />
              <th>Redemption Code</th>
              <th>Checked Out Date</th>
            </tr>
            {assignedebooksItems}
          </thead>
        </table>
      </div>
    );
  }
}

StudentIssuedBooks.propTypes = {
  ebookassigned: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ebookassigned: state.ebookassigned
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(StudentIssuedBooks));
