import React, { Component } from 'react';
import { 
          ReactiveBase,
          ResultList
} from '@appbaseio/reactivesearch';

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
            <span><a className="call-btn" href={`tel:${resturant.phone_number}`}><i className="fa fa-phone"></i> Call</a></span>
       </div>
      )
    };
    return result;
  }


  render() {
    return (

      <div class="container-fluid">
        <ReactiveBase
          app="yelp"
          credentials="PNlPPw1xC:7de6b493-32e2-44e2-93be-221058f97090"
          type="place">

           <div class="row">
            <div class="col-sm-2" style= {{ "backgroundColor" : "white" }}></div>
              <div className="col-sm-6">
                <ResultList
                  componentId="queryResult"
                  dataField="name"
                  from={0}
                  size={20}
                  onData={this.onData}
                  pagination={true}
                />
              </div>
            <div class="col-sm-4" style= {{ "backgroundColor" : "white" }}></div>
          </div>
      </ReactiveBase>
      </div>
    );
  }
}

export default App