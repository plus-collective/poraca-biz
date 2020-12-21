import React from 'react';
import { Link } from 'react-router-dom';
import CardImage from '../utils/card-image'

function CardBiz(props){

    return (
        <Link to={ "/biz/" + props.data.slug} onClick={() => props.handlerSelectBiz(props.data.slug)}>
            <div className="card is-horizontal is-third m-2">
                <CardImage
                    name= {props.data.name}
                    imagen= {props.data.logo}
                    styleImg= "card-img-biz"
                ></CardImage>
                {/* PASAR DATA Y OPT */}
                <CardContentBiz
                    name= {props.data.name}
                    barrio = {props.data.barrio}
                    descripcion = {props.data.descripcion}
                    cont_insta = {props.data.cont_insta}
                ></CardContentBiz>
            </div>
        </Link>
      );
}

function CardContentBiz(props){
    return (
        <div className="card-content p-4">
            <div className="media mb-2">
                <div className="media-content">
                    <p className="title is-size-6 mb-1">{props.name}</p>
                </div>
            </div>
            <div className="content">
                <p className="subtitle is-7">
                    {props.descripcion}
                </p>
                <div className="card-aditional-content"> 
                    <p className="has-text-weight-bold pr-1 m-0">{props.cont_insta}</p>
                </div>
            </div>
        </div>
      );
}

export default CardBiz;