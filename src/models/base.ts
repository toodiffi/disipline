import { ACTION_TYPE, ACTION_TYPE_ZH } from '@/config';
import { getDate } from '@/utils';
import { IData } from './';

// abstract 类无法在 ref 中推断出类型
let idSeed = 1;
class BaseAction {
  public name: string;
  public type: ACTION_TYPE;
  public amount: any;
  public muscle: string;
  public id: number;
  constructor(data: IData) {
    this.type = ACTION_TYPE.NONE;
    this.name = data.name || '';
    this.amount = data.amount || {};
    this.muscle = data.muscle || '';
    this.id = data.id || idSeed++;
  }

  public validator(): boolean {
    return true;
  }

  /**
   * 格式化 action 名称
   * @returns string
   */
  public formatterName() {
    return `${this.muscle} ${this.name}`;
  }

  /**
   * 格式化运动量
   *  @returns string
   */
  public formatterAmount() {}

  /**
   * @returns 提交后台时使用
   */
  public getPropertiesForApi() {
    return {
      name: this.name,
      type: this.type,
      muscle: this.muscle,
      amount: { ...this.amount }
    };
  }

  /**
   * @returns
   */
  public getAllProperties() {
    return {
      ...this.getPropertiesForApi(),
      id: this.id
    };
  }
}

export default BaseAction;
