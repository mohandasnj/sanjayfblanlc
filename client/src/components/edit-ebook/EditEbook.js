import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link, withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import {
  createEbook,
  getCurrentEbook,
  getEbookByName
} from "../../actions/ebookActions";
import isEmpty from "../../validation/is-empty";

class EditEbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: "",
      author: "",
      datepublished: "",
      isbn13: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "student") {
        this.props.history.push("/dashboardstudent");
      }
      this.props.getCurrentEbook();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    //nextProps.errors.bookname = "";

    if (nextProps.ebook.ebook) {
      const ebook = nextProps.ebook.ebook[0];
      //console.log("Inside receiveprops");
      //console.log(ebook);
      ebook.bookname = !isEmpty(ebook.bookname) ? ebook.bookname : "";
      ebook.author = !isEmpty(ebook.author) ? ebook.author : "";
      ebook.datepublished = !isEmpty(ebook.datepublished)
        ? ebook.datepublished
        : "";
      ebook.isbn13 = !isEmpty(ebook.isbn13) ? ebook.isbn13 : "";
      //console.log(ebook.datepublished);
      // Set component fields state
      this.setState({
        bookname: ebook.bookname,
        author: ebook.author,
        datepublished: ebook.datepublished,
        isbn13: ebook.isbn13
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const ebookData = {
      bookname: this.state.bookname,
      author: this.state.author,
      datepublished: this.state.datepublished,
      isbn13: this.state.isbn13
    };

    this.props.createEbook(ebookData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "bookname") {
      this.props.getEbookByName(e.target.value);
      this.setState({
        bookname: e.target.value
      });
    }
  }

  render() {
    const { errors } = this.state;
    // Select options for ebook
    const options = [
      // { label: "* Select the Book Name", value: 0 },
      { label: "Barron's AP Statistics", value: "Barron's AP Statistics" },
      {
        label: "Cracking the AP Statistics Exam",
        value: "Cracking the AP Statistics Exam"
      },
      {
        label: "5 Steps to a 5 - AP Statistics 2019",
        value: "5 Steps to a 5 - AP Statistics 2019"
      },
      {
        label: "AP Q&A Statistics with 600 Questions and Answers",
        value: "AP Q&A Statistics with 600 Questions and Answers"
      },
      {
        label: "AP Statistics Crash Course Book",
        value: "AP Statistics Crash Course Book"
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit ebook</h1>
              <small className="d-block pb-3">* = Required Fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Book Name"
                  name="bookname"
                  value={this.state.bookname}
                  options={options}
                  onChange={this.onChange}
                  error={errors.bookname}
                  info="Select Book Name"
                />
                <TextFieldGroup
                  placeholder="* Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  error={errors.author}
                  info="Enter the Author Name"
                />
                <TextFieldGroup
                  placeholder="* Date Published"
                  name="datepublished"
                  type="date"
                  value={this.state.datepublished}
                  onChange={this.onChange}
                  error={errors.datepublished}
                  info="Enter the Published Date"
                />
                <TextFieldGroup
                  placeholder="ISBN13 Code"
                  name="isbn13"
                  value={this.state.isbn13}
                  onChange={this.onChange}
                  error={errors.isbn13}
                  info="Enter the ISBN13 code"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditEbook.propTypes = {
  auth: PropTypes.object.isRequired,
  createEbook: PropTypes.func.isRequired,
  getCurrentEbook: PropTypes.func.isRequired,
  getEbookByName: PropTypes.func.isRequired,
  ebook: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  ebook: state.ebook,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createEbook, getCurrentEbook, getEbookByName }
)(withRouter(EditEbook));
