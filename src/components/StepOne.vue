<template>
  <n-checkbox-group v-model:value="selected">
    <n-space>
      <n-checkbox
        style="display: inline-flex"
        v-for="item in names"
        :key="item.value"
        :value="item.value"
        :label="item.name"
      />
    </n-space>
  </n-checkbox-group>
</template>
<script setup>
import { reactive, ref } from "vue";
const names = reactive([
  { name: "吴刘康", value: "wlk" },
  { name: "曹骏凯", value: "cjk" },
  { name: "魏子炎", value: "wzy" },
  { name: "顾晨", value: "gc" },
]);
const selected = ref(null);
</script>
<style></style>
