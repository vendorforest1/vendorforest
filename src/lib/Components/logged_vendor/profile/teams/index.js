// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Modal, Button, Steps } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import style from "./index.scss";
import AddStepOne from "./AddStepOne";
import AddStepTwo from "./AddStepTwo";
import { fetchTeamsData } from "../essential";
const Step = Steps.Step;

class VendorTeams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModal: false,
      newTeam: {},
      currentStep: 0,
    };
    this.toggle = this.toggle.bind(this);
    this.updateNewTeam = this.updateNewTeam.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  toggle() {
    this.setState({
      isModal: !this.state.isModal,
      currentStep: 0,
    });
  }

  updateStep(step) {
    this.setState({
      currentStep: step,
    });
  }

  updateNewTeam(team) {
    this.setState({
      newTeam: team,
    });
  }

  componentDidMount() {
    this.props.fetchTeamsData();
  }

  render() {
    const generateTeams = () => {
      if (this.props.teams.length === 0) {
        return <h6 className="text-danger p-5 text-center w-100">No Teams</h6>;
      }
      return this.props.teams.map((team, index) => {
        return (
          <div className="col-md-4 mb-2" key={index}>
            <Card
              title={team.name}
              extra={<a href={`/vendor/team/${team._id}`}>View</a>}
              className="w-100 h-100"
            >
              <p className="mb-3">{team.about}</p>
              <p>
                Member Count: <span className="text-color">{team.members.length}</span>
              </p>
            </Card>
          </div>
        );
      });
    };

    return (
      <div className="vendor-teams">
        <Card
          title={<span className="h5 font-weight-bold">Teams</span>}
          className="shadow"
          style={{ marginBottom: "50px" }}
          extra={
            <div onClick={this.toggle} className="text-color" style={{ cursor: "pointer" }}>
              <Icon type="plus" />
            </div>
          }
        >
          {!this.props.teams && this.props.pending && (
            <div className="w-100 p-5 text-center loading-small">
              <Icon type="sync" spin />
            </div>
          )}
          {this.props.teams && <div className="row">{generateTeams()}</div>}
        </Card>
        <Modal
          title="Add Team"
          visible={this.state.isModal}
          onOk={this.toggle}
          onCancel={this.toggle}
          width={"800px"}
          footer={[null, null]}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Steps size="large" current={this.state.currentStep}>
                  {["About the team", "Members"].map((title, index) => (
                    <Step key={index} title={title} />
                  ))}
                </Steps>
                <div className="mt-5">
                  {this.state.currentStep === 0 && (
                    <AddStepOne
                      team={this.state.newTeam}
                      updateTeam={this.updateNewTeam}
                      updateStep={this.updateStep}
                    />
                  )}
                  {this.state.currentStep === 1 && (
                    <AddStepTwo
                      team={this.state.newTeam}
                      updateStep={this.updateStep}
                      toggle={this.toggle}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorProfileReducer, loginReducer }) => {
  const { error, teams, pending } = vendorProfileReducer;
  const { user } = loginReducer;
  return {
    error,
    teams,
    pending,
    user,
  };
};

export default connect(mapStateToProps, {
  fetchTeamsData,
})(withStyles(style)(VendorTeams));
