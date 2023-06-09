<template>
  <!-- 加上 scroll-with-animation 这个属性后才能自动滚动到指定位置 -->
  <scroll-view
    class="home-date-box"
    :scroll-x="true"
    :scroll-into-view="'week-' + todyDate.dayOfWeek"
    :scroll-with-animation="true"
    :show-scrollbar="false"
    :enhanced="true"
    style="width: 100%"
  >
    <div
      class="home-date"
      v-for="week in weeks"
      :id="'week-' + week"
      :key="week"
      :class="{ active: todyDate.dayOfWeek === week }"
    >
      <div class="week">{{ WEEK_EN[week] }}</div>
      <div class="date">{{ WEEK_ZH[week] }}</div>
    </div>
  </scroll-view>
</template>

<script lang="ts" setup>
import { ScrollView } from '@tarojs/components';
import { getDate } from '@/utils';
import { weeks, WEEK_EN, WEEK_ZH } from '@/config';

const todyDate = getDate();
</script>

<style lang="scss">
.home-date-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  white-space: nowrap;
  .home-date {
    display: inline-block;
    width: 60px;
    height: 80px;
    border-radius: 10px;
    background: $border-color;
    text-align: center;
    color: $gray1;
    margin-left: 15px;
    &:last-child {
      margin-right: 15px;
    }
    .week {
      margin-top: 15px;
      font-family: Inter-Regular;
      font-size: 12px;
      font-weight: normal;
      line-height: 21px;
    }
    .date {
      margin-top: 10px;
      font-family: Inter-Medium;
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
    }
    &.active {
      background: linear-gradient(325deg, $blue1 0%, $blue2 128%);
      color: $white;
    }
  }
}
</style>
