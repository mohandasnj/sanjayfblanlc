import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getEbookByName } from "../../actions/ebookActions";

class InterViewEBook extends Component {
  componentDidMount() {
    if (this.props.match.params.bookname) {
      this.props.getEbookByName(this.props.match.params.bookname);
    }
    this.props.history.push("/view-ebook");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Inter View eBook</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InterViewEBook.propTypes = {
  getEbookByName: PropTypes.func.isRequired,
  ebook: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ebook: state.student,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getEbookByName }
)(withRouter(InterViewEBook));
