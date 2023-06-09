export enum ACTION_TYPE {
  NONE = 0,
  MACHINE = 1,
  RUNNING = 2,
  BARE_HANDED = 3
}

export const ACTION_TYPE_ZH = {
  // [ACTION_TYPE.NONE]: '请选择',
  [ACTION_TYPE.MACHINE]: '器械',
  [ACTION_TYPE.RUNNING]: '跑步',
  [ACTION_TYPE.BARE_HANDED]: '徒手'
};

export enum WEEK {
  MON = 1,
  TUS = 2,
  WED = 3,
  TUR = 4,
  FRI = 5,
  SAT = 6,
  SUN = 7
}

export const WEEK_ZH = {
  [WEEK.MON]: '周一',
  [WEEK.TUS]: '周二',
  [WEEK.WED]: '周三',
  [WEEK.TUR]: '周四',
  [WEEK.FRI]: '周五',
  [WEEK.SAT]: '周六',
  [WEEK.SUN]: '周日'
};
export const WEEK_EN = {
  [WEEK.MON]: 'Mon',
  [WEEK.TUS]: 'Tue',
  [WEEK.WED]: 'Wed',
  [WEEK.TUR]: 'Thurs',
  [WEEK.FRI]: 'Fri',
  [WEEK.SAT]: 'Sat',
  [WEEK.SUN]: 'Sun'
};

export const weeks = [WEEK.MON, WEEK.TUS, WEEK.WED, WEEK.TUR, WEEK.FRI, WEEK.SAT, WEEK.SUN];

// export const defaultActions = Object.entries(ACTION_TYPE_ZH).map(item => {
//   const [key, value] = item;
//   return {
//     text: value,
//     value: Number(key)
//   };
// });

export const defaultActions = [
  {
    text: ACTION_TYPE_ZH[ACTION_TYPE.MACHINE],
    value: ACTION_TYPE.MACHINE,
    icon: require('/src/assets/images/machine.png'),
    iconWidth: '26',
    iconHeight: '31'
  },
  {
    text: ACTION_TYPE_ZH[ACTION_TYPE.RUNNING],
    value: ACTION_TYPE.RUNNING,
    icon: require('/src/assets/images/running.png'),
    iconWidth: '22',
    iconHeight: '33'
  },
  {
    text: ACTION_TYPE_ZH[ACTION_TYPE.BARE_HANDED],
    value: ACTION_TYPE.BARE_HANDED,
    icon: require('/src/assets/images/bare-handed.png'),
    iconWidth: '24',
    iconHeight: '16'
  }
];

export const defaultPlans = require('./plan-templates.json');
defaultPlans.unshift({ name: '自定义' });
