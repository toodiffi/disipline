<template>
  <div>
    <calendar class="calendar" :config="config" :afterCalendarRender="afterCalendarRender" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { getCurrentInstance, useDidShow } from '@tarojs/taro';

import { useStore } from '@/store';

const config = reactive({
  multi: true // 是否开启多选,
});

const store = useStore();
const calendar = ref();

useDidShow(() => {
  setTimeout(() => {
    afterCalendarRender();
  }, 500);
});

const afterCalendarRender = () => {
  if (!calendar.value) {
    const { page } = getCurrentInstance();
    // @ts-ignore
    calendar.value = page.selectComponent('.calendar')?.calendar;
  }
  const toSet = store.completeStatus?.map(item => {
    const [year, month, day] = item.date.split('-');
    return {
      year,
      month,
      date: day
    };
  });
  if (calendar.value) {
    calendar.value.cancelSelectedDates();
    calendar.value.setSelectedDates(toSet);
  }
};

store.$subscribe((mutation, state) => {
  afterCalendarRender();
});
</script>

<style lang="scss"></style>
