import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getEbookByName } from "../../actions/ebookActions";
import isEmpty from "../../validation/is-empty";

class ViewEbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: "",
      author: "",
      datepublished: "",
      isbn13: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "teacher") {
        this.props.history.push("/dashboard");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

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

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboardstudent" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">View ebook Details</h1>
              <div />
              <div>
                <p>
                  <b>Book Name : </b> {this.state.bookname}
                </p>
                <p>
                  <b>Author : </b> {this.state.author}
                </p>
                <p>
                  <b>Date Published : </b> {this.state.datepublished}
                </p>
                <p>
                  <b>ISBN13 : </b> {this.state.isbn13}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewEbook.propTypes = {
  auth: PropTypes.object.isRequired,
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
  { getEbookByName }
)(withRouter(ViewEbook));
