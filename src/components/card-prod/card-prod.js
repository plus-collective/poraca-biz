import React,{Component,useContext} from 'react';

import CardImage from '../utils/card-image'
import ProducModal from '../modal-prod'
import ListContext from '../../list_context';

import './card-prod.css';

class CardProd extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            modalState: false
        }
        this.toggleProductModal = this.toggleProductModal.bind(this);
    }

    toggleProductModal() {    
        this.setState((prev) => {
        const newState = !prev.modalState;
        
        return { modalState: newState };
        });
    }

    render(){
        return (
            <React.Fragment>
                <div className="card is-horizontal is-third m-2">
                    <CardImage
                        name= {this.props.data.name}
                        imagen= {this.props.data.imagen}
                        styleImg= ""
                    ></CardImage>
                    <div className="card-content p-4">
                        <div className="media mb-2">
                            <div className="media-content">
                                <p className="title is-size-6 mb-1">{this.props.data.name}</p>
                            </div>
                        </div>
                        <div className="content">
                            <div className="card-aditional-content"> 
                                <div className="button">{this.props.data.precio}</div>
                                <button className="button" onClick={this.toggleProductModal}>Ver más</button>
                                <Addbutton pd={this.props.data}/>
                                {/* <Removebutton pd={this.props.data}/> */}
                            </div>
                        </div>
                    </div>
                </div>
                
                <ProducModal 
                    closeModal={this.toggleProductModal} 
                    modalState={this.state.modalState} 
                    data={this.props.data}
                >
                    <figure className="image is-16by9 wrpImgModalProd">
                        <img src={this.props.data.imagen} alt={"Logo de "+ this.props.data.name} ></img>
                    </figure>
                    <p className="title is-size-6 mb-1">{this.props.data.descripcion}</p>
                    <br></br>
                    <p className="subtitle is-7">
                        Los opcionales y gustos podes pedirlos directamente por el chat
                    </p>
                </ProducModal>
           </React.Fragment>
          );       
    }
}

function Addbutton(props){

    const stt = useContext(ListContext);

    return(
            <button className="button" onClick={()=>stt.addNew(props.pd)}>
              +
            </button>    
    )
}

function Removebutton(props){
    const state = useContext(ListContext);
    return(
            <button className="button" onClick={()=>state.removePd(state.cart.indexOf(props.pd))}>
                -
            </button>
    )
}

export default CardProd;