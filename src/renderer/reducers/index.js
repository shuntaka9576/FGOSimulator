import { combineReducers } from 'redux';
import { inventoryNum } from '../lib/fgo/materialdata.min';
import materaildatautills from '../lib/fgo/materialdatautills';

const userMaterial = (state = inventoryNum, action) => {
  switch (action.type) {
    case 'INPUT_MATERIAL': {
      const materialhash = {};
      materialhash[action.materialid] = action.count;
      return Object.assign({}, action.state, materialhash);
    }
    case 'RESTORE_MATERIAL_DB':
      delete action.dbdata._id;
      return Object.assign({}, action.dbdata);
    default :
      return state;
  }
};

const userUnowendServantByClass = (state = {}, action) => {
  switch (action.type) {
    case 'GET_UNOWNED_SERVANT_BY_CLASS': {
      return action.servantlistButy;
    }
    case 'INPUT_UNOWNED_SERVANT_BY_CLASS': {
      const userUnowendServantByClassstate = action.userUnowendServantByClass;
      delete userUnowendServantByClassstate[action.servant[0].id];
      return userUnowendServantByClassstate;
    }
    case 'UNINPUT_UNOWNED_SERVANT_BY_CLASS': {
      const userUnowendServantByClassstate = action.userUnowendServantByClass;
      userUnowendServantByClassstate[action.servant[0].id] = {};
      userUnowendServantByClassstate[action.servant[0].id] = action.servant[0];
      return userUnowendServantByClassstate;
    }

    default :
      return state;
  }
};

const userOwendServant = (state = {}, action) => {
  switch (action.type) {
    case 'INPUT_OWNED_SERVANT': {
      const userowenedstate = Object.assign({}, action.userOwendServant);
      userowenedstate[action.servant[0].id] = {};
      userowenedstate[action.servant[0].id] = action.servant[0];
      return userowenedstate;
    }
    case 'UNINPUT_OWNED_SERVANT': {
      const userowenedstate = Object.assign({}, action.userOwendServant);
      delete userowenedstate[action.servant[0].id];
      return userowenedstate;
    }
    case 'RESTORE_SERVANT_DB': {
      delete action.dbdata._id;
      return Object.assign({}, action.dbdata);
    }
    default :
      return state;
  }
};

const userskillinfo = (state = materaildatautills.getInitialSkillState(), action) => {
  switch (action.type) {
    case 'INPUT_MYSKILL': {
      const userskillinfostate = action.userskillinfo;
      userskillinfostate[action.id][action.skillNo] = Number(action.count);
      return Object.assign({}, userskillinfostate);
    }
    case 'RESTORE_MYSKILL_DB': {
      delete action.dbdata._id;
      return Object.assign({}, action.dbdata);
    }
    default :
      return state;
  }
};

const expectskillinfo = (state = materaildatautills.getInitialSkillState(), action) => {
  switch (action.type) {
    case 'INPUT_EXPECT_SKILL': {
      const expectskillinfostate = action.expectskillinfo;
      expectskillinfostate[action.id][action.skillNo] = Number(action.count);
      return Object.assign({}, expectskillinfostate);
    }
    case 'RESTORE_EXPECTSKILL_DB': {
      delete action.dbdata._id;
      return Object.assign({}, action.dbdata);
    }
    default :
      return state;
  }
};

const highchartsconfig = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GRAPH_CONFIG': {
      return Object.assign({}, action.config);
    }
    default :
      return state;
  }
};

export default combineReducers({
  userMaterial,
  userUnowendServantByClass,
  userOwendServant,
  userskillinfo,
  expectskillinfo,
  highchartsconfig,
});

