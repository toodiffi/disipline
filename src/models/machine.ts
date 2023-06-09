import BaseAction from './base';
import { TMachineAmount } from '@/types/plan';
import { ACTION_TYPE, ACTION_TYPE_ZH } from '@/config';
import { IData } from './';

export default class MachineAction extends BaseAction {
  constructor(data: IData) {
    super(data);
    this.type = ACTION_TYPE.MACHINE;
    this.amount =
      data.amount ||
      ({
        group: '',
        count: ''
      } as TMachineAmount);
  }

  validator(): boolean {
    if (!(this.name && this.amount.group && this.amount.count)) {
      return false;
    }
    return true;
  }

  public formatterAmount() {
    return `${this.amount.group} x ${this.amount.count}`;
  }
}
