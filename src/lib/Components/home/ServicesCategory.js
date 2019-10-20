import React from "react";

const categoryGroup = [
  [
    "Carpentry & Woodworking",
    "Appliances",
    "Concrete, Cement, & Asphalt",
    "Heating & Cooling",
    "Walls, Framing, & Stairs",
    "Additions & Remodels",
  ],
  [
    "Event Entertainment",
    "Music & Dance",
    "Photography",
    "Design & Decor",
    "Party Rentals",
    "Transportation",
  ],
  [
    "Event Entertainment",
    "Music & Dance",
    "Photography",
    "Design & Decor",
    "Party Rentals",
    "Transportation",
  ],
  [
    "Event Entertainment",
    "Music & Dance",
    "Photography",
    "Design & Decor",
    "Party Rentals",
    "Transportation",
  ],
];

const services = ["home", "events", "wedding", "wellness"];

class ServicesCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      categoryGroup: [],
    };
  }

  componentDidMount() {
    const catGroup = [];
    this.props.services.forEach((service) => {
      const categories = service.categories.map((cat) => cat.name);
      catGroup.push(categories.splice(0, 6));
    });
    this.setState({
      categoryGroup: catGroup,
    });
  }

  selectTab(index) {
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    const generateCategyGroup = () => {
      return this.state.categoryGroup.map((categories, index) => {
        return (
          <div
            key={index}
            className={`tab-content ${this.state.selectedTab === index ? "d-block" : "d-none"}`}
          >
            <div className="row">
              {generateCategories(categories)}
              <div className="col-12 d-flex justify-content-end">
                <a href={`/categories/${services[index]}`}>More categories</a>
              </div>
            </div>
          </div>
        );
      });
    };

    const generateCategories = (categories) => {
      return categories.map((cat, index) => {
        return (
          <div key={index} className="col-md-4 mb-2">
            <div className="content-item">
              <a href={`/findvendors?cat=${cat}`}>
                <p>{cat}</p>
              </a>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="service-category">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-5">
                Find The <span className="text-color">Right Services</span> For The Right Job
              </h1>
              <div className="tab-head">
                <div
                  className={`item ${this.state.selectedTab === 0 ? "active" : ""}`}
                  onClick={() => this.selectTab(0)}
                >
                  Home
                </div>
                <div
                  className={`item ${this.state.selectedTab === 1 ? "active" : ""}`}
                  onClick={() => this.selectTab(1)}
                >
                  Events
                </div>
                <div
                  className={`item ${this.state.selectedTab === 2 ? "active" : ""}`}
                  onClick={() => this.selectTab(2)}
                >
                  Weddings
                </div>
                <div
                  className={`item ${this.state.selectedTab === 3 ? "active" : ""}`}
                  onClick={() => this.selectTab(3)}
                >
                  Wellness
                </div>
              </div>
              {generateCategyGroup()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServicesCategory;
