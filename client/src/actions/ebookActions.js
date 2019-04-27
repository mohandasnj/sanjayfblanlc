import axios from "axios";
import {
  GET_EBOOK,
  EBOOK_LOADING,
  UNASSIGNED_EBOOKS_LOADING,
  ASSIGNED_EBOOKS_LOADING,
  CLEAR_CURRENT_EBOOK,
  CLEAR_ASSIGNED_EBOOKS,
  CLEAR_UNASSIGNED_EBOOKS,
  CLEAR_STUDENTS,
  CLEAR_STUDENT,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_UNASSIGNED_EBOOKS,
  GET_ASSIGNED_EBOOKS,
  GET_STUDENT,
  GET_ALL_STUDENTS,
  STUDENTS_LOADING,
  GET_WEEKLY_REPORT,
  WEEKLY_REPORT_LOADING,
  CLEAR_WEEKLY_REPORT,
  CURRENT_USER_STUDENT_LOADING,
  CURRENT_USER_STUDENT,
  CLEAR_CURRENT_USER_STUDENT
} from "./types";

// Get current ebook
export const getCurrentEbook = () => dispatch => {
  dispatch(setEbookLoading());
  dispatch(clearErrors());
  axios
    .get("/api/ebooks")
    .then(res =>
      dispatch({
        type: GET_EBOOK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EBOOK,
        payload: {}
      })
    );
};

// Get ebook by name
export const getEbookByName = book_name => dispatch => {
  dispatch(setEbookLoading());
  dispatch(clearErrors());
  axios
    .get(`/api/ebooks/${book_name}`)
    .then(res =>
      dispatch({
        type: GET_EBOOK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EBOOK,
        payload: {}
      })
    );
};

// Get unassigned ebooks
export const getUnassignedEbooks = () => dispatch => {
  dispatch(setUnassignedEbookLoading());
  axios
    .get("/api/trackbooks/unassigned")
    .then(res =>
      dispatch({
        type: GET_UNASSIGNED_EBOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UNASSIGNED_EBOOKS,
        payload: {}
      })
    );
};

// Get assigned ebooks
export const getAssignedEbooks = () => dispatch => {
  dispatch(setAssignedEbookLoading());
  axios
    .get("/api/trackbooks/assigned")
    .then(res =>
      dispatch({
        type: GET_ASSIGNED_EBOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNED_EBOOKS,
        payload: {}
      })
    );
};

// Get assigned ebooks by book_name
export const getAssignedEbooksByBN = book_name => dispatch => {
  dispatch(setAssignedEbookLoading());
  axios
    .get(`/api/trackbooks/assigned/${book_name}`)
    .then(res =>
      dispatch({
        type: GET_ASSIGNED_EBOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNED_EBOOKS,
        payload: {}
      })
    );
};

// Weekly Report - Get assigned ebooks
export const getWeeklyReport = () => dispatch => {
  dispatch(setWeeklyReportLoading());
  axios
    .get("/api/trackbooks/weeklyreport")
    .then(res =>
      dispatch({
        type: GET_WEEKLY_REPORT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKLY_REPORT,
        payload: {}
      })
    );
};

// Student Weekly Report - Get assigned ebooks
export const getStudentWeeklyReport = () => dispatch => {
  dispatch(setWeeklyReportLoading());
  axios
    .get("/api/trackbooks/studentweeklyreport")
    .then(res =>
      dispatch({
        type: GET_WEEKLY_REPORT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKLY_REPORT,
        payload: {}
      })
    );
};

// Get student assigned ebooks
export const getStudentAssignedEbooks = () => dispatch => {
  dispatch(setAssignedEbookLoading());
  axios
    .get("/api/trackbooks/studentassignedbooks")
    .then(res =>
      dispatch({
        type: GET_ASSIGNED_EBOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNED_EBOOKS,
        payload: {}
      })
    );
};

//GET ALL STUDENTS
export const getAllStudents = () => dispatch => {
  dispatch(setAllStudentsLoading());
  axios
    .get("/api/students/all")
    .then(res =>
      dispatch({
        type: GET_ALL_STUDENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_STUDENTS,
        payload: {}
      })
    );
};

//Get Student By StudentID
export const getStudentByStudentID = studentid => dispatch => {
  dispatch(setAllStudentsLoading());
  axios
    .get(`/api/students/studentid/${studentid}`)
    .then(res =>
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENT,
        payload: null
      })
    );
};

//Get Current User Student
export const getCurrentUserStudent = () => dispatch => {
  dispatch(setCurrentUserStudentLoading());
  axios
    .get("/api/students/currentuserstudent")
    .then(res =>
      dispatch({
        type: CURRENT_USER_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CURRENT_USER_STUDENT,
        payload: {}
      })
    );
};

// Create Student
export const createStudent = (studentData, history) => dispatch => {
  axios
    .post("./api/students/create", studentData)
    .then(res => history.push("./dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Student
export const editStudent = (studentData, history) => dispatch => {
  axios
    .post("./api/students/edit", studentData)
    .then(res => history.push("./dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create eBook
export const createEbook = (ebookData, history) => dispatch => {
  axios
    .post("./api/ebooks", ebookData)
    .then(res => history.push("./dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Ebook Loading
export const setEbookLoading = () => {
  return {
    type: EBOOK_LOADING
  };
};
//UNASSIGNED_EBOOKS_LOADING
export const setUnassignedEbookLoading = () => {
  return {
    type: UNASSIGNED_EBOOKS_LOADING
  };
};
//ASSIGNED_EBOOKS_LOADING
export const setAssignedEbookLoading = () => {
  return {
    type: ASSIGNED_EBOOKS_LOADING
  };
};
//WEEKLY_REPORT_LOADING
export const setWeeklyReportLoading = () => {
  return {
    type: WEEKLY_REPORT_LOADING
  };
};

//All STUDENTS LOADING
export const setAllStudentsLoading = () => {
  return {
    type: STUDENTS_LOADING
  };
};

// CURRENT_STUDENT_TEACHER_LOADING
export const setCurrentUserStudentLoading = () => {
  return {
    type: CURRENT_USER_STUDENT_LOADING
  };
};

// Add Ebook Copy
export const addEbookCopy = (unassignedEbookData, history) => dispatch => {
  axios
    .post("/api/trackbooks/addebook", unassignedEbookData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Issue eBook
export const issueEbook = (assignedEbookData, history) => dispatch => {
  axios
    .post("/api/trackbooks", assignedEbookData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// CLEAR_CURRENT_EBOOK = "CLEAR_CURRENT_EBOOK"
export const clearCurrentEbook = () => {
  return {
    type: CLEAR_CURRENT_EBOOK
  };
};

// CLEAR_CURRENT_USER_STUDENT = "CURRENT_USER_STUDENT"
export const clearCurrentUserStudent = () => {
  return {
    type: CLEAR_CURRENT_USER_STUDENT
  };
};

// CLEAR_ASSIGNED_EBOOKS = "CLEAR_ASSIGNED_EBOOKS"
export const clearCurrentAssignedEbooks = () => {
  return {
    type: CLEAR_ASSIGNED_EBOOKS
  };
};

// CLEAR_UNASSIGNED_EBOOKS = "CLEAR_UNASSIGNED_EBOOKS"
export const clearCurrentUnassignedEbooks = () => {
  return {
    type: CLEAR_UNASSIGNED_EBOOKS
  };
};

// CLEAR_STUDENTS = "CLEAR_STUDENTS"
export const clearCurrentStudents = () => {
  return {
    type: CLEAR_STUDENTS
  };
};

// CLEAR_STUDENT = "CLEAR_STUDENT"
export const clearCurrentStudent = () => {
  return {
    type: CLEAR_STUDENT
  };
};

// CLEAR_WEEKLY_REPORT = "CLEAR_WEEKLY_REPORT"
export const clearCurrentWeeklyReport = () => {
  return {
    type: CLEAR_WEEKLY_REPORT
  };
};

// Delete Code
export const deleteCode = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/trackbooks/redemptioncode/${id}`)
      .then(res => dispatch(getUnassignedEbooks()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete Issued eBook copy
export const deleteIssuedBook = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/trackbooks/studentid/${id}`)
      .then(res => dispatch(getAssignedEbooks()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete Student
export const deleteStudent = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/trackbooks/bystudentid/${id}`)
      .then(res => dispatch(getAssignedEbooks()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );

    axios
      .delete(`/api/students/studentid/${id}`)
      .then(res => dispatch(getAllStudents()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
