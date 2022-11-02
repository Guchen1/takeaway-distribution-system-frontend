<template>
  <div>5</div>
</template>
<script setup>
import { useStore } from "../store/store.js";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const store = useStore();
const router = useRouter();
store.part = Array(5);
const next = () => {
  store.step = 0;
  router.push("/");
};
const emit = defineEmits(["next"]);
onMounted(() => {
  emit("next", next);
});
</script>
<style></style>
