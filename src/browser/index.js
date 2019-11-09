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
import { PersistGate } from "redux-persist/integration/react";
import StyleContext from "isomorphic-style-loader/StyleContext";
// import { createBrowserHistory } from "history";

import App from "@Shared/App";
import configureStore from "@Shared/configureStore";
// import { ContextProvider, ContextConsumer } from "@Shared/SharedContext";

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

  // change if a better way using --context is discovered
  const { persistor, store } = await configureStore(deserialize(preloadedState));
  persistor.dispatch({ type: "persist/REHYDRATE" });
  console.log(persistor.getState());
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
}

hydrate();
