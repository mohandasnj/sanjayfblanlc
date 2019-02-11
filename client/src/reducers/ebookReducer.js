import {
  GET_EBOOK,
  EBOOK_LOADING,
  CLEAR_CURRENT_EBOOK
  //GET_UNASSIGNED_EBOOKS
  //GET_ASSIGNED_EBOOKS
} from "../actions/types";

const initialState = {
  ebook: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EBOOK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EBOOK:
      return {
        ...state,
        ebook: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_EBOOK:
      return {
        ...state,
        ebook: null
      };
    default:
      return state;
  }
}
