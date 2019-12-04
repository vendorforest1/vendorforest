export * from "./constants";
export * from "./passport";

export default function() {
  const env = process.env;
  return {
    PORT: env.PORT,
    MODE: env.NODE_ENV,
    DB_CONN: env.DB_CONN,
    SESS_DB: env.SESS_DB,
    SESS_COLLECTION: env.SESS_COLLECTION,
    DATABASE_CONNECTION: env.DATABASE_CONNECTION,
    STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_CLIENT: env.STRIPE_CLIENT,

    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    SUPPORT_SECRET: process.env.SUPPORT_SECRET,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SERVER_TWILIO_NUMBER: process.env.SERVER_TWILIO_NUMBER,

    COMET_WEB_PUSH_CONTACT: process.env.COMET_WEB_PUSH_CONTACT,
    COMET_PUBLIC_VAPID_KEY: process.env.COMET_PUBLIC_VAPID_KEY,
    COMET_PRIVATE_VAPID_KEY: process.env.COMET_PRIVATE_VAPID_KEY,

    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    OAUTH_SECRET: process.env.OAUTH_SECRET,
    OAUTH_SCOPE: process.env.OAUTH_SCOPE,
    OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
    OAUTH_TOKEN: process.env.OAUTH_TOKEN,
    exit: process.exit,
  };
}
