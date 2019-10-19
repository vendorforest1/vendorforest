import moment from "moment";
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
    CANCELED: 2,
    CLOSED: 3,
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
  SERVER_URL: "http://192.168.0.127:4444",
};

export const apiUrl = {
  LOGIN: "/apis/login",
  REGISTER: "/apis/register",
  GET_USER: "/apis/get_user",
  EMAILSENT: "/apis/emailsent",
  EMAILCONFIRM: "/apis/confirmation",
  CODEEMAIL_SEND: "/apis/codeemail_send",
  UPDATE_ACCOUNT: "/apis/account",
  RESETPASS: "/apis/resetpass",
  GET_HOMEDATA: "/apis/home",

  GET_SERVICE: "/apis/service/get_services",

  CLIENT_GET_SETTINGS: "/apis/client/settings",
  CLIENT_POST_ACCOUNT: "/apis/client/account",
  CLIENT_POST_BILLING: "/apis/client/billing",
  CLIENT_POST_RESETPASS: "/apis/client/resetpass",
  CLIENT_POST_NOTIFYSETTING: "/apis/client/notification",

  VENDOR_GET: "/apis/vendor/get",
  VENDOR_FIND: "/apis/vendor/find",
  VENDOR_POST_NOTIFYSETTING: "/apis/vendor/notification",
  VENDOR_UPDATE_COMPANY: "/apis/vendor/update_company",
  VENDOR_UPDATE_PROFILE: "/apis/vendor/update",
  VENDOR_IN_RADIUS: "/apis/vendor/search_inradius",

  GET_MYREVIEWS: "/apis/review/get_myreviews",
  GET_REVIEW: "/apis/review/get",
  GET_REVIEWS: "/apis/review/get_reviews",
  CREATE_REVIEW: "/apis/review/create",
  UPDATE_REVIEW: "/apis/review/update",

  GET_MYPORTFOLIOS: "/apis/portfolio/get_myportfolios",
  CREATE_PORTFOLIO: "/apis/portfolio/create",
  UPDATE_PORTFOLIO: "/apis/portfolio/update",

  GET_TEAM: "/apis/team/get",
  GET_TEAMS: "/apis/team/get_teams",
  CREATE_TEAM: "/apis/team/create",
  UPDATE_TEAM: "/apis/team/update",
  INVITE_TEAMUSERS: "/apis/team/invite_users",
  ACCEPT_TEAM_INVITE: "/apis/team/invite_accept",
  DECLINE_TEAM_INVITE: "/apis/team/invite_decline",

  CREATE_JOB: "/apis/job/create",
  UPDATE_JOB: "/apis/job/update",
  GET_CLIENT_JOBS: "/apis/job/get_client_jobs",
  FIND_JOBS: "/apis/job/find",
  GET_JOB: "/apis/job/get",

  CREATE_PROPOSAL: "/apis/proposal/create",
  UPDATE_PROPOSAL: "/apis/proposal/update",
  DECLINE_PROPOSAL: "/apis/proposal/delete",
  GET_PROPOSALE: "/apis/proposal/get",
  GET_PROPOSALES: "/apis/proposal/get_proposales",

  GET_OFFERS: "/apis/offer/get_offers",
  DECLINE_OFFER: "/apis/offer/decline",
  ACCEPT_OFFER: "/apis/offer/accept",

  CREATE_CONTRACT: "/apis/contract/create",
  UPDATE_CONTRACT: "/apis/contract/update",
  END_CONTRACT: "/apis/contract/end",
  GET_CONTRACTS: "/apis/contract/get_contracts",
  GET_CONTRACT: "/apis/contract/get",
  GET_ATTACHFILES: "/apis/contract/get_attachfiles",

  CREATE_MILESTONE: "/apis/milestone/create",
  UPDATE_MILESTONE: "/apis/milestone/update",
  REQ_RELEASE_MILESTONE: "/apis/milestone/req_release",
  RELEASE_MILESTONE: "/apis/milestone/release",
  CANCEL_MILESTONE: "/apis/milestone/cancel",
  GET_MILESTONES: "/apis/milestone/get_milestones",
  GET_MILESTONE: "/apis/milestone/get",
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
