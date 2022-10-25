<template>
  <n-space style="display: flex" :wrap="!width < 660"
    ><n-card
      v-for="item in part"
      :key="item.value"
      :title="item.name"
      :style="{
        'min-width':
          outerwidth > 500 ? outerwidth / 2 - 8 + 'px' : outerwidth + 'px',
      }"
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
      ><n-statistic label="Sum" tabular-nums>{{ item.sum }}</n-statistic
      ><n-button
        :disabled="item.running || item.finnished"
        @click="shuttle(item.value)"
        >投掷</n-button
      ></n-card
    ><n-card
      ><n-button
        type="info"
        dashed
        :disabled="checkIsOk()"
        @click="part.forEach((item) => shuttle(item.value))"
        >全部投掷</n-button
      >
    </n-card></n-space
  >
</template>
<script setup>
import { useMessage } from "naive-ui";
import { useStore } from "../store/store.js";
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
const emit = defineEmits(["next"]);
let part = reactive([]);
const store = useStore();
const message = useMessage();
let timeout = [];
if (store.part[1] == undefined) {
  for (let item of store.part[0]) {
    if (item.selected) {
      part.push(item);
      part[part.length - 1].num = Array(5).fill(0);
      part[part.length - 1].running = false;
      part[part.length - 1].finnished = false;
      part[part.length - 1].sum = 0;
      part[part.length - 1].consider = true;
      part[part.length - 1].loser = false;
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
    let min = 1000;
    for (let item of store.part[1]) {
      if (item.sum < min && item.consider) {
        min = item.sum;
      }
    }
    for (let num in store.part[0]) {
      store.part[0][num].loser = false;
    }
    for (let item of store.part[1]) {
      for (let num in store.part[0]) {
        if (
          store.part[0][num].value == item.value &&
          item.consider &&
          item.sum == min
        ) {
          store.part[0][num].loser = true;
          message.success(item.name + "去拿外卖");
        }
      }
    }

    store.step++;
  } else {
    message.warning("请等待所有人都投掷完毕");
  }
};
onMounted(() => {
  emit("next", next);
});
onUnmounted(() => {
  timeout.forEach((element) => {
    clearTimeout(element);
  });
});
const shuttle = function (value) {
  let item;
  for (item in part) {
    if (part[item].value == value) {
      break;
    }
  }
  if (part[item].finnished || part[item].running) {
    return;
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
  timeout.push(
    setTimeout(() => {
      part[item].running = false;
      part[item].finnished = true;
      part[item].sum =
        part[item].num[0] +
        part[item].num[1] +
        part[item].num[2] +
        part[item].num[3] +
        part[item].num[4];
      store.part[1] = JSON.parse(JSON.stringify(part));
    }, 2000)
  );
};
watch(part, () => {
  for (let item of part) {
    if (item.running || !item.finnished || item.sum == 0) {
      return;
    }
  }
  let min = 1000000;
  let count = 0;
  for (let item in part) {
    if (part[item].sum < min) {
      min = part[item].sum;
    }
  }
  for (let item in part) {
    if (part[item].sum == min) {
      count++;
    }
  }
  console.log(min);
  if (count > 1) {
    message.warning("有多个人最小，需要重新投掷");
    for (let item in part) {
      if (part[item].sum == min) {
        part[item].consider = true;
        part[item].running = false;
        part[item].finnished = false;
        part[item].sum = 0;
        part[item].num.fill(0);
      } else {
        part[item].consider = false;
      }
    }
  }
});
const checkIsOk = function () {
  let count = 0;
  for (let item of part) {
    if (item.finnished || item.running) {
      count++;
    }
  }
  return count == part.length;
};
</script>
<style></style>
