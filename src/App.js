import React, { Component } from 'react';
import { 
          ReactiveBase,
          ResultList,
          MultiList,
          RatingsFilter
} from '@appbaseio/reactivesearch';

import './App.css'


// Importing Images
import americanFood from './Images/americanFood.jpg'
import barFood from './Images/barFood.jpeg'
import breakfast from './Images/breakfast.jpeg'
import desserts from './Images/desserts.jpeg'
import sandwich from './Images/sandwich.jpeg'

class App extends Component {

  onData(resturant) {
    const image = resturant.cuisine === "Bar Food" ?
      barFood  :
      resturant.cuisine === "Desserts" ?
      desserts :
      resturant.cuisine === "Breakfast" ?
      breakfast : 
      resturant.cuisine === "American" ?
      americanFood :
      sandwich ;

    const result = {
      image: image,
      title: resturant.name,
      description: (
        <div>
            <p>{resturant.address}, {resturant.postal_code}</p>
            <span className="tag">{resturant.place_type}</span>
            <span className="tag">{resturant.cuisine}</span>
            <span className = "btn btn-light"><a className="call-btn" href={`tel:${resturant.phone_number}`}><i className="fa fa-phone"></i> Call Now</a></span>
            <span>{resturant.rating}</span>
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
          type="place">

           <div className="row">
              <div className="col-sm-3 scroll" >
                <div className="">
                  <MultiList
                    dataField="place_type.raw"
                    title="Dine Options"
                    componentId="categoryReactor"
                    react={{
                      and: ["ratingsReactor", "cuisineReactor"]
                    }}
                  />
                 </div>

                 <div>
                    <MultiList
                    dataField="cuisine.raw"
                    title="Cuisine Options"
                    componentId="cuisineReactor"
                    react={{
                      and: ["ratingsReactor", "categoryReactor"]
                    }}
                  />
                 </div>

                 <div className="">
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
                      defaultSelected={{start: 2, end: 5}}
                      react={{
                        and: [""]
                      }}
                    />
                 </div>



              </div>
              <div className="col-sm-5">
                <ResultList
                  componentId="queryResult"
                  dataField="name"
                  from={0}
                  size={20}
                  onData={this.onData}
                  pagination={true}
                  react={{and: ["categoryReactor", "ratingsReactor"]}}
                />
              </div>
            
            <div className="col-sm-4" style= {{ "backgroundColor" : "white" }}>

            </div>
          
          </div>
      </ReactiveBase>
      </div>
    );
  }
}

export default App