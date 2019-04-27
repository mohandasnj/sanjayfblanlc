import React from "react";
import { Link } from "react-router-dom";

const StudentActions = () => {
  return (
    <div className="btn-group mb-3" role="group">
      <Link to="/student-weekly-report" className="btn btn-secondary mr-3">
        <i className="fa fa-table text-info mr-1" />
        Weekly Report
      </Link>
    </div>
  );
};

export default StudentActions;
