import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../../routes/home';
import Biz from '../../routes/biz';
import BizsList from '../../routes/bizs-list';
import Constants from "../../utils/constants";

import './app.css';

class App extends Component {

  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handlerSelectDistrict = this.handlerSelectDistrict.bind(this);
    this.handlerSelectBiz= this.handlerSelectBiz.bind(this);
    this.handlerSelectTag= this.handlerSelectTag.bind(this);

    // Set some state
    this.state = {
      // EXTRAER LOS DISTRICT DE LA API O PONER TODO CABA ACA
      districts: Constants.DISTRICTS,
      tags: Constants.TAGS,
      selectedDistrict: "AllDistricts",
      selectedBiz: null,
      selectedTag: "AllTags"
      };
  }

  // This method will be sent to the child component
  handlerSelectDistrict(event) {
    this.setState({
        selectedDistrict: event.target.value
    });
  }
  handlerSelectBiz(biz) {
    this.setState({
      selectedBiz: biz
    });
  }
  handlerSelectTag(tagName) {
    this.setState({
        selectedTag: tagName
    });
  }

  render() {
    return (
          <Switch>
            <Route
                path="/home"
                render={props => (
                  <Home
                    districts = {this.state.districts}
                    handleDistrictChange ={this.handlerSelectDistrict}
                    selectedDistrict = {this.state.selectedDistrict}
                  />
                )}
              />
            <Route
                path="/bizslist"
                render={props => (
                  <BizsList
                    districts = {this.state.districts}
                    tags={this.state.tags}
                    selectedDistrict = {this.state.selectedDistrict}
                    selectedTag = {this.state.selectedTag}
                    handleDistrictChange ={this.handlerSelectDistrict}
                    handlerSelectBiz ={this.handlerSelectBiz}
                    handlerSelectTag ={this.handlerSelectTag}
                  />
                )}
              />
            <Route 
              path="/biz/:slug" 
              render={()=> <Biz 
                cart={this.state.cart}
                />
              } 
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route>{'404'}</Route>
          </Switch>
    );
  }
}

export default App;
