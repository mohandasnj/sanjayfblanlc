import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import ebookReducer from "./ebookReducer";
import issuebookReducer from "./issuebookReducer";
import trackcodeReducer from "./trackcodeReducer";
import allstudentsReducer from "./allstudentsReducer";
import studentReducer from "./studentReducer";
import weeklyreportReducer from "./weeklyreportReducer";
import currentuserstudentReducer from "./authStudentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ebook: ebookReducer,
  ebookassigned: issuebookReducer,
  ebookunassigned: trackcodeReducer,
  allstudents: allstudentsReducer,
  student: studentReducer,
  weeklyreport: weeklyreportReducer,
  currentuserstudent: currentuserstudentReducer
});
