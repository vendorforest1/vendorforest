// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import { Card, Modal, Icon } from "antd";
import AddPortfolio from "./AddPortfolio";
import style from "./index.scss";
import { fetchPortfoliosData } from "../essential";
const { Meta } = Card;

class VendorPortfolios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModal: false,
      selectedPortfolio: undefined,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchPortfoliosData();
  }

  toggle() {
    this.setState({
      isModal: !this.state.isModal,
    });
  }

  selectPortfolio(index) {
    let portfolios =
      this.props.portfolios && this.props.user && this.props.user.accountType === 1
        ? this.props.portfolios
        : this.props.selectedVendor.portfolios;
    this.setState({
      selectedPortfolio: portfolios[index],
    });
    this.toggle();
  }

  render() {
    let portfolios =
      this.props.user && this.props.portfolios && this.props.user.accountType === 1
        ? this.props.portfolios
        : this.props.selectedVendor && this.props.selectedVendor.portfolios;
    const isPublic = this.props.user ? false : true;

    const generateCards = () => {
      if (portfolios.length === 0) {
        return <h6 className="text-danger p-5 text-center w-100">No Portfolio</h6>;
      }
      return (
        portfolios &&
        portfolios.map((portfolio, index) => {
          return (
            <div className="col-md-4 portfolio-card" key={index}>
              <Card
                hoverable
                onClick={() => {
                  this.selectPortfolio(index);
                }}
                style={{ width: "100%", marginBottom: "24px" }}
                cover={
                  portfolio.coverImage &&
                  portfolio.coverImage.url && (
                    <img
                      alt="cover"
                      src={portfolio.coverImage.url}
                      style={{
                        width: "auto",
                        margin: "0 auto",
                      }}
                    />
                  )
                }
              >
                <Meta description={portfolio.caption ? portfolio.caption : ""} />
              </Card>
            </div>
          );
        })
      );
    };

    return (
      <div className="vendor-portfolio">
        <Card
          title={<span className="h5 font-weight-bold">Portfolio</span>}
          className="shadow"
          style={{ marginBottom: "50px" }}
          extra={
            !isPublic && (
              <div
                onClick={() => {
                  this.setState({
                    selectedPortfolio: undefined,
                  });
                  this.toggle();
                }}
                className="text-color"
                style={{ cursor: "pointer" }}
              >
                <Icon type="plus" />
              </div>
            )
          }
        >
          {!portfolios && this.props.pending && (
            <div className="w-100 p-5 text-center loading-small">
              <Icon type="sync" spin />
            </div>
          )}
          {portfolios && <div className="row">{generateCards()}</div>}
        </Card>
        {!isPublic && (
          <Modal
            title="Add Portfolio"
            visible={this.state.isModal}
            onOk={this.toggle}
            onCancel={this.toggle}
            width={"800px"}
            footer={[null, null]}
          >
            <AddPortfolio toggle={this.toggle} portfolio={this.state.selectedPortfolio} />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ vendorProfileReducer }) => {
  const { error, portfolios, user, pending } = vendorProfileReducer;
  return {
    error,
    portfolios,
    pending,
    user,
  };
};

export default connect(mapStateToProps, {
  fetchPortfoliosData,
})(withStyles(style)(VendorPortfolios));
