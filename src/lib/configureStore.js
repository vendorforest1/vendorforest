import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import reducer from "./rootReducer";

// const loggerMiddleware = createLogger();
const middleware = [thunk];
// const isSSR = typeof window === "undefined";

const composeEnhancers =
  // @ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

// eslint-disable-next-line no-process-env
// if (process.env.NODE_ENV === "development" || (process.env.MODE === "development" && !isSSR)) {
//   middleware.push(loggerMiddleware);
// }

// @ts-ignore
export default (initalState) => {
  // let store = null;
  let store = createStore(reducer /* preloadstate */, undefined, enhancer);
  const persistor = persistStore(store, null, () => {
    store.getState(); //to get restoredState
  });
  // const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
