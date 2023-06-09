<template>
  <div class="home" v-if="!loading">
    <HomeDate />
    <div class="home__plan-box">
      <template v-if="store.plan">
        <Item class="home__item" type="primary" @on-click="go2Add('edit')">
          <template #prefix><IconFont icon="rili" :font-size="22" /></template>
          <template #title>{{ store.plan.name }}</template>
          <template #value> 执行中 </template>
          <template #suffix>
            <IconFont icon="qianjin" :font-size="10" />
          </template>
        </Item>

        <template v-if="store.actionsOfToday.length">
          <div class="home__today-content">今日训练内容</div>
          <ActionList :actions="store.actionsOfToday" :show-options="false" />
        </template>
        <Empty
          v-else
          :img="require('/src/assets/images/relax.png')"
          desc="今日无训练，好好休息吧~"
        />
        <nut-button
          v-if="store.actionsOfToday.length"
          class="home__complete"
          type="primary"
          @click="complete"
          :disabled="store.isTodayFinished"
        >
          <template #icon>
            <IconFont icon="a-rilidaka" :font-size="16" />
          </template>
          {{ store.isTodayFinished ? '今日已打卡' : '今日打卡' }}
        </nut-button>
      </template>
      <template v-else>
        <Empty :img="require('/src/assets/images/null.png')" desc="暂无计划" />
        <nut-button class="home__add" type="primary" @click="() => (isShowSheet = true)">
          <template #icon>
            <IconFont icon="jia-copy" :font-size="12" />
          </template>
          去添加
        </nut-button>
        <nut-popup
          pop-class="add-plan-template-box"
          overlay-class="add-plan-template-box__overlay"
          position="bottom"
          destroy-on-close
          closeable
          safe-area-inset-bottom
          v-model:visible="isShowSheet"
          @closed="isShowSheet = false"
        >
          <nut-button
            :class="['add-plan-template-box__item', { custom: item.name === '自定义' }]"
            v-for="item in defaultPlans"
            :key="item.name"
            size="small"
            @click="chooseItem(item)"
          >
            <span>{{ item.name }}</span>
            <!-- <IconFont icon="qianjin" :font-size="10" /> -->
          </nut-button>
        </nut-popup>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro, { useLoad } from '@tarojs/taro';
import { useStore } from '@/store';

import ActionList from '@/pages2/add/components/ActionsList.vue';
import { Item, IconFont, Empty } from '@/components';
import HomeDate from './components/Date.vue';

import { go, getDate, toast } from '@/utils';
import { routes } from '@/router';
import { defaultPlans } from '@/config';
import { IPlan } from '@/types/plan';

const store = useStore();
const todyDate = getDate();

const loading = ref(true);
const isShowSheet = ref(false);

const go2Add = (option: string) => {
  go({
    url: routes.add + `?option=${option}`
  });
};

const chooseItem = (item: IPlan) => {
  if (item.name === '自定义') {
    go2Add('add');
  } else {
    Taro.showLoading({ title: '添加中...' });
    store.addPlan(item).then(res => {
      if (res && res.code === 0) {
        // go2Add('edit');
        toast('新增成功', 'success');
      }
      Taro.hideLoading();
    });
  }
  isShowSheet.value = false;
};

const complete = () => {
  store.completePlanOfDay({
    date: [todyDate.year, todyDate.month, todyDate.day].join('-'),
    done: true
  });

  toast('打卡完成', 'success');
};

useLoad(() => {
  Taro.showLoading({ title: '加载中...' });
  store.getPlan().then(res => {
    if (res && res.code === 0) {
      Taro.hideLoading();
      loading.value = false;
    } else if (res && res.code === 400002) {
      store
        .userLogin()
        .then(res => {
          // 重试一次
          if (res && res.code === 0) {
            store.getPlan();
          }
        })
        .finally(() => {
          Taro.hideLoading();
          loading.value = false;
        });
    }
  });
});
</script>

<style lang="scss">
// 小程序不支持 scoped, 因为小程序节点不支持动态添加属性。

.home {
  &__plan-box {
    margin: 0 30px;
  }
  &__item {
    margin-top: 30px;
  }
  &__add,
  &__complete {
    margin-top: 30px;
    // width: 116px;
    height: 48px;
    border-radius: 14px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  &__today-content {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    line-height: 21px;
    color: $black-color;
  }
  .action {
    border-radius: 16px;
  }
}

.add-plan-template-box {
  border-radius: 40px 40px 0 0;
  box-shadow: 0px 0px 40px 0px rgba(29, 22, 23, 0.1);
  padding: 15px;
  &__item {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    font-size: 12px;
    margin: 5px;
    height: 28px;
    // line-height: 18px;
    // font-family: Poppins-Regular;
    // color: $gray1;
    // height: 38px;
    // padding: 0 30px;
    // border-bottom: 0.8px solid #f7f8f8;
    &.custom {
      color: $blue1;
    }
  }
}
</style>
