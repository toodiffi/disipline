<template>
  <nut-swipe class="action">
    <div class="left">
      <div class="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <div class="title-desc">
        <div class="title">{{ title }}</div>
        <div class="desc">{{ desc }}</div>
      </div>
    </div>
    <template #right>
      <div class="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </div>
    </template>
  </nut-swipe>
</template>

<script lang="ts" setup>
defineProps({
  desc: String,
  title: String
});
</script>

<style lang="scss">
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // height: 70px;
  padding: 5px 15px;
  // 不加的话宽度就是 父级的宽度 + padding
  box-sizing: border-box;
  // border-bottom: 1px solid #dddada;
  margin-bottom: 5px;
  background: #ffffff;
  box-shadow: 0 1px 7px #edeef1;

  &:last-child {
    border-bottom: unset;
    margin-bottom: 0;
  }
  .left {
    @include center;
    .prefix {
      width: 40px;
      height: 40px;
      @include center;
    }
    .title-desc {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .title {
        font-family: Poppins-Medium;
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        color: $black;
      }
      .desc {
        margin-top: 5px;
        font-family: Poppins-Regular;
        font-size: 11px;
        font-weight: normal;
        line-height: 15px;
        color: $gray1;
      }
    }
  }
  .suffix {
    height: 100%;
  }
}
</style>
