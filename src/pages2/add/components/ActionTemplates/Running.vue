<template>
  <div class="running">
    <Tips class="running__reminder">公里或分钟填写一个即可</Tips>
    <num-input v-model="newAction.amount.km" placeholder="跑多远">
      <template #prefix>
        <IconFont icon="juli" :font-size="18" />
      </template>
      <template #suffix>Km</template>
    </num-input>
    <num-input v-model="newAction.amount.minutes" placeholder="跑多少分钟">
      <template #prefix>
        <IconFont icon="shijian1" :font-size="18" />
      </template>
      <template #suffix>Min</template>
    </num-input>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

import { IconFont, Tips } from '@/components';
import NumInput from '../NumInput.vue';

import { RunningAction } from '@/models';

// 确定 newAction 不会是 undefined
const newAction = inject('newAction') as RunningAction;

// 引用, 修改了 action 就修改了 props.value, 不推荐，但是，这里的情况是子组件和父组件耦合紧密，子组件没有任何逻辑，这么做也 ok
// watch(action, val => {
//   emit('onNewActionChange', val);
// });
</script>

<style lang="scss">
.running {
  &__reminder {
    padding-left: 15px;
  }
}
</style>
