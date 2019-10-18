import React from 'react'
import {Icon} from 'antd'
import $ from 'jquery';
import TopRatedVendorCard from './TopRatedVendorCard';

class TopRatedVendors extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
       visible: false,
       vendorGroup: []
    }
  }

  componentDidMount(){
    // $(document).ready(()=>{
    //   $('#toprated-carousel').carousel({
    //     interval: 5000
    //   });
    // })
    let vendorGroup = []
    for(let i = 0; i < this.props.vendors.length; i+=3){
      vendorGroup.push(this.props.vendors.slice(i, 3))
    }
    this.setState({
      vendorGroup: vendorGroup
    })
  }

  render() {

    const generateVendors = () => {
      return this.state.vendorGroup.map((group, index) => {
        return <div key={index} className={`carousel-item px-2 active ${index === 0 ? 'active' : ''}`}>
          <div className="row">
            {generateCard(group)}
          </div>
        </div>
      })
    }

    const generateCard = (group) => {
      return group.map((vendor, index) => {
        return <div key={index} className="col-md-4">
          <TopRatedVendorCard vendor={vendor}/>
        </div>
      })
    }

    const generateSlide = () => {
      return this.state.vendorGroup.map((group, index) => {
        return <li key={index} data-target="#toprated-carousel" data-slide-to={`${index}`} className={`${index === 0 ? 'active' : ''}`}></li>
      })
    }

    return (
      <div className="container toprate-vendor">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-5">Top Rated Vendors</h1>
            <div className="carousel slide position-relative" data-ride="carousel">
              <ul className="carousel-indicators">
                  {generateSlide()}
              </ul>
              <div id="toprated-carousel" className="carousel-inner">
                {generateVendors()}
              </div>
              <div className="prev" onClick={()=>{
                // $('.carousel').carousel('next');
              }} data-slide="prev">
                <Icon type="left" className="text-color h3"/>
              </div>
              <div className="next" onClick={()=>{
                // $('.carousel').carousel('prev');
              }} data-slide="next">
                <Icon type="right" className="text-color h3"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopRatedVendors;