// @ts-nocheck
import React from "react";
import { message, Icon, Avatar, Progress, Rate, Tag, Drawer } from "antd";
import { constants } from "@Shared/constants";
import { connect } from "react-redux";
import moment from "moment";
import CreateContract from "./CreateContract";
import ProposalDetails from "./ProposalDetails";
import { fetchDeclineProposal } from "./essential";
import defaultProfileImage from '@Components/images/profileplace.png'

class ProposalItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawVisible: false,
      pending: false,
    };
    this.search = this.search.bind(this);
    this.delete = this.delete.bind(this);
    this.chat = this.chat.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {}

  toggle() {
    this.setState({
      drawVisible: !this.state.drawVisible,
    });
  }

  search() {
    this.toggle();
  }

  delete() {
    const params = {
      _id: this.props.proposal._id,
    };
    this.setState({ pending: true });
    fetchDeclineProposal(params)
      .then((data) => {
        this.props.proposal.status = constants.PROPOSAL_STATUS.DECLINE;
        this.setState({ pending: false });
        message.success("Proposal has been declined.");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ pending: false });
        message.error(error.message);
      });
  }

  chat() {
    window.location.href = "/messages/c"
  }

  render() {
    return (
      <div className="propposal-item ">
        <div className="row">
          <div className="col-lg-4 col-md-6 vendor-profile-content d-flex">
            <Avatar
              src={this.props.proposal.vendor.profileImage || defaultProfileImage}
              className="photo"
            />
            <div className="ml-2">
              <h6 className="text-dark font-weight-bold">{this.props.proposal.vendor.username}</h6>
              <p>
                {this.props.proposal.vendor.vendor ? `${this.props.proposal.vendor.vendor.service.name}/${this.props.proposal.vendor.vendor.category.name}` : 'NONE'}
              </p>
              <p className="font-weight-bold text-blue">
                {constants.ACCOUNTTYPES[this.props.proposal.vendor.accountType]}
              </p>
              {this.props.proposal.vendor.bsLocation && (
                <p>
                  <span className=" font-weight-bold">Location: </span>
                  <Icon type="global" />
                  <span className="ml-1">
                    {this.props.proposal.vendor.bsLocation.city}/
                    {this.props.proposal.vendor.bsLocation.country}{" "}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-6 vendor-rate">
            <Progress
              percent={this.props.proposal.vendor.vendor.successRate}
              size="small"
              status="active"
              className="job-progress"
            />
            <span className="mr-2">{this.props.proposal.vendor.vendor.rate}</span>
            <Rate
              disabled
              value={this.props.proposal.vendor.vendor.rate}
              allowHalf={true}
              className="like-rate"
            />
            <span className="ml-1">{this.props.proposal.vendor.vendor.reviewCount} Reviews</span>
          </div>
          <div className="col-lg-4 col-md-6 d-block d-md-flex align-items-center justify-content-between">
            <h5 className="text-center col py-3 w-100">
              $ {this.props.proposal.offerBudget}
              {this.props.proposal.offerBudgetType === constants.BUDGET_TYPE.FIXED ? "" : "/hr"}
            </h5>
            {this.props.proposal.status === constants.PROPOSAL_STATUS.CREATED && (
              <div className="proposal-action col d-md-block d-flex justify-content-between">
                <p className="text-color pointer mb-1" onClick={this.search}>
                  <Icon type="search" className="mr-2" />View
                </p>
                <p className="text-red pointer mb-1" onClick={this.delete}>
                  <Icon type="close" className="mr-2" />
                  Delete
                  {this.state.pending && <Icon type="sync" spin className="ml-2" />}
                </p>
                <p className="text-color pointer" onClick={this.chat}>
                  <Icon type="wechat" className="mr-2" />
                  Chat
                </p>
              </div>
            )}
            {this.props.proposal.status === constants.PROPOSAL_STATUS.DECLINE && (
              <div className="w-100 text-md-right text-center col">
                <div>
                  <Tag color="red">
                    <Icon type="ban" className="mr-2" />
                    Decline
                  </Tag>
                </div>
                <p>{moment(this.props.proposal.updatedAt).format("MMM DD, YYYY HH:mm")}</p>
              </div>
            )}
            {this.props.proposal.status === constants.PROPOSAL_STATUS.HIRED && (
              <div className="w-100 text-md-right text-center col">
                <div>
                  <Tag color="green">
                    <Icon type="check" className="mr-2" />
                    Hired
                  </Tag>
                </div>
                <p>{moment(this.props.proposal.updatedAt).format("MMM DD, YYYY HH:mm")}</p>
              </div>
            )}
          </div>
        </div>
        {/* <Drawer
          placement="right"
          closable={true}
          onClose={this.toggle}
          visible={this.state.drawVisible}
          title={<span className="font-weight-bold">Create Contract</span>}
        >
          <CreateContract
            proposal={this.props.proposal}
            toggle={this.toggle}
            job={this.props.job}
          />
        </Drawer> */}
        <Drawer
          placement="right"
          closable={true}
          onClose={this.toggle}
          visible={this.state.drawVisible}
          title={
          <div className="d-flex">
            <h5 className="mr-4">Proposal Details</h5>
            <button className="button-primary" style={{
              height: '30px',
              lineHeight: '30px',
              minWidth: '80px'
            }}>Hire</button>
          </div>}
        >
          <ProposalDetails
            proposal={this.props.proposal}
            toggle={this.toggleProposal}
            job={this.props.job}
          />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ clientJobDetailsReducer, loginReducer }) => {
  const { error, job, success, pending } = clientJobDetailsReducer;

  const { user } = loginReducer;

  return { error, job, success, pending, user };
};

export default connect(
  mapStateToProps,
  {},
)(ProposalItem);
