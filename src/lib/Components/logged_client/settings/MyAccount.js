// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { Input, Form, Upload, Icon, message, Card, Button, Select } from "antd";
import { fetchUpdateAccount, fetchSendCodeEmail } from "./essential";
import { constants } from "@Shared/constants";
import { timeZone } from "@Shared/timezone.json";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";

class ClientMyAccount extends React.Component {
  _btnIndex = 0;

  constructor(props) {
    super(props);

    this.state = {
      photoUrl: undefined,
      search: "",
      country: "",
      state: "",
      city: "",
      fullAddress: "",
      timeZone: timeZone[0],
      lat: undefined,
      lng: undefined,
      placeId: undefined,
      loading: false,
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.sendVeryfyCode = this.sendVerifyCode.bind(this);
  }

  componentDidMount() {
    this.setState({
      country: (this.props.user.bsLocation || {}).country || "",
      city: (this.props.user.bsLocation || {}).city || "",
      state: (this.props.user.bsLocation || {}).state || "",
      fullAddress: (this.props.user.bsLocation || {}).fullAddress || "",
      lat: (this.props.user.bsLocation || {}).lat,
      lng: (this.props.user.bsLocation || {}).lng,
      placeId: (this.props.user.bsLocation || {}).placeId,
    });
  }

  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJPG && isLt2M;
  }

  changePhoto = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.setState({
        photoUrl: info.file.response.url,
        loading: false,
      });
    }
  };

  saveAccount = async (e) => {
    e.preventDefault();
    this._btnIndex = 0;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && !this.props.pending) {
        values.profileImage = this.state.photoUrl;
        if (!this.state.lat) {
          message.error("Invalid full address");
          return;
        }
        const params = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          verifyCode: values.verifyCode,
          profileImage: values.profileImage,
          bsLocation: {
            country: values.country,
            state: values.state,
            city: values.city,
            fullAddress: values.fullAddress,
            lat: this.state.lat,
            lng: this.state.lng,
            placeId: this.state.placeId,
          },
          timeZone: values.timeZone,
        };
        console.log(params);
        this.props.fetchUpdateAccount(params);
      }
    });
  };

  sendVerifyCode() {
    this._btnIndex = 1;
    this.props.form.validateFields(["email"], (error, values) => {
      if (!error && !this.props.pending) {
        console.log(values);
        this.props.fetchSendCodeEmail(values);
      }
    });
  }

  handleInputChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    this.props.form.setFieldsValue({
      fullAddress: geocodedPrediction.formatted_address,
    });
    this.setState({
      search: "",
      lat: geocodedPrediction.geometry.location.lat(),
      lng: geocodedPrediction.geometry.location.lng(),
      placeId: geocodedPrediction.place_id,
    });
  };

  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  handleStatusUpdate = (status) => {
    console.log("handleStatusUpdate", status);
  };

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    const photoUrl = this.state.photoUrl;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const generateTimeZoneOptions = () => {
      return timeZone.map((timeZone, index) => {
        return (
          <Select.Option value={timeZone} key={index}>
            {timeZone}
          </Select.Option>
        );
      });
    };

    return (
      <div className="client-myaccount">
        <Card
          title="My Account"
          style={{ boxShadow: "0 1px 6px rgba(57,73,76,.35)", marginBottom: "50px" }}
        >
          <Form layout="vertical">
            <div className="row">
              <div className="col-12 text-center mb-3">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.changePhoto}
                  initialValue={this.props.user.profileImage}
                >
                  {photoUrl || this.props.user.profileImage ? (
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={photoUrl ? photoUrl : this.props.user.profileImage}
                      alt="avatar"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div className="col-md-4 col-sm-12">
                <Form.Item label="First Name">
                  {getFieldDecorator("firstName", {
                    initialValue: this.props.user.firstName, //solution
                    rules: [
                      { required: true, message: "Please input First Name", whitespace: true },
                    ],
                  })(<Input placeholder="First Name" size={"large"} />)}
                </Form.Item>
              </div>
              <div className="col-md-4 col-sm-12">
                <Form.Item label="Last Name">
                  {getFieldDecorator("lastName", {
                    initialValue: this.props.user.lastName, //solution
                    rules: [{ required: true, message: "Please input Last Name" }],
                  })(<Input placeholder="Last Name" size={"large"} />)}
                </Form.Item>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item label="Email Address">
                      {getFieldDecorator("email", {
                        initialValue: this.props.user.email, //solution
                        rules: [{ required: true, message: "Please input Email Address" }],
                      })(<Input placeholder="Email Address" size={"large"} />)}
                    </Form.Item>
                  </div>
                  {this.props.form.getFieldsValue(["email"]).email !== this.props.user.email && (
                    <div className="col-md-2 mt-md-1 mt-0">
                      <Button
                        className={`w-100 mt-md-4 mt-0 mb-3`}
                        disabled={this._btnIndex === 1 && this.props.pending}
                        size={"large"}
                        onClick={this.sendVeryfyCode}
                      >
                        Verify
                      </Button>
                    </div>
                  )}
                  {this.props.form.getFieldsValue(["email"]).email !== this.props.user.email && (
                    <div className="col-md-4">
                      <Form.Item label="Verify Code">
                        {getFieldDecorator("verifyCode", {
                          initialValue: this.state.verifyCode, //solution
                          rules: [{ required: true, message: "Please input Verify Code" }],
                        })(<Input placeholder="Verify Code" size={"large"} />)}
                      </Form.Item>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <Form.Item label="Country">
                  {getFieldDecorator("country", {
                    initialValue: this.state.country, //solution
                    rules: [{ required: true, message: "Please input country" }],
                  })(<Input placeholder="Country" size={"large"} />)}
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="State">
                  {getFieldDecorator("state", {
                    initialValue: this.state.state, //solution
                    rules: [{ required: true, message: "Please input state" }],
                  })(<Input placeholder="State" size={"large"} />)}
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="City">
                  {getFieldDecorator("city", {
                    initialValue: this.state.city, //solution
                    rules: [{ required: true, message: "Please input city" }],
                  })(<Input placeholder="City" size={"large"} />)}
                </Form.Item>
              </div>
              <div className="col-md-6">
                <GoogleMapLoader
                  params={{
                    key: constants.GOOGLEMAP_API,
                    libraries: "places, geocode",
                  }}
                  render={(googleMaps) =>
                    googleMaps && (
                      <GooglePlacesSuggest
                        googleMaps={googleMaps}
                        autocompletionRequest={{
                          input: this.state.search,
                          // Optional options
                          // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                        }}
                        // Optional props
                        onNoResult={this.handleNoResult}
                        onSelectSuggest={this.handleSelectSuggest}
                        onStatusUpdate={this.handleStatusUpdate}
                        textNoResults="No Result" // null or "" if you want to disable the no results item
                        customRender={(prediction) => (
                          <div className="px-2 py-1">
                            {prediction ? prediction.description : "No Result"}
                          </div>
                        )}
                      >
                        <Form.Item label="Full Address">
                          {getFieldDecorator("fullAddress", {
                            initialValue: this.state.fullAddress, //solution
                            rules: [{ required: true, message: "Please input full address" }],
                          })(
                            <Input
                              placeholder="Full Address"
                              size={"large"}
                              onChange={this.handleInputChange}
                            />,
                          )}
                        </Form.Item>
                      </GooglePlacesSuggest>
                    )
                  }
                />
              </div>
              <div className="col-md-6">
                <Form.Item label="Time Zone">
                  {getFieldDecorator("timeZone", {
                    initialValue: this.props.user.timeZone,
                    rules: [{ required: true, message: "Please select timezone." }],
                  })(
                    <Select
                      showSearch
                      placeholder="Select timezone"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      size={"large"}
                    >
                      {generateTimeZoneOptions()}
                    </Select>,
                  )}
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="row">
            <div className="col-12">
              <button
                className={`button-primary ${
                  this.props.pending && this._btnIndex === 0 ? "disable" : ""
                }`}
                onClick={this.saveAccount}
              >
                Save
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ clientSettingsReducer }) => {
  const { error, user, pending } = clientSettingsReducer;
  return {
    error,
    user,
    pending,
  };
};

const ClientMyAccountForm = Form.create({ name: "client_setting_myaccount" })(ClientMyAccount);

export default connect(
  mapStateToProps,
  {
    fetchUpdateAccount,
    fetchSendCodeEmail,
  },
)(ClientMyAccountForm);
