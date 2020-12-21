import React,{ Component,useContext } from 'react';

import ConfirmModal from '../modal-confirm'
import ListContext from '../../list_context';

import './footer-biz.css';


class FooterBiz extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalState: false
        }
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
    }

    toggleConfirmModal() {    
        this.setState((prev, props) => {
        const newState = !prev.modalState;
        
        return { modalState: newState };
        });
    }

    render(){

        return (
            <ListContext>
                {(props) => {
                    const cartlist = props.cart.map((i,index) => {
                        return (
                        <div className="cart-item" key={i.id}>
                            <div className="item-title">
                                {i.name} 
                            </div>
                            <div className="item-count">
                                {' x'+i.count}
                            </div>
                            <div>
                                <Removebutton  pd={i}/>
                            </div>
                        </div>
                        
                        )
                    })
                    return (
                        <React.Fragment>
                            <footer className="footer fix-footer">
                            <div className="columns is-mobile p-3 is-vcentered">
                                <div className="column is-6">
                                    <TagsFooter></TagsFooter>
                                </div>
                                <div className="column">
                                    <button className="button" onClick={this.toggleConfirmModal}>VER CARRITO</button>
                                    {/* <Button text="CONFIRMAR" action={this.toggleProductModal}></Button> */}
                                </div>
                            </div>
                            <div className="has-text-centered">
                                <button className="button" onClick={()=>window.history.back()}>VOLVER</button>
                            </div>
                            </footer>
                            <ConfirmModal
                                closeModal={this.toggleConfirmModal} 
                                modalState={this.state.modalState} 
                                title='Tu Pedido'
                                bizPhone = {this.props.bizPhone}
                                >
                                <div className="container px-5 ">
                                    <div className="columns is-mobile px-5 is-size-5">
                                        
                                    </div>
                                    {cartlist}
                                    <hr className="line"></hr>
                                    <div className="columns is-mobile px-5 is-size-5">
                                        <div className="column is-8 ">
                                            <ul >
                                                <li>TOTAL:</li>
                                            </ul>
                                        </div>
                                        <div className="column is-4">
                                            <ul>
                                                <li>{props.cartPrice}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </ConfirmModal>
                        </React.Fragment>
                    )
                }}
            </ListContext>
            
        );
    }
}


function TagsFooter(props){

    var { cartCount, cartPrice } = useContext(ListContext);

    return (
        <div>
            <div className="tags has-addons tags-initial">
                <span className="tag is-danger is-light has-text-weight-bold">Items</span>
                <span className="tag">{cartCount}</span>
                <span className="tag is-danger is-light has-text-weight-bold">$</span>
                <span className="tag">{cartPrice}</span>
            </div>
        </div>
  );
}

function Removebutton(props){
    const state = useContext(ListContext);
    return(
            <button className="button" onClick={()=>state.removePd(state.cart.indexOf(props.pd))}>
                -
            </button>
    )
}

export default FooterBiz;