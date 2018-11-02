import React, { Component } from "react";
import {
  ReactiveBase,
  ResultList,
  MultiList,
  RatingsFilter,
  SelectedFilters,
  MultiDataList
} from "@appbaseio/reactivesearch";

import "./App.css";

// Importing Images
import americanFood from "./Images/americanFood.jpg";
import barFood from "./Images/barFood.jpeg";
import breakfast from "./Images/breakfast.jpeg";
import desserts from "./Images/desserts.jpeg";
import sandwich from "./Images/sandwich.jpeg";

class App extends Component {
  onData(resturant) {
    const image =
      resturant.cuisine === "Bar Food"
        ? barFood
        : resturant.cuisine === "Desserts"
          ? desserts
          : resturant.cuisine === "Breakfast"
            ? breakfast
            : resturant.cuisine === "American"
              ? americanFood
              : sandwich;

    const stars = [];
    const {
      rating,
      postal_code,
      place_type,
      address,
      phone_number,
      cuisine
    } = resturant;
    for (let x = 0; x < rating; x++) {
      stars.push(
        <span key={x}>
          <i className="fa fa-star" />
        </span>
      );
    }

    const result = {
      image: image,
      title: resturant.name,
      description: (
        <div>
          <p>
            {address}, {postal_code}
          </p>
          <span className="tag">{place_type}</span>
          <span className="tag">{cuisine}</span>
          <div>Avg. Customer Reviews : {stars}</div>
          <div className="btn float-right">
            <a className="call-btn" href={`tel:${phone_number}`}>
              <i className="fa fa-phone" /> Call Now
            </a>
          </div>
        </div>
      )
    };
    return result;
  }

  render() {
    return (
      <div className="container-fluid">
        <ReactiveBase
          app="yelp"
          credentials="PNlPPw1xC:7de6b493-32e2-44e2-93be-221058f97090"
          type="place"
        >
          <div className="row">
            <div className="col-sm-3 scroll">
              <div className="box">
                <MultiList
                  dataField="place_type.raw"
                  title="Dine Options"
                  componentId="categoryReactor"
                  placeholder="Filter Dine"
                  showFilter={true}
                  filterLabel="Dine Options"
                  react={{
                    and: ["ratingsReactor", "cuisineReactor", "wifiReactor", "dogReactor", "musicReactor", "bookingReactor"]
                  }}
                />
              </div>

              <div className="box">
                <MultiList
                  dataField="cuisine.raw"
                  title="Cuisine Options"
                  componentId="cuisineReactor"
                  placeholder="Filter Cuisine"
                  showFilter={true}
                  filterLabel="Cuisine Options"
                  react={{
                    and: ["ratingsReactor", "categoryReactor", "wifiReactor", "dogReactor", "musicReactor", "bookingReactor"]
                  }}
                />
              </div>

              <div className="box">
                <RatingsFilter
                  componentId="ratingsReactor"
                  dataField="rating"
                  title="Avg. Customer Reviews"
                  data={[
                    { start: 4, end: 5, label: ">= 4 stars" },
                    { start: 3, end: 5, label: ">= 3 stars" },
                    { start: 2, end: 5, label: ">= 2 stars" },
                    { start: 1, end: 5, label: "> 1 stars" }
                  ]}
                  showFilter={true}
                  filterLabel="Avg. Customer Reviews"
                  react={{
                    and: [""]
                  }}
                />
              </div>

              <div className="box">
                <MultiDataList
                  dataField="wifi"
                  componentId="wifiReactor"
                  title="Refine By"
                  showSearch={false}
                  data={[
                    {
                      label: "Wifi",
                      value: true
                    }
                  ]}
                />

                <MultiDataList
                  dataField="dog_friendly"
                  componentId="dogReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Dog Friendly",
                      value: true
                    }
                  ]}
                />
                <MultiDataList
                  dataField="live_music"
                  componentId="musicReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Live Music",
                      value: true
                    }
                  ]}
                />
                <MultiDataList
                  dataField="online_bookings"
                  componentId="bookingReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Online Bookings",
                      value: true
                    }
                  ]}
                />
              </div>
            </div>
            <div className="col-sm-6 scroll">
              <SelectedFilters />
              <ResultList
                componentId="queryResult"
                dataField="name"
                from={0}
                size={15}
                onData={this.onData}
                pagination={true}
                react={{
                  and: [
                    "categoryReactor",
                    "ratingsReactor",
                    "cuisineReactor",
                    "wifiReactor",
                    "bookingReactor",
                    "musicReactor",
                    "dogReactor"
                  ]
                }}
              />
            </div>

            <div className="col-sm-3" style={{ backgroundColor: "white" }} />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
