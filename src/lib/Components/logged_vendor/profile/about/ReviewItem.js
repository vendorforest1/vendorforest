import React from "react";
import { Rate} from "antd";
import moment from "moment";

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="review-item">
        <div className="w-100 d-flex justify-content-between">
          <div className="mr-2">
            <h6 className="text-color pointer mb-2">{this.props.review.contract.job.title}</h6>
            <p className="text-grey">
              <span className=" font-weight-bold">
                {
                  this.props.review.from.firstName && this.props.review.from.lastName ? 
                  `${this.props.review.from.firstName} ${this.props.review.from.lastName}` : this.props.review.from.username
                }
              </span>
              <span> on {moment(this.props.review.cratedAt).format("MMM DD, YYYY")}</span>
            </p>
            <p className="text-grey font-italic">{this.props.review.feedback}</p>
          </div>
          <div>
            <Rate value={this.props.review.rate} disabled allowHalf />
            <span className="text-grey">{this.props.review.rate}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewItem;
