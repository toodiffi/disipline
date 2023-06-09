import { ACTION_TYPE, WEEK } from '@/config';

export type TMachineAmount = {
  group: string;
  count: string;
};
export type TRunningAmount = {
  km: string;
  minutes: string;
};
export type TBareHandedAmount = {
  group: string;
  count: string;
};

export type TAction = {
  // id: string;
  /**
   * 训练名称
   */
  name: string;
  /**
   * 训练类型
   */
  type: ACTION_TYPE;
  /**
   * 训练部位
   */
  muscle: string;
  /**
   * 训练量
   */
  amount: TMachineAmount | TRunningAmount | TBareHandedAmount;
};
export interface IPlanOfOneDay {
  /**
   * 当天是周几
   */
  week: WEEK;
  /**
   * 当天要做的所有训练
   */
  actions: TAction[];
}

export interface ICompleteStatus {
  /**
   * 当天日期
   */
  date: string;
  /**
   * 当天训练是否完成
   */
  done: boolean;
}

export interface IPlan {
  /**
   * 计划名称
   */
  name: string;
  /**
   * 一周 7 天所有的训练内容
   */
  planOfAllDays: IPlanOfOneDay[];
  /**
   * 计划每天完成情况
   */
  completeStatus: ICompleteStatus[];
}
