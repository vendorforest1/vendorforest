import React from "react";
import { Rate} from "antd";
import { constants } from "@Shared/constants";
import moment from "moment";
class ReviewItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: false,
        };
    }

    componentDidMount() {
        
    }
    
    render() {

        return (
            <div className="feedback">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-color">{this.props.review.contract.job.title}</h6>
                    <p>${this.props.review.contract.paidPrice}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Rate disabled value={this.props.review.rate} allowHalf={true} className="like-rate"/>
                        <span className="mr-2">{this.props.review.rate}</span>
                        <small>{moment(this.props.review.createdAt).format('MMM DD, YYYY')}</small>
                    </div>
                    <p>{this.props.review.contract.job.budgetType === constants.BUDGET_TYPE.FIXED ? 'Fixed price' : `$${this.props.review.contract.budget}/hr`}</p>
                </div>
                <p className=" font-italic">{this.props.review.feedback}</p>
            </div>
        )
    }
}

export default ReviewItem