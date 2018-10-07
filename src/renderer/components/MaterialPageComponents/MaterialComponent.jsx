import React from 'react';
import PropTypes from 'prop-types';

const imgstyle = {
  float: 'left',
  lineHeight: 0,
};

const formstyle = {
  width: '50px',
  height: '15px',
};

const MaterialComponets = props =>
(
  <div style={imgstyle} id={props.id}>
    <img
      src={`./icon/i/icon/item_${props.id}.jpg`}
      width="50px"
      height="50px"
      alt="test"
    />
    <br />
    <input
      type="number"
      style={formstyle}
      id={props.id}
      value={props.materialcount}
      onChange={e => props.inputMaterial(e.target.id, e.target.value)}
    />
  </div>
);

MaterialComponets.propTypes = {
  id: PropTypes.string.isRequired,
  materialcount: PropTypes.number.isRequired,
  inputMaterial: PropTypes.func.isRequired,
};

export default MaterialComponets;
