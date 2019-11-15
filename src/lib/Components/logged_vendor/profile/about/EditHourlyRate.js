import React from "react";
import { connect } from "react-redux";
import { Rate, Form, InputNumber, message } from "antd";
import moment from "moment";
import { fetchUpdateData } from "../essential";

class EditHourlyRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  update = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.fetchUpdateData({
          hourlyRate: values.rate,
        });
      }
    });
  };

  componentWillReceiveProps(newProps) {
    if (!this.props.success && newProps.success) {
      this.props.toggle();
    }
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    return (
      <div className="edit-hourlyrate w-100 pb-5">
        <Form onSubmit={this.update}>
          <Form.Item label="Hourly Rate">
            {getFieldDecorator("rate", {
              initialValue: this.props.rate, //solution
              rules: [{ required: true, message: "Please input hourlyRate" }],
            })(
              <InputNumber
                placeholder="Hourly Rate"
                size={"large"}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                className="w-100"
              />,
            )}
          </Form.Item>
          <div className="controls w-100 d-flex justify-content-end">
            <button className={`button-primary ${this.props.pending ? "disable" : ""}`}>
              Update
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

const EditHourlyRateForm = Form.create({ name: "edit_hourly_rate_form" })(EditHourlyRate);

const mapStateToProps = ({ vendorProfileReducer }) => {
  const { error, user, success, pending } = vendorProfileReducer;
  return {
    error,
    success,
    user,
    pending,
  };
};

export default connect(mapStateToProps, {
  fetchUpdateData,
})(EditHourlyRateForm);
