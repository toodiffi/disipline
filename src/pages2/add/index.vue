<template>
  <div class="add">
    <nut-input
      v-model="plan.name"
      class="nut-input-text"
      placeholder="请输入训练计划名称"
      type="text"
    />

    <SingleDayAction
      v-for="dayPlan in plan.planOfAllDays"
      :key="dayPlan.week"
      :week="dayPlan.week"
      :actions="dayPlan.actions"
      @on-action-saved="onActionSaved"
    />
    <nut-dialog
      teleport="#app"
      content="删除后本条计划以及对应的打卡记录都会被删除，确定删除吗？"
      @ok="deletePlan"
      v-model:visible="isConfirmShow"
    >
    </nut-dialog>
    <div class="add__btns">
      <nut-button type="info" @click="submit">确定</nut-button>
      <nut-button v-if="isEdit" type="danger" @click="isConfirmShow = true">删除</nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { reactive, ref } from 'vue';

import SingleDayAction from './components/SingleDayAction.vue';
import { useStore } from '@/store';
import { weeks, WEEK } from '@/config';
import { TAction, IPlanOfOneDay, ICompleteStatus } from '@/types/plan';
import { back, toast } from '@/utils';

const store = useStore();
// const activeWeek = ref<WEEK>();
const isConfirmShow = ref(false);
const isEdit = ref(Taro.getCurrentInstance().router?.params['option'] === 'edit' || false);

Taro.setNavigationBarTitle({
  title: isEdit.value ? '编辑训练计划' : '新增训练计划'
});

const plan = reactive(
  store.plan
    ? store.plan
    : {
        name: '',
        planOfAllDays: weeks.map(week => {
          return {
            week,
            actions: []
          } as IPlanOfOneDay;
        }),
        completeStatus: [] as ICompleteStatus[]
      }
);

// const setActiveWeek = (week: WEEK) => {
//   activeWeek.value = week;
// };

const onActionSaved = (week: WEEK, actions: TAction[]) => {
  plan.planOfAllDays.forEach(planOfOneDay => {
    if (planOfOneDay.week === week) {
      planOfOneDay.actions = actions;
    }
  });
};

const deletePlan = () => {
  const id = store.plan?._id;
  if (id) {
    store.deletePlan(id).then(res => {
      if (res && res.code === 0) {
        toast('删除成功', 'success');
        setTimeout(() => {
          back();
        }, 1000);
      }
    });
  }
};

const submit = () => {
  console.log('index', 'submit', plan);
  if (!plan.name) {
    toast('请填写计划名称');
    return;
  }

  let nullActionsCount = 0;
  plan.planOfAllDays.forEach(item => {
    const actions = item.actions;
    if (!actions.length) {
      nullActionsCount++;
    }
  });

  if (nullActionsCount === weeks.length) {
    toast('请填写至少一天');
    return;
  }

  if (!isEdit.value) {
    store.addPlan(plan).then(res => {
      if (res && res.code === 0) {
        toast('新增成功', 'success');
        setTimeout(() => {
          back();
        }, 1000);
      }
    });
  } else {
    store.updatePlan(plan).then(res => {
      if (res && res.code === 0) {
        toast('编辑成功', 'success');
        setTimeout(() => {
          back();
        }, 1000);
      }
    });
  }
};
</script>

<style lang="scss">
.add {
  .nut-form-item__label {
    text-align: center;
  }
  &__btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .nut-button {
      margin-bottom: 15px;
      width: 315px;
      height: 50px;
      border-radius: 99px;
      padding: 18px 130px;
      gap: 10px;
    }
  }
}
.nut-popup {
}
</style>
