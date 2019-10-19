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
    exit: process.exit,
  };
}