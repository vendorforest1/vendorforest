import React from "react";
import { Icon, List } from "antd";
import PastContractItem from "./PastContractItem";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";

import { fetchPastContractsData } from "./essential";

class PastConstracts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.user &&
      this.props.fetchPastContractsData({
        vendor: this.props.user.userObj._id,
        status: constants.CONTRACT_STATUS.END,
      });
  }

  render() {
    return (
      <div className="past-contracts shadow">
        <div className="head">
          <h4 className="text-grey">Past Contracts</h4>
        </div>
        <div className="contract-list-content">
          <div className="w-100">
            {!this.props.pastContracts && this.props.pending && (
              <div className="w-100 p-5 text-center loading-small">
                <Icon type="sync" spin />
              </div>
            )}
            {this.props.pastContracts && !this.props.pending && (
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 2,
                }}
                dataSource={this.props.pastContracts}
                footer={<div></div>}
                renderItem={(item, index) => (
                  <List.Item
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.location.href = `/vendor/contract/${item._id}`;
                    }}
                  >
                    <PastContractItem contract={item} />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorDashboardReducer, loginReducer }) => {
  const { error, success, pending, pastContracts } = vendorDashboardReducer;
  const { user } = loginReducer;
  return {
    error,
    success,
    pending,
    pastContracts,
    user,
  };
};

export default connect(mapStateToProps, {
  fetchPastContractsData,
})(PastConstracts);
