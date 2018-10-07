import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';
import MaterialComponets from '../components/MaterialPageComponents/MaterialComponent';
import { inputMaterial, savedb, restoredb } from '../actions/index';

const styles = StyleSheet.create({
  boxA: {
    ':after': {
      content: '',
      display: 'block',
      clear: 'both',
    },
  },
  box1: {
    padding: '5px',
    float: 'left',
    width: '100%',
  },
  box2: {
    padding: '5px',
    float: 'left',
    width: '100%',
  },
  p: {
    marginRight: 'auto',
  },
  form: {
    display: 'inline',
  },
});

const MaterialPage = props =>
(
  <div>
    <div className={css(styles.box1)}>
      <form
        className={css(styles.form)}
        onSubmit={(e) => {
          e.preventDefault();
          props.savedb('material', props.userMaterial);
        }}
      >
        <button className="btn btn-primary">Save Materia</button>
      </form>
      <form
        className={css(styles.form)}
        onSubmit={(e) => {
          e.preventDefault();
          props.restoredb('material');
        }}
      >
        <button className="btn btn-positive">Restore Material</button>
      </form>
    </div>
    <div className={css(styles.box2)}>
      {
        Object.keys(props.userMaterial)
        .map(
          x => (
            <MaterialComponets
              key={x}
              id={x}
              materialcount={props.userMaterial[x]}
              value={props.userMaterial[x]}
              inputMaterial={props.inputMaterial}
            />))
      }
    </div>
  </div>
);


MaterialPage.propTypes = {
  userMaterial: PropTypes.shape({
    100: PropTypes.number.isRequired,
  }).isRequired,
  inputMaterial: PropTypes.func.isRequired,
  savedb: PropTypes.func.isRequired,
  restoredb: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userMaterial: state.default.userMaterial,
});

const mapDispatchToProps = { inputMaterial, savedb, restoredb };

export default connect(mapStateToProps, mapDispatchToProps)(MaterialPage);
