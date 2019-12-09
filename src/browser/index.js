/**
 * Talik Kasozi <talik.aziizi@gmail.com>
 *
 * vendorForest.com
 */
import "core-js";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import StyleContext from "isomorphic-style-loader/StyleContext";

import App from "@Shared/App";
import configureStore from "@Shared/configureStore";

const evaluateString = eval;

// function deserialize(serializedJavascript) {
//   return evaluateString("(" + serializedJavascript + ")");
// }

async function hydrate() {
  const mountApp = document.getElementById("root");

  // @ts-ignore
  // const preloadedState = window.__PRELOADED_STATE__;
  // @ts-ignore
  delete window.__PRELOADED_STATE__;

  const insertCss = (...styles) => {
    const removeCss = styles.map((style) => style._insertCss());
    return () => removeCss.forEach((dispose) => dispose());
  };

  // change if a better way using --context is discovered
  const { persistor, store } = await configureStore(undefined);
  // const { persistor, store } = await configureStore(deserialize(preloadedState));
  const jsx = (
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StyleContext.Provider>
  );
  try {
    ReactDOM.render(jsx, mountApp);
  } catch (e) {
    process.env.NODE_ENV === "development" &&
    console.log("something bad happened! ", e.message);
  }
}

hydrate();
