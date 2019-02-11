import {
  GET_UNASSIGNED_EBOOKS,
  UNASSIGNED_EBOOKS_LOADING,
  CLEAR_UNASSIGNED_EBOOKS
} from "../actions/types";

const initialState = {
  ebookunassigned: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UNASSIGNED_EBOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_UNASSIGNED_EBOOKS:
      return {
        ...state,
        ebookunassigned: action.payload,
        loading: false
      };
    case CLEAR_UNASSIGNED_EBOOKS:
      return {
        ...state,
        ebookunassigned: null
      };
    default:
      return state;
  }
}
