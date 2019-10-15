import React from "react";
import VendorPastContractItem from "./PastContractItem";
const { List, Card } = require("antd");

class PastConstracts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Card
        title={<span className="h5 font-weight-bold">Closed Contracts</span>}
        style={{ boxShadow: "0 1px 6px rgba(57,73,76,.35)", marginBottom: "50px" }}
      >
        <div className="contract-list-content">
          <div>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 2,
              }}
              dataSource={this.props.contracts}
              footer={<div></div>}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = "/vendorjobdetails";
                  }}
                >
                  <VendorPastContractItem contract={item} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Card>
    );
  }
}

export default PastConstracts;
