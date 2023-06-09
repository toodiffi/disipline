import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';
import { IPlan, ICompleteStatus } from '@/types/plan';
import { getDate, toast } from '@/utils';
import { getUserPlan, postCreatePlan, putUpdateUserPlan, deleteUserPlan, login } from '@/apis/user';
import { Actions } from '@/models';
interface State {
  // 暂时只支持一个健身计划
  // _id 是后台返回
  plan?: IPlan & { _id?: string };
}

type TResult = Promise<Request.requestResult | Request.requestError>;

const todayDate = getDate();
const todayDateString = [todayDate.year, todayDate.month, todayDate.day].join('-');

export const useStore = defineStore('plan', {
  state: (): State => ({
    plan: undefined
  }),
  getters: {
    completeStatus(): ICompleteStatus[] {
      return this.plan?.completeStatus || [];
    },
    actionsOfToday(): Actions['items'] {
      return new Actions(
        this.plan?.planOfAllDays?.filter(item => item.week === todayDate.dayOfWeek)[0]?.actions ||
          []
      )?.items;
    },
    isTodayFinished(): boolean {
      return this.completeStatus.filter(item => item.date === todayDateString)[0]?.done;
    }
  },
  actions: {
    async getPlan(): TResult {
      try {
        const res = await getUserPlan();
        this.plan = res.result;
        return res;
      } catch (e) {
        const error = e as Request.requestError;
        // toast(error.message, 'error');
        return error;
      }
    },
    async updatePlan(plan: IPlan): TResult {
      try {
        const res = await putUpdateUserPlan(plan);
        this.plan = res.result;
        return res;
      } catch (e) {
        const error = e as Request.requestError;
        toast(error.message, 'error');
        return error;
      }
    },
    async addPlan(plan: IPlan): TResult {
      try {
        const res = await postCreatePlan(plan);
        this.plan = res.result as IPlan;
        return res;
      } catch (e) {
        const error = e as Request.requestError;
        toast(error.message, 'error');
        return error;
      }
    },
    async deletePlan(planId: string) {
      try {
        const res = await deleteUserPlan(planId);
        this.plan = undefined;
        return res;
      } catch (e) {
        const error = e as Request.requestError;
        toast(error.message, 'error');
        return error;
      }
    },
    async completePlanOfDay(dayStatus: ICompleteStatus) {
      const newCompleteStatus = [...this.completeStatus];
      const idx = newCompleteStatus.findIndex(item => dayStatus.date === item.date);
      if (idx === -1) {
        newCompleteStatus.push(dayStatus);
      } else {
        newCompleteStatus.splice(idx, 1, dayStatus);
      }

      this.updatePlan({ ...(this.plan as IPlan), completeStatus: newCompleteStatus });
    },
    userLogin(): TResult {
      return new Promise((resolve, reject) => {
        Taro.login({
          success(result) {
            login({ code: result.code }).then(res => {
              resolve(res);
            });
          },
          fail(error) {
            toast(error.errMsg, 'error');
            reject(error);
          }
        });
      });
    }
  }
});
