<template>
  <div><n-space style="display: flex" :wrap="!width < 660"></n-space></div>
</template>
<script setup>
import { useStore } from "../store/store.js";
const store = useStore();
defineProps(["width", "outerwidth"]);
</script>
<style></style>
