import { STUDENTS_LOADING, GET_STUDENT, CLEAR_STUDENT } from "../actions/types";

const initialState = {
  student: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case CLEAR_STUDENT:
      return {
        ...state,
        student: null
      };
    default:
      return state;
  }
}
