import React from "react";
import { Select, Input } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const jobs = [
  "Retrieval of CDC survey data",
  "Moving designed Semplice site to domain",
  "Instantaneous consultation with profess",
];

class SendInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJob: 0,
      message: "",
    };
  }

  render() {
    const generateJobOptions = () => {
      return jobs.map((job, index) => {
        return (
          <Option value={String(index)} key={index}>
            {job}
          </Option>
        );
      });
    };

    return (
      <div className="send-invite">
        <h5 className="mb-4">Hire Gerard Kasemba for:</h5>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <Select
                value={String(this.state.selectedJob)}
                onChange={(value) => {
                  this.setState({
                    selectedJob: Number(value),
                  });
                }}
              >
                {generateJobOptions()}
              </Select>
            </div>
            <div className="message mb-4">
              <TextArea
                value={this.state.message}
                onChange={(e) => {
                  this.setState({
                    message: e.target.value,
                  });
                }}
                rows={5}
                placeholder="Message"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendInvite;
