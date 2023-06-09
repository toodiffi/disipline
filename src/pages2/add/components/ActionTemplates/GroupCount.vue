<template>
  <NumInput v-model="newAction.amount.group" placeholder="做多少组">
    <template #prefix>
      <IconFont icon="jishubiaoqian" :font-size="18" />
    </template>
    <template #suffix> 组 </template>
  </NumInput>
  <NumInput v-model="newAction.amount.count" placeholder="每组多少个">
    <template #prefix>
      <IconFont icon="jishubiaoqian" :font-size="18" />
    </template>
    <template #suffix> 个 </template>
  </NumInput>
</template>

<script lang="ts" setup>
import { IconFont } from '@/components';
import NumInput from '../NumInput.vue';
import { BaseAction } from '@/models';
import { inject } from 'vue';

// 确定 newAction 不会是 undefined
const newAction = inject('newAction') as BaseAction;
</script>

<style lang="scss"></style>
