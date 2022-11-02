<template>
  <div>
    <div
      :style="{ width: outerwidth + 'px' }"
      style="display: flex; justify-content: center"
    >
      <n-space vertical>
        <n-h1>{{ "等待" + name + "拿外卖" }}</n-h1>
        <n-h2 v-for="item in store.part[3]" :key="item.value"
          >{{ item.num }} <n-h3>{{ item.phone }}</n-h3>
        </n-h2></n-space
      >
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "../store/store.js";
const store = useStore();
const name = ref();
const emit = defineEmits(["next"]);
const next = () => {
  store.step++;
};
store.part[3].forEach((item) => {
  if (item.loser) {
    name.value = item.name;
  }
});

onMounted(() => {
  emit("next", next);
});
defineProps(["width", "height", "outerwidth"]);
</script>
<style></style>
