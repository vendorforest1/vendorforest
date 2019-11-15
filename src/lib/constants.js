import moment from "moment";
// eslint-disable-next-line no-process-env
const API_URL = process.env.API_URL;

export const constants = {
  GOOGLEMAP_API: "AIzaSyB7XtSfuHtmsmPBIYW4WzGS_QrwJ7DrX54",
  ACCOUNT_TYPE: {
    CLIENT: 0,
    VENDOR: 1,
    PROVENDOR: 2,
    VENUE: 3,
  },
  ACCOUNTTYPES: ["client", "vendor", "provendor", "venue"],
  BILLING_METHOD_TYPE: {
    CREDIT_CARD: 0,
    PAYPAL: 1,
  },
  PROD_COMMONERROR_MSG:
    "Sorry. We have found some error while processing your request. Please try again later.",
  JOB_VISIBILITY: {
    ANYONE: 0,
    ONLY_VENDOR: 1,
    ONLY_INVITE: 2,
  },
  JOB_VENDOR_TYPE: {
    ALL: 0,
    VENDOR: 1,
    PROVENDOR: 2,
  },
  BUDGET_TYPE: {
    FIXED: 0,
    HOURLY: 1,
  },
  AVB_HRS_PERWEEK: {
    LESS10: 0,
    LESS30: 1,
    MORE30: 2,
  },
  AVB_HRSPERWEEKS: ["Less than 10hrs/week", "10 ~ 30hrs/week", "30+ hrs/week "],
  JOB_STATUS: {
    POSTED: 0,
    HIRED: 1,
    COMPLETED: 2,
    CANCELED: 3,
    CLOSED: 4,
  },
  BID_TYPE: {
    INDIVIDUAL: 0,
    TEAM: 1,
  },
  OFFER_STATUS: {
    CREATED: 0,
    ACCEPT: 1,
    DECLINE: 2,
  },
  CONTRACT_STATUS: {
    CREATED: 0,
    END: 1,
  },
  MILESTONE_STATUS: {
    CREATED: 0,
    REQ_RELEASED: 1,
    RELEASED: 2,
  },
  PROPOSAL_STATUS: {
    CREATED: 0,
    DECLINE: 1,
    HIRED: 2,
  },
  ENDCONTRACT_REASON: {
    COMPLETED: 0,
    NO_EXPERIENCE: 1,
    OTHER: 2,
  },
  VENDOR_BADGES: {
    NONE: -1,
    ONTIME: 0,
    SKILLFUL: 1,
    EXCELLENT: 2,
    BYOND: 3,
    ENTERTAINING: 4,
    GREATE: 5,
  },
  API_URL: API_URL,
};

export const apiUrl = {
  LOGIN: `${API_URL}/apis/login`,
  REGISTER: `${API_URL}/apis/register`,
  GET_USER: `${API_URL}/apis/get_user`,
  EMAILSENT: `${API_URL}/apis/emailsent`,
  EMAILCONFIRM: `${API_URL}/apis/confirmation`,
  CODEEMAIL_SEND: `${API_URL}/apis/codeemail_send`,
  UPDATE_ACCOUNT: `${API_URL}/apis/account`,
  RESETPASS: `${API_URL}/apis/resetpass`,
  GET_HOMEDATA: `${API_URL}/apis/home`,

  GET_SERVICE: `${API_URL}/apis/service/get_services`,

  GET_STRIPE_ID: `${API_URL}/apis/payment/authorize`,

  CLIENT_GET_SETTINGS: `${API_URL}/apis/client/settings`,
  CLIENT_POST_ACCOUNT: `${API_URL}/apis/client/account`,
  CLIENT_POST_BILLING: `${API_URL}/apis/client/billing`,
  CLIENT_POST_RESETPASS: `${API_URL}/apis/client/resetpass`,
  CLIENT_POST_NOTIFYSETTING: `${API_URL}/apis/client/notification`,
  GET_PUB_KEY: `${API_URL}/apis/client/getpubkey`,
  GET_SETUP_INTENT: `${API_URL}/apis/client/getsetupintent`,
  GET_CLIENT_ID: `${API_URL}/apis/client/getclientid`,

  VENDOR_GET: `${API_URL}/apis/vendor/get`,
  VENDOR_FIND: `${API_URL}/apis/vendor/find`,
  VENDOR_POST_NOTIFYSETTING: `${API_URL}/apis/vendor/notification`,
  VENDOR_UPDATE_COMPANY: `${API_URL}/apis/vendor/update_company`,
  VENDOR_UPDATE_PROFILE: `${API_URL}/apis/vendor/update`,
  VENDOR_IN_RADIUS: `${API_URL}/apis/vendor/search_inradius`,

  GET_MYREVIEWS: `${API_URL}/apis/review/get_myreviews`,
  GET_REVIEW: `${API_URL}/apis/review/get`,
  GET_REVIEWS: `${API_URL}/apis/review/get_reviews`,
  CREATE_REVIEW: `${API_URL}/apis/review/create`,
  UPDATE_REVIEW: `${API_URL}/apis/review/update`,

  GET_MYPORTFOLIOS: `${API_URL}/apis/portfolio/get_myportfolios`,
  CREATE_PORTFOLIO: `${API_URL}/apis/portfolio/create`,
  UPDATE_PORTFOLIO: `${API_URL}/apis/portfolio/update`,

  GET_TEAM: `${API_URL}/apis/team/get`,
  GET_TEAMS: `${API_URL}/apis/team/get_teams`,
  CREATE_TEAM: `${API_URL}/apis/team/create`,
  UPDATE_TEAM: `${API_URL}/apis/team/update`,
  INVITE_TEAMUSERS: `${API_URL}/apis/team/invite_users`,
  ACCEPT_TEAM_INVITE: `${API_URL}/apis/team/invite_accept`,
  DECLINE_TEAM_INVITE: `${API_URL}/apis/team/invite_decline`,

  CREATE_JOB: `${API_URL}/apis/job/create`,
  UPDATE_JOB: `${API_URL}/apis/job/update`,
  GET_CLIENT_JOBS: `${API_URL}/apis/job/get_client_jobs`,
  FIND_JOBS: `${API_URL}/apis/job/find`,
  GET_JOB: `${API_URL}/apis/job/get`,
  SEND_EMAIL: `${API_URL}/apis/job/send_email`,

  CREATE_PROPOSAL: `${API_URL}/apis/proposal/create`,
  UPDATE_PROPOSAL: `${API_URL}/apis/proposal/update`,
  DECLINE_PROPOSAL: `${API_URL}/apis/proposal/delete`,
  GET_PROPOSALE: `${API_URL}/apis/proposal/get`,
  GET_PROPOSALES: `${API_URL}/apis/proposal/get_proposales`,

  GET_OFFERS: `${API_URL}/apis/offer/get_offers`,
  DECLINE_OFFER: `${API_URL}/apis/offer/decline`,
  ACCEPT_OFFER: `${API_URL}/apis/offer/accept`,

  CREATE_CONTRACT: `${API_URL}/apis/contract/create`,
  UPDATE_CONTRACT: `${API_URL}/apis/contract/update`,
  END_CONTRACT: `${API_URL}/apis/contract/end`,
  GET_CONTRACTS: `${API_URL}/apis/contract/get_contracts`,
  GET_CONTRACT: `${API_URL}/apis/contract/get`,
  GET_ATTACHFILES: `${API_URL}/apis/contract/get_attachfiles`,

  CREATE_MILESTONE: `${API_URL}/apis/milestone/create`,
  UPDATE_MILESTONE: `${API_URL}/apis/milestone/update`,
  REQ_RELEASE_MILESTONE: `${API_URL}/apis/milestone/req_release`,
  RELEASE_MILESTONE: `${API_URL}/apis/milestone/release`,
  CANCEL_MILESTONE: `${API_URL}/apis/milestone/cancel`,
  GET_MILESTONES: `${API_URL}/apis/milestone/get_milestones`,
  GET_MILESTONE: `${API_URL}/apis/milestone/get`,
};

export const getTimeFromTimezone = (timeZone) => {
  const a = timeZone.split("UTC")[1];
  const symbol = a[0];
  if (symbol === "-") {
    const diffHr = a.slice(1, 3);
    const diffMin = a.slice(4, 6);
    return moment()
      .utc()
      .subtract(diffHr, "hours")
      .subtract(diffMin, "minutes")
      .format("hh:mm A");
  } else if (symbol === "+") {
    const diffHr = a.slice(1, 3);
    const diffMin = a.slice(4, 6);
    return moment()
      .utc()
      .add(diffHr, "hours")
      .add(diffMin, "minutes")
      .format("hh:mm A");
  } else {
    return moment()
      .utc()
      .format("hh:mm A");
  }
};
