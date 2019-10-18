import React from 'react'

class NewPostedJobs extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }
  
  render() {
    return (
      <div className="newposted-jobs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-5">Latest Posted Jobs <span className="text-color">Near You</span></h1>
              <div className="content">
                <div className="row">
                  <div className="col-lg-1 col-md-2 d-flex justify-content-center mb-2">
                    <div className="thumbnail">Thumbnail</div>
                  </div>
                  <div className="col-lg-8 col-md-7">
                    <p className="job-explain pl-md-4 pl-0">
                      Licensed real estate agent with a passion for teaching.<br/>
                      I need a: Photographer<br/>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus alias recusandae enim numquam,  <br/>
                      For : 08-25-2019 at 2:30 PM To 08-25-2019 at 4:45 PM / Lynn, MA, United States
                    </p>
                  </div>
                  <div className="col-md-3 d-flex align-items-end justify-content-md-end justify-content-center">
                    <div className="price-content text-right mt-3 d-flex d-md-block justify-content-center align-items-center">
                      <h6 className=" font-weight-bold mb-2 mr-5">$500</h6>
                      <button className="button-primary" onClick={()=>{
                        window.location.href="/login"
                      }}>Place A Bid</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-wrap posted_job">
          <h1>Latest Posted Jobs <span className="text-color">Near You</span></h1>
          <br />
          <div className="latest_job_dis">
          <ul>
            <li>
              <div className="job_av">
                avatar
              </div>
              <div className="job_det_01">
                <div className="job_sub_det_01">
                  <h4>Licensed real estate agent with a passion for teaching.</h4>
                  <h4>I need a: Photographer</h4>
                  <h4>For : 08-25-2019 at 2:30 PM To 08-25-2019 at 4:45 PM / Lynn, MA, United States</h4>
                </div>
                <div className="job_sub_det_02">
                  <div className="job_price">
                    <h4>$500</h4>
                  </div>
                  <button type="button" name="button" className="btn">Place A Bid</button>
                </div>
              </div>
            </li>
          </ul>
          </div>
        </div> */}
      </div>
    );
  }
}

export default NewPostedJobs;