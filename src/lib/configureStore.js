import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import persistReducer from "./rootReducer";

const loggerMiddleware = createLogger();
const middleWare = [thunk];
const isSSR = typeof window === "undefined";

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === "development" && !isSSR) {
  middleWare.push(loggerMiddleware);
}

export default (initalState) => {
  const store = createStore(persistReducer, initalState, compose(applyMiddleware(...middleWare)));
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
