import React,{useContext }from 'react';
import Constants from "../../utils/constants";
import ListContext from '../../list_context';

function ConfirmModal(props) {

  var { cart,cartPrice }  = useContext(ListContext);

  if(!props.modalState) {
    return null;
  }

  function prepareWppMsg(){
    
    // %0a son los caracteres para hacer un salto de linea en whatsapp
    var pdsTextForWpp = '';
    cart.map((i,index) => {
      return (
        pdsTextForWpp = pdsTextForWpp + i.name + ' x ' + i.count + '%0a'
      )
    })

    var wppMsg = Constants.WPP_MSG_TITLE + 
    Constants.WPP_MSG_MONOSPACE_CH + 
    pdsTextForWpp + 
    Constants.WPP_MSG_MONOSPACE_CH + 
    Constants.WPP_MSG_TOTAL+ 
    cartPrice + 
    Constants.WPP_MSG_TOTAL_END + 
    Constants.WPP_MSG_DISCLAIMER;
    
    console.log(wppMsg)
    return wppMsg;
  }

  function sendWppMsg(){
    console.log(Constants.WPP_API_URL + Constants.WPP_API_COUNTRY_CODE + 1133873000 + Constants.WPP_API_TEXT + prepareWppMsg())
    // REDIRECCIONO A WHATSAPP WEB, HABRIA QUE RECHEQUEAR QUE EL NUMERO ESTE BIEN AL MOMENTO DE CARGARLO
    // window.location.href = Constants.WPP_API_URL + Constants.WPP_API_COUNTRY_CODE + props.bizPhone + Constants.WPP_API_TEXT + prepareWppMsg();
    window.location.href = Constants.WPP_API_URL + Constants.WPP_API_COUNTRY_CODE + 1133873000 + Constants.WPP_API_TEXT + prepareWppMsg();
    
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={props.closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button className="delete" onClick={props.closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">
            {props.children}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={props.closeModal}>Volver</button>
          <button className="button" onClick={()=>sendWppMsg()}>
            Pedir
          </button>
        </footer>
      </div>
    </div>
  );
}



export default ConfirmModal