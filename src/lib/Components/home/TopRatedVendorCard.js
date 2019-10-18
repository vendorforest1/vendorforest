import React from 'react'
import {Rate, Avatar} from 'antd'
import {constants} from '@Shared/constants'


class TopRatedVendorCard extends React.Component{
  render(){
    console.log("vendor -----------", this.props.vendor)
    return (
      <div className="toprate-card">
        <div className="text-center"><Avatar src={this.props.vendor.profileImage || constants.DEFAULT_PROFILEIMG} size={100}/></div>
        <h6 className=" font-weight-bold mt-3">{this.props.vendor.firstName && this.props.vendor.lastName ? `${this.props.vendor.firstName} ${this.props.vendor.lastName}` : this.props.vendor.username}</h6>
        <div className=" font-weight-light">{this.props.vendor.vendor.service ? `${this.props.vendor.vendor.service.name} / ${this.props.vendor.vendor.category.name}` : 'NONE'}</div>
        <div className=" font-weight-light">{this.props.vendor.bsLocation? `${this.props.vendor.bsLocation.city}/${this.props.vendor.bsLocation.country}` : 'NONE'}</div>
        <div className="mb-3">
          <Rate value={this.props.vendor.vendor.rate} allowHalf disabled/><span>{this.props.vendor.vendor.rate}</span>
        </div>
        <button type="button" name="button" onClick={()=>{
          window.location.href = "/findvendors?vendor='Gerard Kasemba'"
        }}>Hire Vendor</button>
      </div>      
    )
  }
}

export default TopRatedVendorCard


