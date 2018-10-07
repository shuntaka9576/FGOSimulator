import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';
import { savedb, restoredb, inputExpectSkillinfo } from '../actions/index';
import SkillPageComponentsTable from '../components/SkilPageComponents/SkillPageComponentsTable';

const styles = StyleSheet.create({
  NUMBER_FORM: {
    width: '100%',
    height: '100%',
    margin: '0px',
  },
  box1: {
    padding: '5px',
    float: 'left',
    width: '100%',
  },
  form: {
    display: 'inline',
  },
});

class SkillPage extends Component {
  componentWillMount() {
    this.props.restoredb('expectskill');
  }
  renderSkillPageComponetTable() {
    if (Object.keys(this.props.userOwendServant).length === 0) {
      return <div>未設定</div>;
    }
    return (
      <SkillPageComponentsTable
        userskillinfo={this.props.expectskillinfo}
        userOwendServant={this.props.userOwendServant}
        func={this.props.inputExpectSkillinfo}
      />
    );
  }

  render() {
    return (
      <div>
        <div className={css(styles.box1)}>
          <form
            className={css(styles.form)}
            onSubmit={(e) => {
              e.preventDefault();
              this.props.savedb('expectskill', this.props.expectskillinfo);
            }}
          >
            <button className="btn btn-primary">Save Skills</button>
          </form>
          <form
            className={css(styles.form)}
            onSubmit={(e) => {
              e.preventDefault();
              this.props.restoredb('expectskill');
            }}
          >
            <button className="btn btn-positive">Restore Skills</button>
          </form>
        </div>
        <div>{this.renderSkillPageComponetTable()}</div>
      </div>
    );
  }
}

SkillPage.propTypes = {
  expectskillinfo: PropTypes.shape({
    100: PropTypes.shape({
      skill1: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  userOwendServant: PropTypes.object.isRequired,
  savedb: PropTypes.func.isRequired,
  restoredb: PropTypes.func.isRequired,
  inputExpectSkillinfo: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  userMaterial: state.default.userMaterial,
  expectskillinfo: state.default.expectskillinfo,
  userOwendServant: state.default.userOwendServant,
});

const mapDispatchToProps = { savedb, restoredb, inputExpectSkillinfo };

export default connect(mapStateToProps, mapDispatchToProps)(SkillPage);
