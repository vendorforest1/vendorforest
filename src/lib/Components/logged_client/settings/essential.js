import { apiUrl, API_URL } from "@Shared/constants";
// import stripe from "react-stripe-elements";
// Actions
const FETCH_SETTINGS_REQUEST = "FETCH_SETTINGS_REQUEST";
const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
const FETCH_MSG_SUCCESS = "FETCH_MSG_SUCCESS";
const FETCH_SETTINGS_FAILURE = "FETCH_SETTINGS_FAILURE";
const CLEAR_SETTINGS_FAILURE = "CLEAR_SETTINGS_FAILURE";
// Reducer
export default function reducer(
  state = {
    error: undefined,
    success: undefined,
    user: undefined,
    pending: false,
  },
  action,
) {
  switch (action.type) {
    case FETCH_SETTINGS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        pending: false,
      };
    case FETCH_MSG_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.payload,
      };
    case FETCH_SETTINGS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case CLEAR_SETTINGS_FAILURE:
      return {
        ...state,
        error: undefined,
        success: undefined,
        pending: false,
      };
    default:
      return state;
  }
}

// Action Creators
const requestSettings = () => ({
  type: FETCH_SETTINGS_REQUEST,
});

const receivedSettings = (userInfo) => ({
  type: FETCH_SETTINGS_SUCCESS,
  payload: userInfo,
});

const settingSuccess = (success) => ({
  type: FETCH_MSG_SUCCESS,
  payload: success,
});

const settingsError = (err) => ({
  type: FETCH_SETTINGS_FAILURE,
  payload: err,
});

const clearSettingsError = () => ({
  type: CLEAR_SETTINGS_FAILURE,
});

export const getPublicKey = () => {
  return window
    .fetch(apiUrl.GET_PUB_KEY, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("public_key", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      } else {
        return result.pubKey;
      }
    });
};

export const getSetupIntent = () => {
  return window
    .fetch(apiUrl.GET_SETUP_INTENT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" &&
        console.log("___setupintent___", result.client_secret);
      return result.client_secret;
    });
};

export const getClientId = async (card) => {
  console.log("client id == ", card);
  return await fetch(apiUrl.GET_CLIENT_ID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token_id: card }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status > 400) {
        throw Error(result.message);
      }
      return result;
    })
    .catch((err) => {});
};

export const updateClientId = async (card) => {
  console.log("client id == ", card);
  return await fetch(apiUrl.UPDATE_CLIENT_ID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token_id: card }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status > 400) {
        throw Error(result.message);
      }
      return result;
    })
    .catch((err) => {});
};

export const getCardDigits = async (card) => {
  console.log("client id == ", card);
  return await fetch(apiUrl.GET_CARD_DIGITS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status > 400) {
        throw Error(result.message);
      }
      return result;
    })
    .catch((err) => {});
};
//TODO encrypt Card information
export const fetchUpdateBilling = (payload) => async (dispatch, getState) => {
  dispatch(clearSettingsError());
  dispatch(requestSettings());
  return await fetch(apiUrl.CLIENT_POST_BILLING, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("client result", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(receivedSettings(result.data));
      dispatch(settingSuccess(result.message));
    })
    .catch((err) => dispatch(settingsError(err.message)));
};

export const fetchGetSettings = (payload) => async (dispatch, getState) => {
  dispatch(clearSettingsError());
  dispatch(requestSettings());
  return await fetch(apiUrl.CLIENT_GET_SETTINGS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("client result", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(receivedSettings(result.data));
    })
    .catch((err) => dispatch(settingsError(err.message)));
};

export const fetchUpdateAccount = (payload) => async (dispatch, getState) => {
  dispatch(clearSettingsError());
  dispatch(requestSettings());
  return await fetch(apiUrl.UPDATE_ACCOUNT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("client result", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(receivedSettings(result.data));
      dispatch(settingSuccess(result.message));
    })
    .catch((err) => dispatch(settingsError(err.message)));
};

export const fetchResetPass = (payload) => async (dispatch, getState) => {
  dispatch(clearSettingsError());
  dispatch(requestSettings());
  return await fetch(apiUrl.RESETPASS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("client result", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(settingSuccess(result.message));
    })
    .catch((err) => dispatch(settingsError(err.message)));
};

export const fetchUpdateNotifYSettings = (payload) => async (dispatch, getState) => {
  dispatch(clearSettingsError());
  dispatch(requestSettings());
  return await fetch(apiUrl.CLIENT_POST_NOTIFYSETTING, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("client result", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(receivedSettings(result.data));
      dispatch(settingSuccess(result.message));
    })
    .catch((err) => dispatch(settingsError(err.message)));
};

export const fetchSendCodeEmail = (payload) => async (dispatch, getState) => {
  dispatch(clearSettingsError());
  dispatch(requestSettings());
  return await fetch(`${apiUrl.CODEEMAIL_SEND}/${payload.email}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      process.env.NODE_ENV === "development" && console.log("client result", result);
      if (result.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(settingSuccess(result.message));
    })
    .catch((err) => dispatch(settingsError(err.message)));
};
