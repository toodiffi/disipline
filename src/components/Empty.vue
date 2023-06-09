<template>
  <div class="empty">
    <nut-empty :description="desc">
      <template #image>
        <img :src="img" />
      </template>
    </nut-empty>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  img: String,
  desc: String
});
</script>

<style lang="scss">
.empty {
  .nut-empty {
    margin-top: 70px;
    &__box {
      width: 141px;
      height: 156px;
    }
    &__description {
      margin-top: 10px;
      font-size: 14px;
      font-weight: normal;
      line-height: 21px;
      letter-spacing: 0px;
      color: #7b6f72;
    }
  }
}
</style>
