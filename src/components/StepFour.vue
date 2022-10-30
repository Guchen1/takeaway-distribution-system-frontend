<template>
  <div>
    <div
      :style="{ width: outerwidth + 'px' }"
      style="display: flex; justify-content: center"
    >
      4
    </div>
  </div>
</template>
<script setup>
defineProps(["width", "height", "outerwidth"]);
</script>
<style></style>
