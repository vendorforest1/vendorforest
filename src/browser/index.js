// @ts-nocheck
/**
 * Talik Kasozi <talik.aziizi@gmail.com>
 *
 * vendorForest.com
 */
//All entry point must have this line
// polyfill all `core-js` features:
import "core-js";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import StyleContext from "isomorphic-style-loader/StyleContext";

import App from "@Shared/App";
import configureStore from "@Shared/configureStore";
import { REHYDRATE, PERSIST, FLUSH } from "redux-persist";
const evaluateString = eval;

function deserialize(serializedJavascript) {
  return evaluateString("(" + serializedJavascript + ")");
}

async function hydrate() {
  const mountApp = document.getElementById("root");

  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;

  const insertCss = (...styles) => {
    const removeCss = styles.map((style) => style._insertCss());
    return () => removeCss.forEach((dispose) => dispose());
  };
  try {
    // change if a better way using --context is discovered
    console.log("deserialize(preloadedState): ", deserialize(preloadedState));
    const { persistor, store } = await configureStore(deserialize(preloadedState));
    //    await store.dispatch({ type: "persit/PURGE"});

    const jsx = (
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </StyleContext.Provider>
    );
    ReactDOM.render(jsx, mountApp);
  } catch (e) {
    console.log("somewent wrong while app was hydrating!");
  }
}

hydrate();
