<template>
  <div :class="['item', type]" @click="$emit('onClick')">
    <div class="left">
      <div class="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <div class="title">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="right">
      <div class="value">
        <slot name="value"></slot>
      </div>
      <div class="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  type: { type: String as () => 'plain' | 'primary', default: 'plain' }
});
</script>

<style lang="scss">
.item {
  width: 100%;
  height: 50px;
  border-radius: 16px;
  box-shadow: unset;
  color: $gray1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  // 不加的话宽度就是 父级的宽度 + padding
  box-sizing: border-box;
  .left,
  .right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &.plain {
    background: $border-color;
  }
  &.primary {
    background: linear-gradient(
      280deg,
      rgba(146, 163, 253, 0.2) -1%,
      rgba(157, 206, 255, 0.2) 124%
    );
  }
  .prefix {
    @include center;
    margin-right: 10px;
  }
  .title {
    font-size: 12px;
    font-weight: normal;
    line-height: 18px;
    letter-spacing: 0px;
    // max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .value {
    margin-left: 5px;
    line-height: 18px;
    font-size: 12px;
    font-weight: normal;
    text-align: right;
    letter-spacing: 0px;
  }
  .suffix {
    @include center;
    margin-left: 10px;
  }
}
</style>
