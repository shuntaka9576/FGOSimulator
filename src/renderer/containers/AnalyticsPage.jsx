import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Highcharts from 'react-highcharts';

import { graphconfig, classifyservant, inputServant, savedb, restoredb, uninputServant } from '../actions/index';

class AnalyticsPage extends Component {
  componentWillMount() {
    this.props.graphconfig();
  }
  test() {
    if (Object.keys(this.props.userOwendServant).length !== 0 &&
      Object.keys(this.props.userskillinfo).length !== 0) {
      return (
        <Highcharts config={this.props.highchartsconfig} ref="chart" />
      );
    }
    return <div>設定して</div>;
  }
  render() {
    return (
      <div>
        {this.test()}
      </div>
    );
  }
}

AnalyticsPage.propTypes = {
  highchartsconfig: PropTypes.object.isRequired,
  userOwendServant: PropTypes.object.isRequired,
  userskillinfo: PropTypes.shape({
    100: PropTypes.shape({
      skill1: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  graphconfig: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  highchartsconfig: state.default.highchartsconfig,
  userMaterial: state.default.userMaterial,
  userUnowendServantByClass: state.default.userUnowendServantByClass,
  userOwendServant: state.default.userOwendServant,
  userskillinfo: state.default.userskillinfo,
  expectskillinfo: state.default.expectskillinfo,
});

const mapDispatchToProps = {
  graphconfig,
  classifyservant,
  inputServant,
  uninputServant,
  savedb,
  restoredb,
};


export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);

