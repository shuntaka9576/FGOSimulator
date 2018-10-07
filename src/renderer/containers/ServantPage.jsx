import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import ServantClassComponet from '../components/ServantPageComponents/ServantClassComponents';
import { classifyservant, inputServant, savedb, restoredb, uninputServant } from '../actions/index';


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


class ServantPage extends Component {

  renderClassComponent() {
    const classCount = 13;
    const components = [];
    for (let classNo = 1; classNo <= classCount; classNo += 1) {
      components.push(
        <ServantClassComponet
          key={classNo}
          classNo={classNo}
          imgsrc={`./icon/i/icon_class/class_${classNo}.png`}
          func={this.props.classifyservant}
        />,
      );
    }
    return components;
  }

  renderUnOwnedServantByClassComponet() {
    const components = [];
    Object.keys(this.props.userUnowendServantByClass).map((x) => {
      components.push(<ServantClassComponet
        key={this.props.userUnowendServantByClass[x].id}
        classNo={this.props.userUnowendServantByClass[x].id}
        imgsrc={`./icon/i/icon_servants/${this.props.userUnowendServantByClass[x].id}.jpg`}
        func={this.props.inputServant}
      />);
      }
    );
    return components;
  }

  renderOwnedServant() {
    const components = [];
    Object.keys(this.props.userOwendServant).map((x) => {
      components.push(<ServantClassComponet
        key={this.props.userOwendServant[x].id}
        classNo={this.props.userOwendServant[x].id}
        imgsrc={`./icon/i/icon_servants/${this.props.userOwendServant[x].id}.jpg`}
        func={this.props.uninputServant}
      />);
    },
    );
    return components;
  }

  render() {
    return (
      <div>
        <div className={css(styles.box1)}>
          <form
            className={css(styles.form)}
            onSubmit={(e) => {
              e.preventDefault();
              this.props.savedb('servant', this.props.userOwendServant);
            }}
          >
            <button className="btn btn-primary">Save MyServant</button>
          </form>
          <form
            className={css(styles.form)}
            onSubmit={(e) => {
              e.preventDefault();
              this.props.restoredb('servant');
            }}
          >
            <button className="btn btn-positive">Restore MyServant</button>
          </form>
        </div>
        <div>{this.renderClassComponent()}</div>
        <div>{this.renderUnOwnedServantByClassComponet()}</div>
        <div>My Servant</div>
        <div>{this.renderOwnedServant()}</div>
      </div>
    );
  }
}

ServantPage.propTypes = {
  classifyservant: PropTypes.func.isRequired,
  inputServant: PropTypes.func.isRequired,
  savedb: PropTypes.func.isRequired,
  restoredb: PropTypes.func.isRequired,
  uninputServant: PropTypes.func.isRequired,
  userUnowendServantByClass: PropTypes.object.isRequired,
  userOwendServant: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userUnowendServantByClass: state.default.userUnowendServantByClass,
  userOwendServant: state.default.userOwendServant,
});

const mapDispatchToProps = { classifyservant, inputServant, uninputServant, savedb, restoredb };

export default connect(mapStateToProps, mapDispatchToProps)(ServantPage);
