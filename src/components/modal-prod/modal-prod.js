import React,{useContext} from 'react';

import ListContext from '../../list_context';

function ProductModal(props) {
  if(!props.modalState) {
    return null;
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={props.closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.data.name}</p>
          <button className="delete" onClick={props.closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">
            {props.children}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={props.closeModal}>Volver</button>
          <Addbutton pd={props.data}/>
        </footer>
      </div>
    </div>
  );
}
function Addbutton(props){

  const stt = useContext(ListContext);

  return(
          <button className="button" onClick={()=>stt.addNew(props.pd)}>
            Añadir
          </button>    
  )
}

export default ProductModal