import {
  GET_ASSIGNED_EBOOKS,
  ASSIGNED_EBOOKS_LOADING,
  CLEAR_ASSIGNED_EBOOKS
} from "../actions/types";

const initialState = {
  ebookassigned: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ASSIGNED_EBOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ASSIGNED_EBOOKS:
      return {
        ...state,
        ebookassigned: action.payload,
        loading: false
      };
    case CLEAR_ASSIGNED_EBOOKS:
      return {
        ...state,
        ebookassigned: null
      };
    default:
      return state;
  }
}
