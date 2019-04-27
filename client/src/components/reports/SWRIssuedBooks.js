import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { format } from "date-fns";
//import { startOfWeek, lastDayOfWeek } from "date-fns";

class StudentIssuedBooks extends Component {
  render() {
    const weeklyreport = this.props.weeklyreport.weeklyreport;

    let weeklyreportItems;
    if (weeklyreport.length > 0) {
      weeklyreportItems = weeklyreport.map(writems => (
        <tr key={writems._id}>
          <td>{weeklyreport.indexOf(writems) + 1}</td>
          <td>{writems.bookname}</td>
          <td>{writems.redemptioncode}</td>
          <td>{format(writems.issueddate, "DD/MMM/YYYY hh:mm:ss A")}</td>
        </tr>
      ));
    } else {
      weeklyreportItems = <h4>No eBooks issued...</h4>;
    }

    // let startdayofcurrentweek = format(
    //   startOfWeek(Date.now(), { weekStartsOn: 1 }),
    //   "DD/MMM/YYYY"
    // );
    // let lastdayofcurrentweek = format(
    //   lastDayOfWeek(Date.now(), { weekStartsOn: 1 }),
    //   "DD/MMM/YYYY"
    // );

    let today = new Date();
    let sevenDaysAgo = new Date(today);
    let datetoday = new Date(today);
    sevenDaysAgo = format(
      sevenDaysAgo.setDate(today.getDate() - 7),
      "MM/DD/YYYY HH:mm:ss A"
    );
    datetoday = format(
      datetoday.setDate(today.getDate()),
      "MM/DD/YYYY HH:mm:ss A"
    );

    // console.log(sevenDaysAgo);
    // console.log(datetoday);

    return (
      <div>
        <div>
          <p className="lead text-muted">
            Weekly report of issued e-books for the last seven days between{" "}
            {sevenDaysAgo} and {datetoday}.
          </p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Redemption Code</th>
              <th>Issued Date</th>
            </tr>
            {weeklyreportItems}
          </thead>
        </table>
      </div>
    );
  }
}

StudentIssuedBooks.propTypes = {
  weeklyreport: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weeklyreport: state.weeklyreport
});

export default connect(
  mapStateToProps,
  {}
)(StudentIssuedBooks);
