import BaseAction from './base';
import { TBareHandedAmount } from '@/types/plan';
import { ACTION_TYPE } from '@/config';
import { IData } from './';

class BareHandedAction extends BaseAction {
  constructor(data: IData) {
    super(data);
    this.type = ACTION_TYPE.BARE_HANDED;
    this.amount =
      data.amount ||
      ({
        group: '',
        count: ''
      } as TBareHandedAmount);
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

export default BareHandedAction;
