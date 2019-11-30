import express from "express";
import session from "express-session";
import { connection, connect } from "mongoose";
import connectMongo from "connect-mongo";
import uuidv4 from "uuid/v4";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";

import config, { passportConfig } from "./Config";

// local config store, App and routes
import configureStore from "@Shared/configureStore";
import createApp from "./jsxReactApp";
import routes from "./routes";

const reload = require("reload");
const app = express();
const env = config();
const MongoStore = connectMongo(session);

const PORT = env.PORT;

console.log(env);
//this is Development demo for production. in real production see below
//set cookie to sess.cookie.secure = true;
if (env.MODE === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

// add & configure middleware
// set morgan to log info about our requests for development use.
// app.use(morgan(env.MODE));

//TODO why do I use this, is there a better way?
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use("/static", express.static("dist/static"));
// app.use("/static", express.static("./public"));
// app.set("views", path.resolve("public"));
app.set("views", path.resolve("dist/static"));
app.set("view engine", "ejs");
app.use(express.static("public"));
//create the server
//initializing connections
connect(env.CONNSTR, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected"))
  .catch((error) => {
    console.log("Connection failed with - ", error);
  });

//DB connection
const DBCONN = connection;

const sess = {
  genid: () => {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: `${env.SECRET}`,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
    mongooseConnection: DBCONN,
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    autoRemove: "interval",
    autoRemoveInterval: 10, // In minutes. Default
  }),
};
app.use(session(sess));

passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes(app, passport));

//TODO use prefetchData the right way. SPIKE
// async function prefetchData(url, store) {
//   const promises = appRoutes
//     .map((route) => ({ route, match: matchPath(url, route) }))
//     .filter(({ route, match }) => match && route.component.fetchInitialData)
//     .map(async ({ match, route }) => {
//       return await route.component.fetchInitialData(store);
//     });
//   return Promise.all(promises);
// }

app.get("*", (req, res, next) => {
  //file request are not processed here
  if (/[.]/.exec(req.url)) {
    return next();
  }

  const { store } = configureStore();
  // const promises = prefetchData(req.url, store);

  // promises.then(() => {
  let context;
  const css = new Set(); // CSS for all rendered React components

  const insertCss = (...styles) =>
    styles.forEach((style) => {
      css.add(style._getCss());
    });

  context = {};
  // context = store.getState();

  const markup = ReactDOMServer.renderToString(createApp(req.url, store, context, insertCss));

  res.render("index", {
    MARKUP: markup,
    CSS: [...css].join(""),
    // preloadedState: serialize(context, { isJSON: true }),
    INITIAL_STATE: `<script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // http://redux.js.org/recipes/ServerRendering.html#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(serialize(context)).replace(/</g, "\\u003c")}
    </script>`,
    HOT_RELOAD: env.MODE === "development" ? "/reload/reload.js" : "",
  });
});

//dev experience
env.MODE === "development" &&
  reload(app)
    .then(() => {
      // reloadReturned object see returns documentation below for what is returned
      // Reload started
      app
        .listen(PORT, () => {
          console.log(`App listening on port ${PORT}!`);
        })
        .on("error", (error) => {
          if (error.syscall !== "listen") {
            throw error;
          }
          let bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

          // handle specific listen errors with friendly messages
          switch (error.code) {
            case "EACCES":
              console.error(bind + " requires elevated privileges");
              env.exit(1);
              break;
            case "EADDRINUSE":
              console.error(bind + " is already in use");
              env.exit(1);
              break;
            default:
              throw error;
          }
        });
    })
    .catch(function() {
      // Reload did not start correctly, handle error
      console.log("Reload error!");
    });

env.MODE === "production" &&
  app
    .listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    })
    .on("error", (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }
      let bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          env.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          env.exit(1);
          break;
        default:
          throw error;
      }
    });
export default app;
