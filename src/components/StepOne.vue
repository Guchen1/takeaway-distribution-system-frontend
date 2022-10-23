<template>
  <n-space>
    <n-space style="display: flex" :wrap="!width < 660">
      <n-card
        title="吃"
        hoverable
        :style="{
          width: width < 660 ? outerwidth + 'px' : outerwidth / 2 - 7 + 'px',
        }"
      >
        <TransitionGroup
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
          mode="out-in"
        >
          <n-tag
            style="margin-right: 10px; margin-bottom: 5px"
            :bordered="false"
            v-for="item in namesf(true)"
            :key="item.value"
            :type="types[Math.floor(Math.random() * types.length + 1) - 1]"
            >{{ item.name }}</n-tag
          ></TransitionGroup
        ></n-card
      >
      <n-card
        title="不吃"
        hoverable
        :style="{
          width: width < 660 ? outerwidth + 'px' : outerwidth / 2 - 7 + 'px',
        }"
        ><TransitionGroup
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
          mode="out-in"
          ><n-tag
            style="margin-right: 10px; margin-bottom: 5px"
            :bordered="false"
            v-for="item in namesf(false)"
            :key="item.value"
            :type="types[Math.floor(Math.random() * types.length + 1) - 1]"
            >{{ item.name }}</n-tag
          ></TransitionGroup
        ></n-card
      >
    </n-space>
    <n-space>
      <n-card title="本页面指定" hoverable>
        <n-space vertical>
          <n-checkbox-group v-model:value="selected">
            <n-space>
              <n-checkbox
                :disabled="running"
                style="display: inline-flex"
                v-for="item in names"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              />
            </n-space>
          </n-checkbox-group>
          <n-space class="blank">
            <n-button
              :disabled="running"
              type="tertiary"
              @click="
                selected.length == 4
                  ? (selected = [])
                  : (selected = ['wlk', 'cjk', 'wzy', 'gc'])
              "
              >{{ selected.length != 4 ? "全选" : "全不选" }}</n-button
            >
          </n-space>
        </n-space>
      </n-card>
    </n-space>
    <n-card title="经APP收集" hoverable>
      <n-button
        :type="running ? 'error' : 'primary'"
        @click="running = !running"
        >{{ running ? "停止" : "开始" }}</n-button
      >
      <n-spin
        class="pos"
        :style="{ visibility: running ? 'visible' : 'hidden' }"
        size="small"
      />
    </n-card>
  </n-space>
</template>
<script setup>
import { useStore } from "../store/store.js";
import { reactive, ref, watch, computed, onMounted } from "vue";
const names = reactive([
  { name: "吴刘康", value: "wlk", selected: false },
  { name: "曹骏凯", value: "cjk", selected: false },
  { name: "魏子炎", value: "wzy", selected: false },
  { name: "顾晨", value: "gc", selected: false },
]);
const emit = defineEmits(["next"]);
const types = reactive(["success", "warning", "error", "info"]);
const store = useStore();
defineProps(["width", "outerwidth"]);
const running = ref(false);
const subenabled = ref(false);
const selected = ref([]);
const next = function (store, message) {
  console.log(store.selected);
  if (store.selected.length <= 1) {
    message.warning("请至少选择两个人");
  } else {
    store.step++;
  }
};
watch(running, () => {
  if (running.value) {
    subenabled.value = true;
  }
});
watch(selected, () => {
  for (let item in names) {
    names[item].selected = selected.value.includes(names[item].value);
  }
});
if (store.part[0] == undefined) {
  store.part[0] = JSON.parse(JSON.stringify(names));
} else {
  for (let item in names) {
    names[item].selected = store.part[0][item].selected;
  }
  selected.value = JSON.parse(JSON.stringify(store.selected));
}

watch(names, () => {
  store.part[0] = JSON.parse(JSON.stringify(names));
  store.selected.length = 0;
  JSON.parse(JSON.stringify(selected.value)).forEach((element) => {
    store.selected.push(element);
  });
});
const namesf = computed(() => {
  return (a) => {
    return names.filter((item) => item.selected == a);
  };
});

onMounted(() => {
  emit("next", next);
});
</script>
<style scoped>
.blank {
  padding-top: 10px;
}
.pos {
  position: relative;
  top: 8px;
  left: 8px;
}
.n-card__content {
  padding: 0;
}
</style>
