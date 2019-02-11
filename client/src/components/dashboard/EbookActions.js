import React from "react";
import { Link } from "react-router-dom";

const EbookActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-ebook" className="btn btn-light mr-3">
        <i className="fa fa-book text-info  mr-1" /> Edit eBook
      </Link>
      <Link to="/add-ebook-copy" className="btn btn-light mr-3">
        <i className="fa fa-barcode fa_custom fa-1x text-info mr-1" />
        Add eBook Copy
      </Link>
      <Link to="/issue-ebook" className="btn btn-light mr-3">
        <i className="fa fa-shopping-cart text-info mr-1" />
        Issue eBook
      </Link>
      <Link to="/create-student" className="btn btn-light mr-3">
        <i className="fa fa-user-plus text-info mr-1" />
        Add Student
      </Link>
      <Link to="/weekly-report" className="btn btn-light mr-3">
        <i className="fa fa-table text-info mr-1" />
        Weekly Report
      </Link>
    </div>
  );
};

export default EbookActions;
