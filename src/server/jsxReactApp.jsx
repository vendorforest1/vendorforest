import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
//add style isomorphically using "withStyles"
import StyleContext from "isomorphic-style-loader/StyleContext";

import App from "@Shared/App";

//@ts-ignore
export default function(url, store, context, insertCss) {
  return (
    <Provider store={store}>
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </StyleContext.Provider>
    </Provider>
  );
}
