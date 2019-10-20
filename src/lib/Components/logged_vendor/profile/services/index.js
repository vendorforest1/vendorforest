import React from "react";
import { Card, Icon, Modal, Button, Steps, Tag } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import style from "./index.scss";
import { connect } from "react-redux";

import { fetchServiceData, fetchUpdateData } from "../essential";
const Step = Steps.Step;

const icons = ["home", "bell", "usergroup-add", "money-collect", "dribbble-square"];

class VendorServices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
      currentStep: 0,
      selectedService: undefined,
      selectedCategory: undefined,
      selectedSubCategories: [],
      isEdit: false,
    };
    this.save = this.save.bind(this);
  }

  static async fetchInitialData(store) {
    return await store.dispatch(fetchServiceData());
  }

  // componentDidMount() {
  //   this.props.user.vendor &&
  //     this.setState({
  //       selectedService: this.props.user.vendor.service,
  //       selectedCategory: this.props.user.vendor.category,
  //       selectedSubCategories: this.props.user.vendor.subCategories,
  //     });
  //   this.props.fetchServiceData();
  // }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.pending !== state.pending) {
      console.log("**** ", props.pending, state.pending);
      return {
        pending: props.pending,
        selectedService: props.user.vendor.service,
        selectedCategory: props.user.vendor.category,
        selectedSubCategories: props.user.vendor.subCategories,
      };
    }
    return null;
  }

  componentWillReceiveProps(newProps) {
    if (
      JSON.stringify(newProps.user.vendor.subCategories) !==
      JSON.stringify(this.props.user.vendor.subCategories)
    ) {
      this.setState({
        isEdit: false,
      });
    }
  }

  save() {
    if (
      this.props.pending ||
      !this.state.selectedService ||
      !this.state.selectedCategory ||
      this.state.selectedSubCategories.length === 0
    ) {
      return;
    }
    const params = {
      service: this.state.selectedService,
      category: this.state.selectedCategory,
      subCategories: this.state.selectedSubCategories,
    };
    this.props.fetchUpdateData(params);
  }

  selectService(service) {
    this.setState({
      selectedService: service,
      selectedCategory: undefined,
      selectedSubCategories: [],
    });
  }

  selectCategory(category) {
    this.setState({
      selectedCategory: category,
      selectedSubCategories: [],
    });
  }

  selectSubCategory(subCategory) {
    const subCategories = [...this.state.selectedSubCategories];
    const index = subCategories.findIndex((sc) => sc === subCategory);
    if (index > -1) {
      subCategories.splice(index, 1);
    } else {
      subCategories.push(subCategory);
    }
    this.setState({
      selectedSubCategories: subCategories,
    });
  }

  getCategoryList() {
    for (let service of this.props.services) {
      if (this.state.selectedService === service._id) {
        return service.categories;
      }
    }
    return [];
  }

  getSubCategoryList() {
    for (let service of this.props.services) {
      if (this.state.selectedService === service._id) {
        for (let category of service.categories) {
          if (this.state.selectedCategory === category._id) {
            return category.subCategories;
          }
        }
      }
    }
    return [];
  }

  render() {
    const generateMyServices = () => {
      if (this.props.user.vendor.subCategories.length === 0) {
        return <h6 className="p-3 w-100 text-center text-danger">No Service</h6>;
      }
      return this.props.user.vendor.subCategories.map((subCategory, index) => {
        return (
          <Tag color="#07b107" className="mb-2 p-2 text-white" key={index}>
            {subCategory}
          </Tag>
        );
      });
    };

    const generateMyTempServices = () => {
      if (this.state.selectedSubCategories.length === 0) {
        return <h6 className="p-3 w-100 text-center text-danger">No Service</h6>;
      }
      return this.state.selectedSubCategories.map((subCategory, index) => {
        return (
          <Tag color="#07b107" className="mb-2 p-2 text-white" key={index}>
            {subCategory}
          </Tag>
        );
      });
    };

    const generateServiceList = () => {
      return this.props.services.map((service, index) => {
        return (
          <div key={index} className="col-md-2 col-sm-12 mb-2">
            <div
              className="shadow px-2 py-2 py-md-3 text-center text-grey service-type pointer"
              onClick={() => {
                this.selectService(service._id);
              }}
            >
              <span
                className={`inline-block ${
                  this.state.selectedService === service._id ? "text-color" : ""
                }`}
              >
                <Icon type={icons[index]} className="h3 mr-2" /> {service.name}
              </span>
            </div>
          </div>
        );
      });
    };

    const generateCategoryList = () => {
      return this.getCategoryList().map((category, index) => {
        return (
          <Tag
            color={this.state.selectedCategory === category._id ? "#07b107" : "#eee"}
            className={`mb-2 p-2 ${
              this.state.selectedCategory === category._id ? "text-white" : "text-dark"
            }`}
            key={index}
            onClick={() => {
              this.selectCategory(category._id);
            }}
          >
            {category.name}
          </Tag>
        );
      });
    };

    const generateSubCategoryList = () => {
      return this.getSubCategoryList().map((subCategory, index) => {
        return (
          <Tag
            color={this.state.selectedSubCategories.indexOf(subCategory) > -1 ? "#07b107" : "#eee"}
            className={`mb-2 p-2 ${
              this.state.selectedSubCategories.indexOf(subCategory) > -1
                ? "text-white"
                : "text-dark"
            }`}
            key={index}
            onClick={() => {
              this.selectSubCategory(subCategory);
            }}
          >
            {subCategory}
          </Tag>
        );
      });
    };

    return (
      <div className="vendor-services">
        <Card
          title={<span className="h5 font-weight-bold">Service</span>}
          className="shadow"
          style={{ marginBottom: "50px" }}
          extra={
            !this.state.isEdit && (
              <div
                onClick={() => {
                  this.setState({
                    isEdit: !this.state.isEdit,
                  });
                }}
                className="text-color editable h5"
                style={{
                  cursor: "pointer",
                  height: "35px",
                  width: "35px",
                  borderRadius: "100%",
                  paddingTop: "5px",
                  paddingLeft: "7px",
                }}
              >
                <Icon type="edit" />
              </div>
            )
          }
        >
          {!this.props.services && this.props.pending && (
            <div className="w-100 p-5 text-center loading-small">
              <Icon type="sync" spin />
            </div>
          )}
          {this.props.services && (
            <div className="row">
              {!this.state.isEdit && (
                <div className="col-md-12 mb-5">
                  <h6 className="mb-4 font-weight-bold">My Services</h6>
                  {generateMyServices()}
                </div>
              )}
              {this.state.isEdit && (
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12 mb-5">
                      <h6 className="mb-4 font-weight-bold">My Services</h6>
                      {generateMyTempServices()}
                    </div>
                    <div className="col-md-12 mb-5">
                      <h6 className="mb-4 font-weight-bold">Services</h6>
                      <div className="row justify-content-center">{generateServiceList()}</div>
                    </div>
                    <div className="col-md-12 mb-5">
                      <h6 className="mb-4 font-weight-bold">Categories</h6>
                      {generateCategoryList()}
                    </div>
                    <div className="col-md-12 mb-5">
                      <h6 className="mb-4 font-weight-bold">Subcategories</h6>
                      {generateSubCategoryList()}
                    </div>
                    <div className="col-12 controls d-flex justify-content-end">
                      <button
                        className="button-white mr-2"
                        onClick={() => {
                          this.setState({
                            isEdit: false,
                            selectedService: this.props.user.vendor.service,
                            selectedCategory: this.props.user.vendor.category,
                            selectedSubCategories: this.props.user.vendor.subCategories,
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className={`button-primary ${
                          this.props.pending ||
                          !this.state.selectedService ||
                          !this.state.selectedCategory ||
                          this.state.selectedSubCategories.length === 0
                            ? "disable"
                            : ""
                        }`}
                        onClick={this.save}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ vendorProfileReducer }) => {
  const { error, user, services, pending } = vendorProfileReducer;
  return {
    error,
    user,
    services,
    pending,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchServiceData,
    fetchUpdateData,
  },
)(withStyles(style)(VendorServices));
