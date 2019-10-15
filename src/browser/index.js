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
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import StyleContext from "isomorphic-style-loader/StyleContext";
// import { createBrowserHistory } from "history";

import App from "@Shared/App";
import configureStore from "@Shared/configureStore";

const mountApp = document.getElementById("root");

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

//window._initialData_ will be changed to use
// const store = configureStore(window.__initialData__);
// delete window.__initialData__;

//dangerouslySetInnerHTML

//SEE BELOW (still not preffered. Use context)

//function createMarkup() {
// return {__html: 'First &middot; Second'};
// }

// function MyComponent() {
//   return <div dangerouslySetInnerHTML={createMarkup()} />;
// }

const store = configureStore({});
const persistor = persistStore(store);
// const history = createBrowserHistory();

const jsx = (
  <Provider store={store}>
    <StyleContext.Provider value={{ insertCss }}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </StyleContext.Provider>
  </Provider>
);

ReactDOM.hydrate(jsx, mountApp);
