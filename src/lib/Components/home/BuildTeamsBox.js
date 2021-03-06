import React from "react";
import { Icon, Button } from "antd";

class BuildTeamsBox extends React.Component {
  render() {
    return (
      <div className="build-team-box">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="mb-5">Build a team of vendors just like you online</h1>
              <Button
                type="primary"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuildTeamsBox;
