<script setup lang="ts">
const qualityLeave = defineModel<number>('qualityLeave')
</script>

<template>
  <div>
    <div>转换等级(等级越高,图片质量越好)</div>
    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px">
      <n-slider v-model:value="qualityLeave" :step="10" />
      <div>{{ qualityLeave }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
