import BaseAction from './base';
import { ACTION_TYPE } from '@/config';
import { IData } from './';
import { TRunningAmount } from '@/types/plan';

class RunningAction extends BaseAction {
  amount: TRunningAmount;
  constructor(data: IData) {
    super(data);
    this.name = '跑步';
    this.type = ACTION_TYPE.RUNNING;
    this.amount = data.amount || {
      km: '',
      minutes: ''
    };
  }

  validator(): boolean {
    if (!(this.amount.km || this.amount.minutes)) {
      return false;
    }
    return true;
  }

  public formatterAmount() {
    return `${this.amount.km ? this.amount.km + ' 公里' : ''} ${
      this.amount.minutes ? this.amount.minutes + ' 分钟' : ''
    }`;
  }
}

export default RunningAction;
