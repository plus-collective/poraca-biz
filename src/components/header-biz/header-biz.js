import React from 'react';
import PropTypes from 'prop-types';



import './header-biz.css';

function HeaderBiz(props) {
    return (
    <div>
      <div className="hero is-primary">
        <div className="hero-body pb-4">
          <div className="container is-centered has-text-centered is-vcentered">
            <div className="wrapper-biz-img">
              <figure className="image is-square">
                <img className="is-rounded" src={props.bizLogo} alt={'Logo de ' + props.bizName}></img>
              </figure>
            </div>
            <h1 className="title is-4 is-centered py-4">{props.bizName}</h1>
          </div>
        </div>
      </div>
      <div className="has-text-centered px-5 pt-6 ">
        {props.bizDays && <h2 className="subtitle is-5"> {props.bizDays}</h2>}
        {props.bizSched && <h2 className="subtitle is-5"> {props.bizSched}</h2>}
        {props.bizSched && <hr className="line"></hr>}
      </div>

    </div>
    ) }

HeaderBiz.propTypes = {
  bizName: PropTypes.string,
  bizSched: PropTypes.string,
  bizLogo: PropTypes.string,
};

HeaderBiz.defaultProps = {
  bizName: "Plus Collective",
  bizSched: null,
  bizLogo: "http://api.xaca.delivery:8000/media/emprens/59498491/59498491.jpeg",
};

export default HeaderBiz;