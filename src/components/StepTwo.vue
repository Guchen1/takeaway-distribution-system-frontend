<template>
  <n-space style="display: flex" :wrap="!width < 660"
    ><n-card
      v-for="item in part"
      :key="item.value"
      :title="item.name"
      :style="{ 'min-width': outerwidth > 500 ? '250px' : outerwidth + 'px' }"
      hoverable
      ><n-statistic label="骰子" tabular-nums>{{
        item.num[0] +
        " " +
        item.num[1] +
        " " +
        item.num[2] +
        " " +
        item.num[3] +
        " " +
        item.num[4]
      }}</n-statistic
      ><n-button
        :disabled="item.running || item.finnished"
        @click="shuttle(item.value)"
        >投掷</n-button
      ></n-card
    ></n-space
  >
</template>
<script setup>
import { useStore } from "../store/store.js";
import { ref, reactive, onMounted } from "vue";
const emit = defineEmits(["next"]);
let part = reactive([]);
const store = useStore();
if (store.part[1] == undefined) {
  for (let item of store.part[0]) {
    if (item.selected) {
      part.push(item);
      part[part.length - 1].num = Array(5).fill(0);
      part[part.length - 1].running = false;
      part[part.length - 1].finnished = false;
      Reflect.deleteProperty(part[part.length - 1], "selected");
    }
  }
  store.part[1] = JSON.parse(JSON.stringify(part));
} else {
  for (let item of store.part[1]) {
    part.push(JSON.parse(JSON.stringify(item)));
  }
}
defineProps(["width", "outerwidth"]);
const next = (store, message) => {
  let ok = true;
  for (let item of store.part[1]) {
    if (!item.finnished || item.running) {
      ok = false;
      break;
    }
  }
  if (ok) {
    store.step++;
  } else {
    message.warning("请等待所有人都投掷完毕");
  }
};
onMounted(() => {
  emit("next", next);
});
const shuttle = function (value) {
  let item;
  for (item in part) {
    if (part[item].value == value) {
      break;
    }
  }
  part[item].running = true;
  const interval = setInterval(() => {
    if (part[item].running) {
      part[item].num = Array(5)
        .fill(0)
        .map(() => Math.floor(Math.random() * 6 + 1));
    } else {
      clearInterval(interval);
    }
  }, 20);
  setTimeout(() => {
    part[item].running = false;
    part[item].finnished = true;
    store.part[1] = JSON.parse(JSON.stringify(part));
  }, 2000);
};
</script>
<style></style>
