<template>
  <div style="width: 100%; display: flex"></div>
</template>
<script setup>
import { useStore } from "../store/store.js";
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
const emit = defineEmits(["next"]);
const store = useStore();
const part = reactive([]);
const ws = new WebSocket("ws://localhost:2303/ping");
ws.onopen = function () {
  console.log("连接成功");
  ws.send("ping");
};
ws.onmessage = function (e) {
  console.log("收到消息", e.data);
  part.push(e.data);
};

if (store.part[2] == undefined) {
  store.part[0].forEach((item) => {
    if (item.selected) {
      part.push(item);
    }
  });
  store.part[2] = JSON.parse(JSON.stringify(part));
} else {
  store.part[2].forEach((item) => {
    part.push(item);
  });
}
const next = function () {
  store.step++;
};
onMounted(() => {
  emit("next", next);
});
</script>
<style></style>
