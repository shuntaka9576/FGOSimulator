import React from 'react';
import PropTypes from 'prop-types';

const ServantClassComponet = props =>
(
  <button
    id={props.classNo}
    onClick={e => props.func(e.currentTarget.getAttribute('id'))}
  >
    <img
      src={props.imgsrc}
      width="50"
      height="50"
      alt="test"
    />
  </button>
);

ServantClassComponet.propTypes = {
  classNo: PropTypes.number.isRequired,
  imgsrc: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default ServantClassComponet;
