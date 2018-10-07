import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SkillPageComponentsTableRow from './SkillPageComponentsTableRow';

const SkillPageComponentsTable = props => (
  <table className="table-striped">
    <thead>
      <tr>
        <th>icon</th>
        <th>Skill 1</th>
        <th>Skill 2</th>
        <th>Skill 3</th>
        <th>霊気再臨</th>
      </tr>
    </thead>
    <tbody>
      {
        Object.keys(props.userOwendServant).map(
      x => (
        <SkillPageComponentsTableRow
          key={x}
          id={x}
          imgsrc={`./icon/i/icon_servants/${x}.jpg`}
          userskillinfo={props.userskillinfo[x]}
          func={props.func}
        />
      ))
      }
    </tbody>
  </table>
);


SkillPageComponentsTable.propTypes = {
  userOwendServant: PropTypes.element.isRequired,
  func: PropTypes.func.isRequired,
};


export default SkillPageComponentsTable;
