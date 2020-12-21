import React,{Component, Fragment} from 'react';
import HeaderBiz from '../../components/header-biz';
import CardProd from '../../components/card-prod'
import FooterBiz from '../../components/footer-biz';
import Constants from "../../utils/constants";
import { withRouter } from "react-router";

class Biz extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      bizData: [],
      products:[],
    }
  }

  prepareDays(diasApi){
    var diasT = JSON.parse(diasApi);
    var diasFinal = []
    for (const [key, value] of Object.entries(diasT)) {
      if(value){
        diasFinal.push(key.substring(0,3))
      }
    }
    return diasFinal.toString();
  }

  prepareHours(horasApi){
    var horasT = JSON.parse(horasApi);
    var horasFinal = []
    for (const [key, value] of Object.entries(horasT)) {
      if(value){
        if(key === 'maniana'){
          horasFinal.push('mañana')
        }else {
          horasFinal.push(key);
        }
      }
    }
    return horasFinal.toString();
  }

  componentDidMount(){
    //INFO ENPRENDIMIENTO
    fetch(Constants.APIURL_BIZSDETAILS + this.props.match.params.slug )
    .then(res => res.json())
    .then(
      (result) => {
        result.dias = this.prepareDays(result.dias)
        result.horario = this.prepareHours(result.horario)
        this.setState({
          bizData: result
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
    // INFO PRODUCTOS
    fetch(Constants.APIURL_BIZSPRODUCTS_INIT + this.props.match.params.slug +'/productos')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          products: result
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

  render(){
    return (
      <Fragment>
          <HeaderBiz 
            bizName={this.state.bizData.name} 
            bizSched={this.state.bizData.horario}
            bizDays={this.state.bizData.dias}
            bizLogo={this.state.bizData.logo}
          ></HeaderBiz>
          <div className="container container-bizs">
            {
            this.state.products.map(
                (product) => {
                    return ( 
                        <CardProd
                            key = {product.pk}
                            data = {product}
                            toggleProductModal= {this.toggleProductModal}
                        ></CardProd>
                    )
                })
            }
            <FooterBiz
              bizPhone= {this.state.bizData.cont_whatsapp}></FooterBiz>
          </div>
      </Fragment>
    ) 
  }
}

export default  withRouter(Biz);