import { Servantdb, inventoryNum } from './materialdata.min';

export const additonMateraildata = (allkeymaterialobj, materailobj) => {
  // TODO eslint対策、引数のオブジェクトに参照を入れてはいけないらしい
  const allkeymaterialobjcp = Object.assign({}, allkeymaterialobj);
  const materailobjcp = Object.assign({}, materailobj);
  for (const i of Object.keys(materailobjcp)) {
    allkeymaterialobjcp[i] += materailobjcp[i];
  }
  return allkeymaterialobjcp;
};

const getmaterailobjbyskill = (servantobj, skilllevel) => {
  let summaterial = Object.assign({}, inventoryNum);
  switch (skilllevel) {
    case 10:
      summaterial = additonMateraildata(summaterial, servantobj.skill9);
    case 9:
      summaterial = additonMateraildata(summaterial, servantobj.skill8);
    case 8:
      summaterial = additonMateraildata(summaterial, servantobj.skill7);
    case 7:
      summaterial = additonMateraildata(summaterial, servantobj.skill6);
    case 6:
      summaterial = additonMateraildata(summaterial, servantobj.skill5);
    case 5:
      summaterial = additonMateraildata(summaterial, servantobj.skill4);
    case 4:
      summaterial = additonMateraildata(summaterial, servantobj.skill3);
    case 3:
      summaterial = additonMateraildata(summaterial, servantobj.skill2);
    case 2:
      summaterial = additonMateraildata(summaterial, servantobj.skill1);
      break;
    case 1:
      summaterial = Object.assign({}, inventoryNum);
      break;
    default:
      summaterial = Object.assign({}, inventoryNum);
      break;
  }
  return summaterial;
};

const getmaterailobjbyevolution = (servantobj, skilllevel) => {
  let summaterial = Object.assign({}, inventoryNum);
  switch (skilllevel) {
    case 4:
      summaterial = additonMateraildata(summaterial, servantobj.AdAgain4);
    case 3:
      summaterial = additonMateraildata(summaterial, servantobj.AdAgain3);
    case 2:
      summaterial = additonMateraildata(summaterial, servantobj.AdAgain2);
    case 1:
      summaterial = additonMateraildata(summaterial, servantobj.AdAgain1);
      break;
    default:
      summaterial = Object.assign({}, inventoryNum);
      break;
  }
  return summaterial;
};

const getsingleServantAllMaterial = (servantobj, skillinfo) => {
  const skill1obj = getmaterailobjbyskill(servantobj, skillinfo.skill1);
  const skill2obj = getmaterailobjbyskill(servantobj, skillinfo.skill2);
  const skill3obj = getmaterailobjbyskill(servantobj, skillinfo.skill3);
  const skill4obj = getmaterailobjbyevolution(servantobj, skillinfo.skill4);
  let summaterail = Object.assign({}, inventoryNum);
  summaterail = additonMateraildata(summaterail, skill1obj);
  summaterail = additonMateraildata(summaterail, skill2obj);
  summaterail = additonMateraildata(summaterail, skill3obj);
  summaterail = additonMateraildata(summaterail, skill4obj);
  return summaterail;
};

export default {
  getInitialSkillState: () => {
    const servantidlist = Servantdb.map(x => x.id);
    const InitialSkillState = {};
    for (const id of servantidlist) {
      InitialSkillState[id] = {};
      InitialSkillState[id].skill1 = 0;
      InitialSkillState[id].skill2 = 0;
      InitialSkillState[id].skill3 = 0;
      InitialSkillState[id].skill4 = 0;
    }
    return InitialSkillState;
  },
  getAllMaterail: (servantobjlist, userskillinfo) => {
    const servantidlist = Object.keys(servantobjlist);
    let userservatnskillinfo = {};
    for (let i of servantidlist) {
      userservatnskillinfo[i] = {};
      userservatnskillinfo[i] = userskillinfo[i];
    }
    let ServantAllMaterial = {};
    let AllMaterail = Object.assign({}, inventoryNum);
    for (let i of Object.keys(userservatnskillinfo)) {
      let singleServantAllMaterial = Object.assign({}, inventoryNum);
      const servantobj = servantobjlist[i];
      singleServantAllMaterial = getsingleServantAllMaterial(servantobj, userservatnskillinfo[i]);
      ServantAllMaterial[i] = {};
      ServantAllMaterial[i] = singleServantAllMaterial;
      AllMaterail = additonMateraildata(AllMaterail, singleServantAllMaterial);
    }
    return [AllMaterail, ServantAllMaterial];
  },
};
