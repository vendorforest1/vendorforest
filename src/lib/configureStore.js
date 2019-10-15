import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./rootReducer";

const loggerMiddleware = createLogger();

const middleWare = [thunk];

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === "development") {
  middleWare.push(loggerMiddleware);
}
/** @param  initialState string*/
export default (initialState) =>
  createStore(rootReducer, initialState, applyMiddleware(...middleWare));
