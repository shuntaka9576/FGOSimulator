import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SkillPageComponentsTableRow = props => (
  <tr>
    <td width="50px">
      <img
        src={props.imgsrc}
        width="50"
        height="50"
      />
    </td>
    <td width="25%">
      <input
        type="number"
        className="form-control"
        id={props.id}
        skillNo="skill1"
        value={props.userskillinfo.skill1}
        onChange={e =>
          props.func(e.target.id, 'skill1', e.target.value)
          }
      />
    </td>
    <td width="25%">
      <input
        type="number"
        className="form-control"
        id={props.id}
        skillNo="skill2"
        value={props.userskillinfo.skill2}
        onChange={e =>
          props.func(e.target.id, 'skill2', e.target.value)
          }
      />
    </td>
    <td width="25%">
      <input
        type="number"
        className="form-control"
        id={props.id}
        skillNo="skill3"
        value={props.userskillinfo.skill3}
        onChange={e =>
          props.func(e.target.id, 'skill3', e.target.value)
          }
      />
    </td>
    <td width="25%">
      <input
        type="number"
        className="form-control"
        id={props.id}
        skillNo="skill4"
        value={props.userskillinfo.skill4}
        onChange={e =>
          props.func(e.target.id, 'skill4', e.target.value)
          }
      />
    </td>
  </tr>
);

SkillPageComponentsTableRow.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userskillinfo: PropTypes.shape({
    skill1: PropTypes.number.isRequired,
    skill2: PropTypes.number.isRequired,
    skill3: PropTypes.number.isRequired,
    skill4: PropTypes.number.isRequired,
  }).isRequired,
  func: PropTypes.func.isRequired,
  userOwendServant: PropTypes.element.isRequired,
};

export default SkillPageComponentsTableRow;
