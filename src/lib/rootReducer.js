//v4
// import { combineReducers } from "redux";
// import { persistReducer, REHYDRATE } from "redux-persist";
// import storage from "redux-persist/lib/storage";

//v5
import { REHYDRATE, PURGE, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or whatever storage you are using

import loginReducer from "@Components/login/essential";
import registerReducer from "@Components/register/essential";
import messagesReducer from "@Components/messages/essential";
import homeReducer from "@Components/home/essential";

import vendorSettingsReducer from "@Components/logged_vendor/settings/essential";
import vendorProfileReducer from "@Components/logged_vendor/profile/essential";

import clientDashboardReducer from "@Components/logged_client/dashboard/essential";
import clientSettingsReducer from "@Components/logged_client/settings/essential";
import clientPostjobReducer from "@Components/logged_client/postjob/essential";
import clientJobDetailsReducer from "@Components/logged_client/jobDetails/essential";
import clientContractDetailsReducer from "@Components/logged_client/contractDetails/essential";
import clientReviewReducer from "@Components/logged_client/givefeedback/essential";

import vendorFindJobReducer from "@Components/logged_vendor/findJob/essential";
import vendorJobDetailsReducer from "@Components/logged_vendor/jobDetails/essential";
import vendorPlaceBidReducer from "@Components/logged_vendor/placebid/essential";
import vendorViewTeamReducer from "@Components/logged_vendor/viewTeam/essential";
import vendorDashboardReducer from "@Components/logged_vendor/dashboard/essential";
import vendorContractDetailsReducer from "@Components/logged_vendor/contractDetails/essential";
import vendorReviewReducer from "@Components/logged_vendor/givefeedback/essential";

import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// const AsyncStorage = useAsyncStorage("root");

//v4
// const persistConfig = {
//   key: "root",
//   storage, // persists even after tab is closed
//   // storage: sessionStorage, //persists only until tab is closed
//   whitelist: ["loginReducer", "login"],
//   // version: 0,
//   // blacklist: [],
//   timeout: null,
//   debug: true,
//   // stateReconciler: false,
//   stateReconciler: autoMergeLevel2,
//   // stateReconciler: hardSet,
//   writeFailHandler: (status) => {
//     console.log("Store setItem failed: ------ ", status);
//   },
// };

// const persistorReducer = (
//   state = {
//     error: false,
//     pending: false,
//   },
//   action,
// ) => {
//   switch (action.type) {
//     case REHYDRATE:
//       return Object.assign({}, state, action.payload, {
//         storeIsReady: true,
//       });
//     default:
//       return state;
//   }
// };

// const reducers = combineReducers({
//   // persistorReducer,
//   login: loginReducer,
//   loginReducer,
//   registerReducer,
//   homeReducer,
//   messagesReducer,
//   clientDashboardReducer,
//   clientPostjobReducer,
//   clientSettingsReducer,
//   clientJobDetailsReducer,
//   clientContractDetailsReducer,
//   clientReviewReducer,
//   vendorProfileReducer,
//   vendorSettingsReducer,
//   vendorDashboardReducer,
//   vendorFindJobReducer,
//   vendorJobDetailsReducer,
//   vendorPlaceBidReducer,
//   vendorViewTeamReducer,
//   vendorContractDetailsReducer,
//   vendorReviewReducer,
// });

const reducers = {
  // persistorReducer,
  login: loginReducer,
  loginReducer,
  registerReducer,
  homeReducer,
  messagesReducer,
  clientDashboardReducer,
  clientPostjobReducer,
  clientSettingsReducer,
  clientJobDetailsReducer,
  clientContractDetailsReducer,
  clientReviewReducer,
  vendorProfileReducer,
  vendorSettingsReducer,
  vendorDashboardReducer,
  vendorFindJobReducer,
  vendorJobDetailsReducer,
  vendorPlaceBidReducer,
  vendorViewTeamReducer,
  vendorContractDetailsReducer,
  vendorReviewReducer,
};
const config = {
  key: "primary",
  storage,
  timeout: null,
  // stateReconciler: autoMergeLevel2,
};
let reducer = persistCombineReducers(config, reducers);
export default reducer;
// export default persistReducer(persistConfig, reducer);
