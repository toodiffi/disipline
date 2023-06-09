<template>
  <Action
    v-for="action in actions"
    :key="action.name"
    :desc="action.muscle + ' ' + action.formatterAmount()"
    :title="action.name"
  >
    <template #prefix>
      <IconFont v-if="action.type === ACTION_TYPE.MACHINE" icon="yaling" :font-size="20" />
      <IconFont v-else-if="action.type === ACTION_TYPE.RUNNING" icon="fanshe" :font-size="20" />
      <IconFont v-else icon="jianshen-" :font-size="20" />
    </template>
    <template v-if="showOptions" #suffix>
      <nut-button
        type="danger"
        shape="square"
        style="height: 100%"
        @click="$emit('deleteAction', action)"
        >删除</nut-button
      ><nut-button
        type="info"
        shape="square"
        style="height: 100%"
        @click="$emit('editAction', action)"
        >编辑</nut-button
      >
    </template>
  </Action>
</template>

<script lang="ts" setup>
import { IconFont } from '@/components';
import Action from './Action.vue';

import { BaseAction } from '@/models';
import { ACTION_TYPE } from '@/config';

defineProps({
  actions: {
    type: Array as () => BaseAction[],
    default() {
      return [];
    }
  },
  showOptions: { type: Boolean, default: true }
});
</script>

<style lang="scss"></style>
