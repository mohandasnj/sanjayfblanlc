import React from "react";
import { Link } from "react-router-dom";

const EbookActions = () => {
  return (
    <div>
      <div className="btn-group mb-2" role="group">
        <Link to="/edit-ebook" className="btn btn-secondary mr-3">
          <i className="fa fa-book text-info  mr-1" /> Edit eBook
        </Link>
      </div>
      <p className="font-weight-light mb-4">
        Click on the button above to select the book that you want. All the
        information and data shown below will correspond to the book chosen.
      </p>
      <div className="btn-group mb-4" role="group">
        <Link to="/add-ebook-copy" className="btn btn-secondary mr-3">
          <i className="fa fa-barcode fa_custom fa-1x text-info mr-1" />
          Add eBook Copy
        </Link>
        <Link to="/issue-ebook" className="btn btn-secondary mr-3">
          <i className="fa fa-shopping-cart text-info mr-1" />
          Issue eBook
        </Link>
        <Link to="/create-student" className="btn btn-secondary mr-3">
          <i className="fa fa-user-plus text-info mr-1" />
          Add Student
        </Link>
        <Link to="/weekly-report" className="btn btn-secondary mr-3">
          <i className="fa fa-table text-info mr-1" />
          Weekly Report
        </Link>
      </div>
    </div>
  );
};

export default EbookActions;
