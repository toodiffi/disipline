<template>
  <i :class="['iconfont', `icon-${icon}`]" :style="{ fontSize: fontSize + 'px' }" />
</template>

<script lang="ts" setup>
defineProps({
  icon: { type: String, required: true },
  fontSize: Number
});
</script>

<style lang="scss"></style>
