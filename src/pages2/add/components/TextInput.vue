<template>
  <div class="text-input">
    <div class="input-box">
      <div class="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <nut-input class="input" v-model="value" :placeholder="placeholder" />
    </div>

    <div class="suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['modelValue', 'placeholder']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value.trim());
  }
});
</script>

<style lang="scss">
.text-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 48px;
  margin: 15px 0;
  .input-box {
    width: 100%;
    height: 100%;
    background: $border-color;
    border-radius: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 15px;
    .prefix {
    }
    .input {
      flex: 1;
      margin-left: 10px;
      height: 48px;
      background: unset;
      border-bottom: unset;
      padding: 0;
      input {
        height: 48px;
      }
    }
  }

  .suffix {
    @include center;
    flex-shrink: 0;
    margin-left: 15px;
    width: 48px;
    height: 100%;
    border-radius: 14px;
    background: linear-gradient(317deg, $red1 -1%, $red2 127%);

    font-family: Poppins-Medium;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: $white;
  }
}
</style>
