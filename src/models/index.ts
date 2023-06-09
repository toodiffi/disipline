import { ACTION_TYPE } from '@/config';
import BaseAction from './base';
import MachineAction from './machine';
import RunningAction from './running';
import BareHandedAction from './bare-handed';
import Actions from './actions';

interface IData {
  name?: string;
  type: ACTION_TYPE;
  muscle?: string;
  amount?: any;
  id?: number;
}

class Action {
  create(data: IData): BaseAction {
    switch (data.type) {
      case ACTION_TYPE.MACHINE:
        return new MachineAction(data);
      case ACTION_TYPE.RUNNING:
        return new RunningAction(data);
      case ACTION_TYPE.BARE_HANDED:
      default:
        return new BareHandedAction(data);
    }
  }
}

export { BaseAction, RunningAction, MachineAction, BareHandedAction, Action, Actions, IData };
