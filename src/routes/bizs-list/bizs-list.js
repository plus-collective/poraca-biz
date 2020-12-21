import React, {Component} from 'react';

import DistrictSelector from '../../components/district-selector';
// import Card from '../../components/card'
import CardBiz from '../../components/card-biz'
import TagList from '../../components/tag-list';
import Constants from "../../utils/constants";

class BizsList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      bizsData: []
    }
  }

  componentDidMount(){
    fetch(Constants.APIURL_BIZSLIST)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            bizsData: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  // FILTROS DE LOS EMPRENDIMIENTOS
  filterBizs(bizsData){
    if(this.props.selectedDistrict ==="Todos" && this.props.selectedTag ==="Todos"){
      return bizsData;
    } else if(this.props.selectedDistrict ==="Todos"){
      // Filter by district
      return bizsData.filter(element => element.barrio === this.props.selectedDistrict);
    } else if(this.props.selectedTag ==="Todos"){
      // Filter by tag
      return bizsData.filter(element => element.barrio === this.props.selectedDistrict);
    }
  }

  filterByDistrict(bizsData){
    if(this.props.selectedDistrict === "AllDistricts"){
        return bizsData;
    } else {
      return bizsData.filter(element => element.barrio === this.props.selectedDistrict);
    }
  } 

  filterByTag(bizsData){
    if(this.props.selectedTag === "AllTags"){
        return bizsData;
    }else {
      return bizsData.filter(element => element.tag === this.props.selectedTag);
    }
  } 

  render(){

    let dataFiltered = this.filterByDistrict(this.state.bizsData);
    dataFiltered = this.filterByTag(dataFiltered);

    return (
      <div>
        <div className="hero is-primary pt-6">
          <div className="hero-body pb-4">
            <div className="container has-text-centered is-vcentered">
                <DistrictSelector
                  handleDistrictChange={this.props.handleDistrictChange}
                  districts={this.props.districts}
                  selectedDistrict= {this.props.selectedDistrict}
                ></DistrictSelector>
            </div>
          </div>
        </div>
        <TagList 
          handlerSelectTag={this.props.handlerSelectTag}
          tags={this.props.tags}
          ></TagList>

        <div>
          {
          dataFiltered.map(
              (element) => {
                  return ( 
                      <CardBiz
                          key = {element.pk}
                          data = {element}
                          handlerSelectBiz = {this.props.handlerSelectBiz}
                      ></CardBiz>
                  )
              })
          }   
        </div>
      </div>
    ) 
  }
}

export default BizsList;