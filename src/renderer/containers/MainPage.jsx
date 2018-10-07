import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const SIDE_MENUE_STYLE = { textDecoration: 'none' };

export default function MainPage({ children }) {
  return (
    <div className="pane-group">
      <div className="pane-sm sidebar">
        <nav className="nav-group">
          <h1 className="nav-group-title">UserMenu</h1>
          <Link to="/MaterialPage" style={SIDE_MENUE_STYLE}>
            <div className="nav-group-item">
              <span className="icon icon-picasa" />
                MaterialPage
            </div>
          </Link>
          <Link to="/ServantPage" style={SIDE_MENUE_STYLE}>
            <div className="nav-group-item">
              <span className="icon icon-user-add" />
                ServantPage
            </div>
          </Link>
          <Link to="/SkillPage" style={SIDE_MENUE_STYLE}>
            <div className="nav-group-item">
              <span className="icon icon-flash" />
                SkillPage
            </div>
          </Link>
          <Link to="/SkillPage2" style={SIDE_MENUE_STYLE}>
            <div className="nav-group-item">
              <span className="icon icon-flash" />
                ExpectedSkillPage
            </div>
          </Link>
          <Link to="/AnalyticsPage" style={SIDE_MENUE_STYLE}>
            <div className="nav-group-item">
              <span className="icon icon-chart-bar" />
                AnalyticsPage
            </div>
          </Link>
        </nav>
      </div>
      <div className="pane">{children}</div>
    </div>
  );
}

MainPage.propTypes = {
  children: PropTypes.element.isRequired,
};
