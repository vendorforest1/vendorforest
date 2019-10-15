import React from "react";
import { Input, Form } from "antd";
import withStyles from "isomorphic-style-loader/withStyles";
import VF_Header from "@Components/inc/header";
import VF_Footer from "@Components/inc/footer";
import globalStyle from "@Sass/index.scss";
import localStyle from "./index.scss";

class ServiceCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
    };
  }

  render() {
    return (
      <div className="service-categories-section">
        <VF_Header />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="shadow serivce-content">
                  <h2 className="text-center mt-4 mb-5 font-weight-bold">Home Services</h2>
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                      <div className="categories mb-4">
                        <h5 className="mb-2 font-weight-bold">Additions & Remodels</h5>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                        <p className="text-grey mb-2">the name of the category goes here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VF_Footer />
      </div>
    );
  }
}

export default withStyles(globalStyle, localStyle)(ServiceCategories);
