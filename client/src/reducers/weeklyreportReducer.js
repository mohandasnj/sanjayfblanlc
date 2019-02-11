import {
  GET_WEEKLY_REPORT,
  WEEKLY_REPORT_LOADING,
  CLEAR_WEEKLY_REPORT
} from "../actions/types";

const initialState = {
  weeklyreport: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WEEKLY_REPORT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WEEKLY_REPORT:
      return {
        ...state,
        weeklyreport: action.payload,
        loading: false
      };
    case CLEAR_WEEKLY_REPORT:
      return {
        ...state,
        weeklyreport: null
      };
    default:
      return state;
  }
}
