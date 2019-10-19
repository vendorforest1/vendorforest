import NoMatch from "@Components/NoMatch";
import Home from "@Components/home";
import MainLogin from "@Components/login";
import MainRegister from "@Components/register";
import ResetPass from "@Components/reset_pass";
import EmailConfirmRequire from "@Components/email_alert/ConfrimRequire";
import EmailConfrimSuccess from "@Components/email_alert/ConfrimSuccess";
import PostJob from "@Components/logged_client/postjob";
import ClientDashboard from "@Components/logged_client/dashboard";
import ClientContractDetails from "@Components/logged_client/contractDetails";
import ClientGiveFeedBack from "@Components/logged_client/givefeedback";
import ClientSettings from "@Components/logged_client/settings";
import ClientJobDetails from "@Components/logged_client/jobDetails";
import ClientDispute from "@Components/logged_client/clientDispute";
import FindVendors from "@Components/findvendors";

import VendorDashboard from "@Components/logged_vendor/dashboard";
import VendorJobDetails from "@Components/logged_vendor/jobDetails";
import VendorGiveFeedBack from "@Components/logged_vendor/givefeedback";
import VendorPlacebid from "@Components/logged_vendor/placebid";
import VendorFindJob from "@Components/logged_vendor/findJob";
import RegisterVendors from "@Components/logged_vendor/register";
import VendorProfile from "@Components/logged_vendor/profile";
import VendorViewTeam from "@Components/logged_vendor/viewTeam";
import VendorDispute from "@Components/logged_vendor/vendorDispute";
import VendorSettings from "@Components/logged_vendor/settings";
import ProVendorSettings from "@Components/logged_vendor/provendorSettings";
import VendorContractDetails from "@Components/logged_vendor/contractDetails";

import RegisterVenue from "@Components/logged_venue/register";
import FindVenues from "@Components/findvenues";
import VenueDetails from "@Components/venueDetails";
import VenueSettings from "@Components/logged_venue/settings";
import ServiceCategories from "@Components/service_categories";
import Messages from "@Components/messages";

export default [
  {
    path: `/`,
    exact: true,
    component: Home
  },
  {
    path: "/login",
    exact: true,
    component: MainLogin
  },
  {
    path: "/register",
    exact: true,
    component: MainRegister
  },
  {
    path: "/resetpass",
    exact: true,
    component: ResetPass
  },
  {
    path: "/categories/:id",
    exact: true,
    component: ServiceCategories
  },
  {
    path: "/messages/:actype",
    exact: true,
    component: Messages
  },
  {
    path: "/messages/room/:room_id",
    exact: true,
    component: Messages
  },
  {
    path: "/findvendors",
    exact: true,
    component: FindVendors
  },

  /*================================== CLIENT LINKS ==========================*/
  {
    path: '/client/settings',
    exact: true,
    component: ClientSettings
  },
  {
    path: "/client/postjob",
    exact: true,
    component: PostJob
  },
  {
    path: "/client/editjob/:id",
    exact: true,
    component: PostJob
  },
  {
    path: "/client/contract/:id",
    exact: true,
    component: ClientContractDetails
  },
  {
    path: "/client/job/:id",
    exact: true,
    component: ClientJobDetails
  },
  {
    path: "/client/givefeedback/:contract_id",
    exact: true,
    component: ClientGiveFeedBack
  },
  {
    path: "/client/dispute",
    exact: true,
    component: ClientDispute
  },
  {
    path: "/client",
    exact: true,
    component: ClientDashboard
  },
  /*================================== VENDOR LINKS ==========================*/
  {
    path: "/vendor/profile",
    exact: true,
    component: VendorProfile
  },
  {
    path: "/vendor/registration",
    exact: true,
    component: RegisterVendors
  },
  {
    path: "/vendor/job/:id",
    exact: true,
    component: VendorJobDetails
  },
  {
    path: "/vendor/placebid/:job_id/:proposal_id",
    exact: true,
    component: VendorPlacebid
  },
  {
    path: "/vendor/placebid/:job_id",
    exact: true,
    component: VendorPlacebid
  },
  {
    path: "/vendor/givefeedback/:contract_id",
    exact: true,
    component: VendorGiveFeedBack
  },
  {
    path: "/vendor/dispute",
    exact: true,
    component: VendorDispute
  },
  {
    path: "/vendor/settings",
    exact: true,
    component: VendorSettings
  },
  {
    path: "/provendorsettings",
    exact: true,
    component: ProVendorSettings
  },
  {
    path: "/vendor/findjob",
    exact: true,
    component: VendorFindJob
  },
  {
    path: "/vendor/team/:id",
    exact: true,
    component: VendorViewTeam
  },
  {
    path: "/vendor/contract/:id",
    exact: true,
    component: VendorContractDetails
  },
  {
    path: "/vendor",
    exact: true,
    component: VendorDashboard
  },
  /*================================ Venue ====================================*/
  {
    path: `/venue`,
    component: RegisterVenue
  },
  {
    path: `/venuesettings`,
    component: VenueSettings
  },
  {
    path: "/findvenues",
    exact: true,
    component: FindVenues
  },
  {
    path: "/venuedetails",
    exact: true,
    component: VenueDetails
  },
  /*================================ PRO VENDOR LINKS ========================*/
  {
    path: `/emailsent/:id`,
    component: EmailConfirmRequire
  },
  {
    path: `/confirmation/:token`,
    component: EmailConfrimSuccess
  },
  {
    path: "*",
    component: NoMatch
  }
];