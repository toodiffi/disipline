<template>
  <TextInput
    v-model="newAction.name"
    class="nut-input-text"
    placeholder="请输入训练动作"
    type="text"
  >
    <template #prefix>
      <IconFont icon="icon_rename" :font-size="18" />
    </template>
  </TextInput>
  <TextInput
    v-model="newAction.muscle"
    class="nut-input-text"
    placeholder="请输入训练部位"
    type="text"
  >
    <template #prefix>
      <IconFont icon="jirou1" :font-size="18" />
    </template>
  </TextInput>
</template>

<script lang="ts" setup>
import { BaseAction } from '@/models';
import { inject } from 'vue';

import { IconFont } from '@/components';
import TextInput from '../TextInput.vue';

// 确定 newAction 不会是 undefined
const newAction = inject('newAction') as BaseAction;
</script>

<style lang="scss"></style>
