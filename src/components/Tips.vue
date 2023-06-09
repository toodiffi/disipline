<template>
  <div class="reminder">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.reminder {
  margin: 10px 0;
  font-family: Poppins-Regular;
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: $gray2;
}
</style>
