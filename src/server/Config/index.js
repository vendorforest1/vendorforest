export * from "./constants";
export * from "./passport";

export default function() {
  const env = process.env;
  return {
    PORT: env.PORT,
    MODE: env.NODE_ENV,
    DB_CONN: env.DB_CONN,
    SESS_DB: env.SESS_DB,
    SESS_DB_USER: env.SESS_DB_USER,
    SESS_COLLECTION: env.SESS_COLLECTION,
    CONNSTR: env.CONNSTR,
    STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: env.STRIPE_PUBLISHABLE_KEY,
    CLIENT_ID: env.CLIENT_ID,
    EMAIL_ADDRESS:process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    ACCOUNT_SID:process.env.ACCOUNT_SID,
    AUTH_TOKEN:process.env.AUTH_TOKEN,
    SERVER_TWILIO_NUMBER:process.env.SERVER_TWILIO_NUMBER,
    WEB_PUSH_CONTACT:process.env.WEB_PUSH_CONTACT,
    PUBLIC_VAPID_KEY:process.env.PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY:process.env.PRIVATE_VAPID_KEY,
    exit: process.exit,
  };
}
