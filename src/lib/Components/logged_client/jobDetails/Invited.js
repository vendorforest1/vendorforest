import React from "react";
import { List, Icon } from "antd";
import { connect } from "react-redux";
import ProposalItem from "./ProposalItem";

class InvitedProposales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const invitedProposales = this.props.proposales.filter((proposal) => {
      return (
        this.props.job.invitedVendors.findIndex((user) => user._id === proposal.vendor._id) > -1
      );
    });

    return (
      <div className="proposals py-md-4 py-2">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={invitedProposales}
          footer={<div></div>}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <ProposalItem proposal={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ clientJobDetailsReducer, loginReducer }) => {
  const { error, job, success, proposales, pending } = clientJobDetailsReducer;

  const { user } = loginReducer;

  return { error, job, success, proposales, pending, user };
};

export default connect(mapStateToProps, {})(InvitedProposales);
