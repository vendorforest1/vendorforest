import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/lib/storage/session";

import loginReducer from '@Components/login/essential';
import registerReducer from '@Components/register/essential';
import messagesReducer from '@Components/messages/essential';
import homeReducer from '@Components/home/essential';

import vendorSettingsReducer from '@Components/logged_vendor/settings/essential';
import vendorProfileReducer from '@Components/logged_vendor/profile/essential';

import clientDashboardReducer from '@Components/logged_client/dashboard/essential';
import clientSettingsReducer from '@Components/logged_client/settings/essential';
import clientPostjobReducer from '@Components/logged_client/postjob/essential';
import clientJobDetailsReducer from '@Components/logged_client/jobDetails/essential';
import clientContractDetailsReducer from '@Components/logged_client/contractDetails/essential';
import clientReviewReducer from '@Components/logged_client/givefeedback/essential';


import vendorFindJobReducer from '@Components/logged_vendor/findJob/essential';
import vendorJobDetailsReducer from '@Components/logged_vendor/jobDetails/essential';
import vendorPlaceBidReducer from '@Components/logged_vendor/placebid/essential';
import vendorViewTeamReducer from '@Components/logged_vendor/viewTeam/essential';
import vendorDashboardReducer from '@Components/logged_vendor/dashboard/essential';
import vendorContractDetailsReducer from '@Components/logged_vendor/contractDetails/essential';
import vendorReviewReducer from '@Components/logged_vendor/givefeedback/essential';


const persistConfig = {
  key: "primary",
  // storage: sessionStorage, //persists only until tab is closed
  storage, // persists even after tab is closed
  whitelist: ["loginReducer"],
  blacklist: [],
  timeout: null,
};

/*const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: []
  }*/

const reducers = combineReducers({
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
});

export default persistReducer(persistConfig, reducers);
