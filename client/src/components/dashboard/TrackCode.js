import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteCode } from "../../actions/ebookActions";
import { format } from "date-fns";
//import Moment from "react-moment";
//import { deleteCode } from "../../actions/ebookActions";

class TrackCode extends Component {
  onDeleteClick(id) {
    this.props.deleteCode(id, this.props.history);
  }
  // componentDidMount() {
  //   this.props.getUnassignedEbooks();
  // }
  render() {
    // if (profiles.length > 0) {
    //   profileItems = profiles.map(profile => (
    //     <ProfileItem key={profile._id} profile={profile} />
    //   ));

    const ebookunassigned = this.props.ebookunassigned.ebookunassigned;

    // for (var key in ebook) {
    //   var obj = ebook[key];
    //   console.log(ebook["studentid"]);
    //   if (ebook["studentid"] !== "") {
    //     console.log("Object =>" + obj);
    //   }
    //   ebook.forEach(element => {
    //     if (element["studentid"] !== "") {
    //       let removeIndex = ebook
    //         .map(item => item["studentid"])
    //         .indexOf(element["studentid"]);
    //       ebook.splice(removeIndex, 1);
    //     }
    //   });
    // }
    //console.log(ebook);
    let unassignedebooksItems;

    if (ebookunassigned.length > 0) {
      unassignedebooksItems = ebookunassigned.map(uab => (
        <tr key={uab._id}>
          <td>{ebookunassigned.indexOf(uab) + 1}</td>
          <td>{uab.redemptioncode}</td>
          <td>{format(uab.issueddate, "DD/MMM/YYYY hh:mm:ss A")}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, uab._id)}
              className="btn btn-block"
            >
              <i class="fa fa-trash"> </i> Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      unassignedebooksItems = <h4>No eBooks copy found...</h4>;
    }
    // const unassignedebooks = this.props.unassignedebooks.map(uab => (
    //   <tr key={uab._id}>
    //     <td>{uab.redemptioncode}</td>
    //     <td>{uab.issueddate}</td>
    //   </tr>
    // ));
    return (
      <div>
        <h4 className="mb-4">Track the redemption codes</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Redemption Code</th>
              <th>Created Date</th>
              <th />
            </tr>
            {unassignedebooksItems}
          </thead>
        </table>
      </div>
    );
  }
}

TrackCode.propTypes = {
  ebookunassigned: PropTypes.object.isRequired,
  deleteCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ebookunassigned: state.ebookunassigned
});

export default connect(
  mapStateToProps,
  {
    deleteCode
  }
)(withRouter(TrackCode));
