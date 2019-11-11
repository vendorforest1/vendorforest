import { apiUrl } from "@Shared/constants";

// Actions
const FETCH_LOGIN_REQUEST = "FETCH_LOGIN_REQUEST";
const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";
const CLEAR_LOGIN_FAILURE = "CLEAR_LOGIN_FAILURE";

// Reducer
export default function reducer(
  state = {
    error: false,
    user: undefined,
    pending: false,
  },
  action,
) {
  let user;
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_LOGIN_SUCCESS:
      user = action.payload;
      console.log("FETCH_LOGIN_SUCCESS: ", action.payload);
      return Object.assign({}, state, {
        user,
        pending: false,
      });
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case CLEAR_LOGIN_FAILURE:
      return {
        ...state,
        error: false,
        pending: false,
        user: undefined,
      };
    default:
      return state;
  }
}

// Action Creators
const requestLogin = () => ({
  type: FETCH_LOGIN_REQUEST,
});
const receivedLogin = (userInfo) => ({
  type: FETCH_LOGIN_SUCCESS,
  payload: userInfo,
});
const loginError = (err) => ({
  type: FETCH_LOGIN_FAILURE,
  payload: err,
});

const clearLoginError = () => ({
  type: CLEAR_LOGIN_FAILURE,
});

export const fetchLogin = (payload) => async (dispatch, getState) => {
  dispatch(clearLoginError());
  dispatch(requestLogin());
  return await fetch(apiUrl.LOGIN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status >= 400) {
        throw new Error(result.msg);
      }
      dispatch(receivedLogin(result));
    })
    .catch((err) => dispatch(loginError(err.message)));
};
