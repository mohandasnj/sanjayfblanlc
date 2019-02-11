import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link, withRouter } from "react-router-dom";
//import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
//import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createEbook } from "../../actions/ebookActions";

class CreateEbook extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
  }

  render() {
    const { errors } = this.state;
    // Select options for ebook
    const options = [
      { label: "* Select the Book Name", value: 0 },
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
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create your ebook</h1>
              <p className="lead text-center">
                Let's get some information to make your ebook stand out
              </p>
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

CreateEbook.propTypes = {
  ebook: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ebook: state.ebook,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createEbook }
)(withRouter(CreateEbook));
