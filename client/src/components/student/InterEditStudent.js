import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getStudentByStudentID } from "../../actions/ebookActions";

class InterEditStudent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    if (this.props.match.params.studentid) {
      this.props.getStudentByStudentID(this.props.match.params.studentid);
    }
    this.props.history.push("/edit-student");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    //const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Inter Edit Student</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InterEditStudent.propTypes = {
  getStudentByStudentID: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getStudentByStudentID }
)(withRouter(InterEditStudent));
