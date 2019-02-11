import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEbookCopy, getCurrentEbook } from "../../actions/ebookActions";
import crypto from "crypto";
import isEmpty from "../../validation/is-empty";

class AddEbookCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: "",
      studentid: "",
      redemptioncode: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.onCheck = this.onCheck.bind(this);
  }

  componentDidMount() {
    //console.log("Inside moount");
    this.props.getCurrentEbook();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // Get fields
    const newredemptioncode = crypto
      .randomBytes(16)
      .toString("hex")
      .toUpperCase();

    if (nextProps.ebook.ebook) {
      const ebook = nextProps.ebook.ebook[0];
      //console.log("Inside receiveprops");
      //console.log(nextProps.ebook.bookname);
      ebook.bookname = !isEmpty(ebook.bookname) ? ebook.bookname : "";
      //console.log(nextProps.ebook.ebook[0].bookname);
      // Set component fields state
      this.setState({
        bookname: ebook.bookname,
        redemptioncode: newredemptioncode
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const unassignedEbookData = {
      bookname: this.state.bookname,
      studentid: this.state.studentid,
      redemptioncode: this.state.redemptioncode
    };

    this.props.addEbookCopy(unassignedEbookData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onCheck(e) {
  //   this.setState({
  //     disabled: !this.state.disabled,
  //     current: !this.state.current
  //   });
  // }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Track Redemption Code</h1>
              <p className="lead text-center">
                Add redemption code for the selected eBook copy
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
                <TextFieldGroup
                  placeholder="* Redemption Code"
                  name="redemptioncode"
                  value={this.state.redemptioncode}
                  onChange={this.onChange}
                  error={errors.redemptioncode}
                  label={"false"}
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

AddEbookCopy.propTypes = {
  addEbookCopy: PropTypes.func.isRequired,
  trackebook: PropTypes.object.isRequired,
  getCurrentEbook: PropTypes.func.isRequired,
  ebook: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trackebook: state.trackebook,
  ebook: state.ebook,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEbookCopy, getCurrentEbook }
)(withRouter(AddEbookCopy));
