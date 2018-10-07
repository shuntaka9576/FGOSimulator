import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import MainPage from './containers/MainPage';
import MaterialPage from './containers/MaterialPage';
import ServantPage from './containers//ServantPage';
import SkillPage from './containers//SkillPage';
import SkillPage2 from './containers//SkillPage2';
import AnalyticsPage from './containers/AnalyticsPage';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor >,
);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(
  reducer,
  DevTools.instrument(),
);
const history = syncHistoryWithStore(hashHistory, store);

const appRouting = (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={MainPage}>
          <Route path="MaterialPage" component={MaterialPage} />
          <Route path="ServantPage" component={ServantPage} />
          <Route path="SkillPage" component={SkillPage} />
          <Route path="SkillPage2" component={SkillPage2} />
          <Route path="AnalyticsPage" component={AnalyticsPage} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
);


render(appRouting, document.getElementById('app'));

