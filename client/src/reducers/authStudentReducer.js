import {
  CURRENT_USER_STUDENT,
  CURRENT_USER_STUDENT_LOADING,
  CLEAR_CURRENT_USER_STUDENT
} from "../actions/types";

const initialState = {
  currentuserstudent: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_STUDENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case CURRENT_USER_STUDENT:
      return {
        ...state,
        currentuserstudent: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_USER_STUDENT:
      return {
        ...state,
        currentuserstudent: null
      };
    default:
      return state;
  }
}
