<template>
  <div style="width: 100%">
    <div
      v-for="(item, index) in part"
      :style="{ width: outerwidth + 'px' }"
      :key="item.value"
    >
      <n-h3
        prefix="bar"
        style="left: 15px; position: relative"
        align-text
        type="info"
      >
        <n-text type="info">
          {{ item.name }}
        </n-text>
      </n-h3>
      <n-h4 style="line-height: 34px"
        >{{ item.reached ? item.num : "等待送达"
        }}<n-button
          @click="quick(index)"
          :disabled="!item.reached"
          v-if="!item.loser"
          type="error"
          style="position: absolute; right: 10px"
          >{{ item.reached ? "急急急急" : "你先别急" }}</n-button
        ></n-h4
      >
    </div>
  </div>
</template>
<script setup>
import { useStore } from "../store/store.js";
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
const emit = defineEmits(["next"]);
defineProps(["width", "height", "outerwidth"]);
const store = useStore();
const part = reactive([]);
let ws = new WebSocket("ws://localhost:2303/ping");
ws.onopen = function () {
  console.log("连接成功");
  ws.send("ping");
};
ws.onmessage = function (e) {
  let x = JSON.parse(e.data);
  part.forEach((item) => {
    if (item.value == x.value) {
      item.num = x.num;
      item.phone = x.phone;
      item.reached = true;
    }
  });
  store.part[2] = JSON.parse(JSON.stringify(part));
};
const quick = (index) => {
  store.part[1].forEach((item, i) => {
    if (item.value == part[index].value) {
      store.part[1].splice(i, 1);
    } else {
      item.num.fill(0);
      item.sum = 0;
      item.finnished = false;
      item.loser = false;
    }
  });
  part.splice(index, 1);
  store.part[2] = JSON.parse(JSON.stringify(part));
  store.step--;
};
const check = setInterval(() => {
  if (ws.readyState == 4) {
    try {
      ws = new WebSocket("ws://localhost:2303/ping");
    } catch (e) {
      console.log("连接失败");
    }
  }
}, 1000);
if (store.part[2] == undefined) {
  store.part[0].forEach((item) => {
    if (item.selected) {
      part.push(JSON.parse(JSON.stringify(item)));
      part[part.length - 1].reached = false;
      part[part.length - 1].num = null;
    }
  });
  store.part[2] = JSON.parse(JSON.stringify(part));
} else {
  store.part[2].forEach((item) => {
    part.push(item);
  });
}
const next = function () {
  store.part[3] = Array();
  part.forEach((item) => {
    let tmp = {};
    tmp.name = item.name;
    tmp.value = item.value;
    tmp.num = item.num;
    tmp.phone = item.phone;
    store.part[3].push(JSON.parse(JSON.stringify(tmp)));
  });
  store.step++;
};
watch(part, () => {
  let count = 0;
  part.forEach((item) => {
    if (item.reached) {
      count++;
    }
  });
  if (count == part.length) {
    setTimeout(() => {
      next();
    }, 1000);
  }
});
onMounted(() => {
  emit("next", next);
});
onUnmounted(() => {
  clearInterval(check);
  ws.close();
});
</script>
<style></style>
