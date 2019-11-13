import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import { connect } from "react-redux";
import moment from "moment";
import VendorMemberItem from "./MemberItem";
import localStyle from "./index.scss";
import VendorMemberList from "./MemberList";
import VendorOffers from "./Offers";
import VendorPendingContracts from "./PendingContracts";
import VendorPastContracts from "./PastContracts";

import { fetchTeamData } from "./essential";
import { message, Icon } from "antd";
import VendorForestHeader from "@Components/inc/vendor_header";
import VendorForestFooter from "@Components/inc/footer";
import globalStyle from "@Sass/index.scss";

class VendorViewTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVendorName: "",
      team: {
        name: "Team1",
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque possimus facilis architecto iure eum aliquid, praesentium totam nemo molestiae rerum.",
        members: [
          {
            name: "Gerard Kasemba",
            email: "gerardkasemba@mail.com",
            location: "Boston, MA, United States",
            localTime: "4:30 PM",
            rate: 5.0,
            permission: 0,
          },
          {
            name: "Gerard Kasemba",
            email: "gerardkasemba@mail.com",
            location: "Boston, MA, United States",
            localTime: "4:30 PM",
            rate: 5.0,
            permission: 0,
          },
        ],
      },
      jobs: [],
      pendingContracts: [],
      pastContracts: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchTeamData({
        _id: this.props.match.params.id,
      });
    }
    let jobs = [];
    let pendingContracts = [];
    let pastContracts = [];
    for (let i = 0; i < 6; i++) {
      jobs.push({
        title: "The job title goes here all the time",
        timeline: "June 12-06:30 AMToJune 15-06:30 PM",
        location: "Boston, MA, USA",
        client: {
          name: "Jaon Micle",
          location: "Boston, MA, USA",
        },
        budget: 3000,
      });
      pendingContracts.push({
        job: {
          title: `Wedding job for my brother ${i + 1}`,
          skills: ["Photographer", "Wedding Photographer"],
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, quod sunt. Quasi tempore, quo alias laborum nulla ipsum consequatur doloribus, eos dolorem minima provident impedit, veritatis commodi hic. Labore fuga tenetur illo, quo nesciunt eum. Molestias esse in facilis quasi exercitationem autem enim incidunt distinctio, tempore, atque hic amet omnis ipsa qui. Nisi, laboriosam ex doloremque impedit eveniet ducimus dolores labore ratione facilis nesciunt",
          startDate: "June 12",
          startTime: "06:30 AM",
          endDate: "June 15",
          endTime: "06:30 PM",
          location: "Boston, MA, USA",
          budget: 1500,
        },
        employee: {
          email: "jaonmicle@outlook.com",
          name: "Jaon Micle",
          location: "China",
          localTime: "03:00 AM",
          online: true,
        },
        startDate: moment(),
        estimatedEndDate: moment().add(7, "days"),
        contractBudget: 2056,
        progress: 50,
        status: 0,
      });
      pastContracts.push({
        job: {
          title: `Wedding job for my brother ${i + 1}`,
          skills: ["Photographer", "Wedding Photographer"],
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, quod sunt. Quasi tempore, quo alias laborum nulla ipsum consequatur doloribus, eos dolorem minima provident impedit, veritatis commodi hic. Labore fuga tenetur illo, quo nesciunt eum. Molestias esse in facilis quasi exercitationem autem enim incidunt distinctio, tempore, atque hic amet omnis ipsa qui. Nisi, laboriosam ex doloremque impedit eveniet ducimus dolores labore ratione facilis nesciunt",
          startDate: "June 12",
          startTime: "06:30 AM",
          endDate: "June 15",
          endTime: "06:30 PM",
          location: "Boston, MA, USA",
          budget: 1500,
        },
        employee: {
          email: "jaonmicle@outlook.com",
          name: "Jaon Micle",
          location: "China",
          localTime: "03:00 AM",
          online: true,
        },
        completedDate: moment(),
        completedBudget: 2056,
        status: 1,
        rate: 5,
      });
    }
    this.setState({
      jobs: jobs,
      pendingContracts: pendingContracts,
      pastContracts: pastContracts,
    });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (!this.props.success && newProps.success) {
      message.success(newProps.success);
    }
    if (!this.props.error && newProps.error) {
      message.error(newProps.error);
    }
  }

  render() {
    return (
      <div id="vendor-viewteam">
        <VendorForestHeader />
        <div className="container">
          <div className="row">
            <div className="col-12 content-wrap">
              {!this.props.team && this.props.pending && (
                <div className="w-100 p-5 text-center loading mb-5">
                  <Icon type="sync" spin />
                </div>
              )}
              {this.props.team && (
                <div className="content">
                  <VendorMemberList team={this.props.team} />
                  {this.props.team.invitedUsers.findIndex(
                    (user) => user._id === this.props.user.userObj._id,
                  ) === -1 && (
                    <div>
                      <VendorOffers />
                      <VendorPendingContracts contracts={this.state.pendingContracts} />
                      <VendorPastContracts contracts={this.state.pastContracts} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <VendorForestFooter />
      </div>
    );
  }
}

const mapStateToProps = ({ vendorViewTeamReducer, loginReducer }) => {
  const { error, team, success, pending } = vendorViewTeamReducer;

  const { user } = loginReducer;

  return {
    error,
    team,
    success,
    pending,
    user,
  };
};

export default connect(mapStateToProps, {
  fetchTeamData,
})(withStyles(globalStyle, localStyle)(VendorViewTeam));
