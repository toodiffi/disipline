import { TAction } from '@/types/plan';
import BaseAction from './base';
import { Action, IData } from './';

class Actions {
  items: BaseAction[];
  /**
   * 使用后台数据构造新的数据模型
   * @param actions 后台返回的
   */
  constructor(actions: TAction[]) {
    this.items = actions.map(action => new Action().create(action as IData));
    console.log('actions', 'items', this.items);
  }

  add(action: BaseAction): boolean {
    const isDuplicated = this.items.some(item => item.name === action.name);
    if (isDuplicated) {
      return false;
    }
    this.items.push(action);
    return true;
  }

  edit(action: BaseAction): boolean {
    const index = this.items.findIndex(item => item.id === action.id);
    if (index !== -1) {
      this.items.splice(index, 1, action);
      return true;
    }
    return false;
  }

  delete(action: BaseAction) {
    this.items.splice(this.items.indexOf(action), 1);
  }
}

export default Actions;
