import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null, // to store the user's profile data
  profiles: [], // to store the profiles for profile listing page.
  repose: [], // to store the github repos.
  loading: true, // to store the loading state.
  error: {}, // to store the error info.
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
