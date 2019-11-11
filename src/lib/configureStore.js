import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import reducer from "./rootReducer";

const loggerMiddleware = createLogger();
const middleWare = [thunk];
const isSSR = typeof window === "undefined";

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === "development" || (process.env.MODE === "development" && !isSSR)) {
  middleWare.push(loggerMiddleware);
}

export default (initalState) => {
  // let store = null;
  let store = createStore(reducer, undefined, compose(applyMiddleware(...middleWare)));
  const persistor = persistStore(store, null, () => {
    store.getState(); //to get restoredState
  });
  // const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
