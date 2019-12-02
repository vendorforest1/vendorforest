import React from "react";
import { Input, Radio, Icon, List, Checkbox, Select } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";

import Header from "@Components/inc/header";
import Footer from "@Components/inc/footer";
import VendorItem from "./VendorItem";

import { connect } from "react-redux";
import { fetchInitData } from "./essential";

import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const Search = Input.Search;

const filterServicesList = ["Home", "Events", "Weddings", "Wellness", "Venue"];
const filterCategoryList = [
  "All Category",
  "Category1",
  "Category2",
  "Category3",
  "Category4",
  "Category5",
];
const filterSubcategoryList = [
  "All Subcategory",
  "Subcategory1",
  "Subcategory2",
  "Subcategory3",
  "Subcategory4",
];

class FindVendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendors: [],
      showFilter: true,
      filterCity: "",
      filterServices: [],
      filterCategory: 0,
      filterSubcategory: 0,
      filterTravel: 0,
      filterUserType: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.homedata) {
      return {
        vendors: props.homedata.vendors,
      };
    }
    return null;
  }
  render() {
    const generateFilterCategoryOptions = () => {
      return filterCategoryList.map((category, index) => {
        return (
          <Option key={index} value={String(index)}>
            {category}
          </Option>
        );
      });
    };

    const generateFilterSubcategoryOptions = () => {
      return filterSubcategoryList.map((subcategory, index) => {
        return (
          <Option key={index} value={String(index)}>
            {subcategory}
          </Option>
        );
      });
    };

    return (
      <div className="find-vendor">
        <Header />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-3 mb-4">
                <div
                  className="d-flex justify-content-between shadow bg-white d-block d-md-none mb-1 pointer text-color"
                  style={{ padding: "12px" }}
                  onClick={() => {
                    this.setState({
                      showFilter: !this.state.showFilter,
                    });
                  }}
                >
                  <div>Search Filter Setting</div>
                  <div>{this.state.showFilter ? <Icon type="up" /> : <Icon type="down" />}</div>
                </div>
                <div
                  className={`filter ${
                    this.state.showFilter ? "d-block" : "d-none d-md-block"
                  }`}
                >
                  <div className="city mb-4">
                    <Input
                      placeholder="Zip Code or City"
                      onChange={(e) => {
                        this.setState({
                          filterCity: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="service mb-4">
                    <h6 className="pb-3 border-bottom mb-2">Service Offers</h6>
                    <CheckboxGroup
                      options={filterServicesList}
                      value={this.state.filterServices}
                      onChange={(list) => {
                        this.setState({
                          filterServices: list,
                        });
                      }}
                    />
                  </div>
                  <div className="category mb-4">
                    <h6 className="pb-3 border-bottom mb-2">Category</h6>
                    <Select
                      value={String(this.state.filterCategory)}
                      className="mb-2"
                      onChange={(value) => {
                        this.setState({
                          filterCategory: Number(value),
                        });
                      }}
                    >
                      {generateFilterCategoryOptions()}
                    </Select>
                    <Select
                      value={String(this.state.filterSubcategory)}
                      className="mb-2"
                      onChange={(value) => {
                        this.setState({
                          filterSubcategory: Number(value),
                        });
                      }}
                    >
                      {generateFilterSubcategoryOptions()}
                    </Select>
                  </div>
                  <div className="budget-type mb-4">
                    <h6 className="pb-3 border-bottom mb-2">Travel Prefference</h6>
                    <Radio.Group
                      onChange={(e) => {
                        this.setState({
                          filterTravel: e.target.value,
                        });
                      }}
                      value={this.state.filterTravel}
                    >
                      <Radio value={0} className="d-block mb-2">
                        Can travel to customers
                      </Radio>
                      <Radio value={1} className="d-block mb-2">
                        Customers travel to me
                      </Radio>
                    </Radio.Group>
                  </div>
                  <div className="budget-type mb-4">
                    <h6 className="pb-3 border-bottom mb-2">User Type</h6>
                    <Radio.Group
                      onChange={(e) => {
                        this.setState({
                          filterUserType: e.target.value,
                        });
                      }}
                      value={this.state.filterUserType}
                    >
                      <Radio value={0} className="d-block mb-2">
                        Pro Vendor
                      </Radio>
                      <Radio value={1} className="d-block mb-2">
                        Vendor
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="search-bar">
                  <Search
                    placeholder="Find Vendor"
                    onSearch={(value) =>
                      process.env.NODE_ENV === "development" && console.log(value)
                    }
                    className="mb-4"
                    enterButton
                  />
                </div>
                <List
                  itemLayout="vertical"
                  size="large"
                  className="vendor-list"
                  pagination={{
                    onChange: (page) => {
                      process.env.NODE_ENV === "development" && console.log(page);
                    },
                    pageSize: 20,
                  }}
                  dataSource={this.state.vendors}
                  footer={<div></div>}
                  renderItem={(item, index) => (
                    <List.Item key={index} style={{ cursor: "pointer" }}>
                      <VendorItem user={item} />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ homeReducer, loginReducer }) => {
  const { error, homedata, success, pending } = homeReducer;

  const { user } = loginReducer;

  return { error, homedata, success, pending, user };
};

export default connect(mapStateToProps, {
  fetchInitData,
})(withStyles(globalStyle, localStyle)(FindVendors));
