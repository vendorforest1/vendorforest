// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { Select, Card, Form, Checkbox } from "antd";
import { fetchUpdateNotifYSettings } from "./essential";
const CheckboxGroup = Checkbox.Group;

const pushNotiContents = [
  "Clients send you messages.",
  "You’ve got upcoming projects or there are other updates about your projects.",
  "There are coupons, promotions, surveys, and project ideas you might like.",
  "We have updates about your account, projects, and security/privacy matters.",
];

const emailMeContents = [
  "Cost guides, project checklists, and tips from VendorForest Vendors & Pro Vendors",
  "Personalized suggestions for projects, pro vendors, vendors, and more",
  "Discounts, rewards, and promotions",
  "Quick surveys to get your ideas for improving VendorForest",
  "Incomplete request reminders, recurring project reminders, and more",
  "Feature updates and product announcements",
];

class VendorNotification extends React.Component {
  _notiType = 0;

  constructor(props) {
    super(props);

    this.state = {
      showNotification: 0,
      increaseMsg: 0,
      emailUnread: 0,
      emailUnreadTime: 0,
      offlineNoti: false,
      pushNoties: [],
      emailMe: [],
    };

    this.updateNotification = this.updateNotification.bind(this);
  }

  componentDidMount() {
    if (this.props.user.vendor && this.props.user.vendor) {
      this.setState({
        showNotification: this.props.user.vendor.notification.showNotification,
        increaseMsg: this.props.user.vendor.notification.increaseMsg,
        emailUnread: this.props.user.vendor.notification.emailUnread,
        emailUnreadTime: this.props.user.vendor.notification.emailUnreadTime,
        offlineNoti: this.props.user.vendor.notification.offlineNoti,
        pushNoties: this.props.user.vendor.notification.pushNoties,
        emailMe: this.props.user.vendor.notification.emailMe,
      });
    }
  }

  updateNotification(index) {
    this._notiType = index;
    this.props.fetchUpdateNotifYSettings({
      showNotification: this.state.showNotification,
      increaseMsg: this.state.increaseMsg,
      emailUnread: this.state.emailUnread,
      emailUnreadTime: this.state.emailUnreadTime,
      offlineNoti: this.state.offlineNoti,
      pushNoties: this.state.pushNoties,
      emailMe: this.state.emailMe,
    });
  }

  render() {
    return (
      <div className="vendor-notification">
        <Card
          title={<span className="h5 font-weight-bold">Messages</span>}
          style={{ marginBottom: "50px" }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Show notifications for:" required>
                <Select
                  value={String(this.state.showNotification)}
                  onChange={(value) => {
                    this.setState({
                      showNotification: Number(value),
                    });
                  }}
                  size={"large"}
                >
                  <Select.Option value="0">All Activity</Select.Option>
                  <Select.Option value="1">Important activity only</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <Form.Item label="Increment message counter for:" required>
                <Select
                  value={String(this.state.increaseMsg)}
                  onChange={(value) => {
                    this.setState({
                      increaseMsg: Number(value),
                    });
                  }}
                  size={"large"}
                >
                  <Select.Option value="0">All Activity</Select.Option>
                  <Select.Option value="1">Important activity only</Select.Option>
                  <Select.Option value="2">Nothing</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-8"></div>
            <div className="col-12">
              <button
                className={`button-primary ${
                  this.props.pending && this._notiType === 0 ? "disable" : ""
                }`}
                onClick={() => {
                  this.updateNotification(0);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Card>
        <Card
          title={<span className="h5 font-weight-bold">Email</span>}
          style={{ marginBottom: "50px" }}
        >
          <h6 className="mb-4">Sending email to (g***kase***@gmail.com)</h6>
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Send an email with unread activity for:" required>
                <Select
                  value={String(this.state.emailUnread)}
                  onChange={(value) => {
                    this.setState({
                      emailUnread: Number(value),
                    });
                  }}
                  size={"large"}
                >
                  <Select.Option value="0">All Activity</Select.Option>
                  <Select.Option value="1">Important activity only</Select.Option>
                  <Select.Option value="2">Nothing</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="" required style={{ marginTop: "47px" }}>
                <Select
                  value={String(this.state.emailUnreadTime)}
                  onChange={(value) => {
                    this.setState({
                      emailUnreadTime: Number(value),
                    });
                  }}
                  size={"large"}
                >
                  <Select.Option value="15">After every 15 min</Select.Option>
                  <Select.Option value="30">After every 30 min</Select.Option>
                  <Select.Option value="60">After every 60 min</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-12 mb-5">
              <Checkbox
                checked={this.state.offlineNoti}
                onChange={(e) => {
                  this.setState({
                    offlineNoti: e.target.checked,
                  });
                }}
              >
                Only send when offline or idle
              </Checkbox>
            </div>
            <div className="col-12">
              <button
                className={`button-primary ${
                  this.props.pending && this._notiType === 1 ? "disable" : ""
                }`}
                onClick={() => {
                  this.updateNotification(1);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Card>
        <Card
          title={<span className="h5 font-weight-bold">Other VendorForest Email Updates</span>}
          style={{ marginBottom: "50px" }}
        >
          <div className="getpushnoti w-100 mb-4">
            <h6 className="mb-3">Get push notifications when:</h6>
            <CheckboxGroup
              options={pushNotiContents}
              value={this.state.pushNoties.map((index) => pushNotiContents[index])}
              onChange={(list) => {
                this.setState({
                  pushNoties: list.map((item) => pushNotiContents.indexOf(item)),
                });
              }}
            />
          </div>
          <div className="getpushnoti w-100 mb-4">
            <h6 className="mb-3">Get push notifications when:</h6>
            <CheckboxGroup
              options={emailMeContents}
              value={this.state.emailMe.map((index) => emailMeContents[index])}
              onChange={(list) => {
                this.setState({
                  emailMe: list.map((item) => emailMeContents.indexOf(item)),
                });
              }}
            />
          </div>
          <div className="w-100">
            <button
              className={`button-primary ${
                this.props.pending && this._notiType === 2 ? "disable" : ""
              }`}
              onClick={() => {
                this.updateNotification(2);
              }}
            >
              Save
            </button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorSettingsReducer }) => {
  const { error, user, pending } = vendorSettingsReducer;
  return {
    error,
    user,
    pending,
  };
};

export default connect(mapStateToProps, {
  fetchUpdateNotifYSettings,
})(VendorNotification);
