import {
  GET_ALL_STUDENTS,
  STUDENTS_LOADING,
  CLEAR_STUDENTS
} from "../actions/types";

const initialState = {
  allstudents: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_STUDENTS:
      return {
        ...state,
        allstudents: action.payload,
        loading: false
      };
    case CLEAR_STUDENTS:
      return {
        ...state,
        allstudents: null
      };
    default:
      return state;
  }
}
