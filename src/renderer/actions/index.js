import nedbutils from '../lib/nedb/nedb.operation';
import { Servantdb, inventoryNum } from '../lib/fgo/materialdata.min';
import materaildatautills, { additonMateraildata } from '../lib/fgo/materialdatautills';
import { getanalyticschartconfig } from '../lib/highcharts/analyticschart';

export const inputMaterial = (materialid, count) => (dispatch, getState) => {
  const state = getState().default.userMaterial;
  dispatch({ type: 'INPUT_MATERIAL', materialid, count, state });
};

export const savedb = (dbname, savedata) => () => {
  const db = nedbutils.createdb(dbname);
  // TODO Promiseを使って上手くやりたい
  nedbutils.removeallinsertdata(db, savedata);
};

export const restoredb = dbname => (dispatch) => {
  const db = nedbutils.createdb(dbname);
  db.find({}, (err, docs) => {
    const dbdata = docs[0];
    switch (dbname) {
      case 'material':
        dispatch({ type: 'RESTORE_MATERIAL_DB', dbdata });
        break;
      case 'servant':
        dispatch({ type: 'RESTORE_SERVANT_DB', dbdata });
        break;
      case 'myskill':
        dispatch({ type: 'RESTORE_MYSKILL_DB', dbdata });
        break;
      case 'expectskill':
        dispatch({ type: 'RESTORE_EXPECTSKILL_DB', dbdata });
        break;
      default :
        return null;
    }
  });
};

export const classifyservant = kind => (dispatch, getState) => {
  const servantlist = Servantdb.filter((x) => { return x.kind === Number(kind - 1); });
  const servantlistButy = [];
  for (const servant of servantlist) {
    servantlistButy[servant.id] = {};
    servantlistButy[servant.id] = servant;
  }
  const userOwendServant = getState().default.userOwendServant;
  for (const i of Object.keys(servantlistButy)) {
    for (const j of Object.keys(userOwendServant)) {
      if (i === j) {
        delete servantlistButy[i];
      }
    }
  }
  dispatch({ type: 'GET_UNOWNED_SERVANT_BY_CLASS', servantlistButy });
};

// クラス別の鯖ボタンを押したときのAction
export const inputServant = id => (dispatch, getState) => {
  const userOwendServant = getState().default.userOwendServant;
  const userUnowendServantByClass = getState().default.userUnowendServantByClass;
  const servant = Servantdb.filter((x) => { return x.id === Number(id); });
  dispatch({ type: 'INPUT_OWNED_SERVANT', servant, userOwendServant });
  dispatch({ type: 'INPUT_UNOWNED_SERVANT_BY_CLASS', servant, userUnowendServantByClass });
};

// 所持している鯖ボタンを押したときのAction
export const uninputServant = id => (dispatch, getState) => {
  const userOwendServant = getState().default.userOwendServant;
  const userUnowendServantByClass = getState().default.userUnowendServantByClass;
  const servant = Servantdb.filter((x) => { return x.id === Number(id); });
  dispatch({ type: 'UNINPUT_OWNED_SERVANT', servant, userOwendServant });
  dispatch({ type: 'UNINPUT_UNOWNED_SERVANT_BY_CLASS', servant, userUnowendServantByClass });
};

// skillの設定をする際のAction
export const inputMySkillinfo = (id, skillNo, count) => (dispatch, getState) => {
  const userskillinfo = getState().default.userskillinfo;
  dispatch({ type: 'INPUT_MYSKILL', userskillinfo, id, skillNo, count });
};

// skill(期待)の設定をする際のAction
export const inputExpectSkillinfo = (id, skillNo, count) => (dispatch, getState) => {
  const expectskillinfo = getState().default.expectskillinfo;
  dispatch({ type: 'INPUT_EXPECT_SKILL', expectskillinfo, id, skillNo, count });
};

// skillstateを受け取って、inventoryNum形式のobjを返す
export const graphconfig = () => (dispatch, getState) => {
  const userOwendServantstate = getState().default.userOwendServant;
  const userservantskillinfostate = getState().default.userskillinfo;
  const expectskillinfostate = getState().default.expectskillinfo;
  const userMaterialstate = getState().default.userMaterial;

  const [nowAllMaterail, nowServantAllMaterial] = materaildatautills
  .getAllMaterail(userOwendServantstate, userservantskillinfostate);
  const [expectAllMaterail, expectServantAllMaterial] = materaildatautills
  .getAllMaterail(userOwendServantstate, expectskillinfostate);

  // 鯖毎の必要素材数のリストから、合計の素材数で0になっているキーを削除する(serisobjのため工夫)
  for (let keys of Object.keys(expectAllMaterail)) {
    for (var key of Object.keys(expectServantAllMaterial)) {
      if (expectAllMaterail[keys] === 0)
        delete expectServantAllMaterial[key][keys];
    }
  }

  for (let i of Object.keys(expectAllMaterail)) {
    if (expectAllMaterail[i] === 0) {
        delete expectAllMaterail[i];
    }
  }

  const seriesobj = [];
  let i = 0;
  for (const exid of Object.keys(expectServantAllMaterial)) {
    seriesobj[i] = {};
    const svobj = userOwendServantstate[exid];
    seriesobj[i].name = svobj.text;
    var datalist = [];
    for (const materialid of Object.keys(expectServantAllMaterial[exid])) {
      //期待値から、現在値を引く
      if (expectServantAllMaterial[exid][materialid] - nowServantAllMaterial[exid][materialid] >= 0) {
        datalist.push(expectServantAllMaterial[exid][materialid] - nowServantAllMaterial[exid][materialid]);
      } else {
        //期待値から現在値を引いたら、マイナスになったら、0を代入
        datalist.push(0);
      }
    }
    seriesobj[i].data = datalist;
    i += 1;
  }

  // 期待の合計と現在の合計を引き算し、必要数を算出
  let shortage_sum_mataterial = {};

  // 期待の合計は、使わないキーを削除していることから、外のループ
  for (let ex of Object.keys(expectAllMaterail)) {
    shortage_sum_mataterial[ex] = {};
    if (expectAllMaterail[ex] - nowAllMaterail[ex] >= 0) {
      shortage_sum_mataterial[ex] = expectAllMaterail[ex] - nowAllMaterail[ex];
    } else {
      shortage_sum_mataterial[ex] = 0;
    }
  }

  /**必要数から手持ちを引き算 */
  let shortage_sum_mataterial_data = [];
  for (let i of Object.keys(shortage_sum_mataterial)) {
    //必要な素材数から、手持ちの素材を引く
    if (shortage_sum_mataterial[i] - userMaterialstate[i] >= 0) {
      shortage_sum_mataterial_data.push(shortage_sum_mataterial[i] - userMaterialstate[i]);
    } else {
      shortage_sum_mataterial_data.push(0);
    }
  }
  const seriesobj_sh = {};
  seriesobj_sh.name = 'needed';
  seriesobj_sh.data = shortage_sum_mataterial_data;
  seriesobj.push(seriesobj_sh);
  const config = getanalyticschartconfig(seriesobj, Object.keys(expectAllMaterail));
  dispatch({ type: 'SET_GRAPH_CONFIG', config });
};

