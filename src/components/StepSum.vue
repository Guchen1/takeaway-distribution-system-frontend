<template>
  <div id="maindiv">
    <n-space
      style="width: 100%"
      :style="{
        'min-height': height - 260 - 25 + 'px',
      }"
      ref="outer"
      ><n-scrollbar
        :trigger="
          /(iPhone|iPad|iPod|iOS|Android)/i.test(agent) ? 'hover' : 'hover'
        "
        style="width: 100%"
        :style="{
          'max-height':
            width < 660 ? mainheight - 52 + 'px' : mainheight - 62 + 'px',
        }"
      >
        <Transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
        >
          <StepOne
            @next="(n) => (next[0] = n)"
            :width="width"
            :outerwidth="outerwidth"
            v-if="store.step == 1 && seen"
          />
          <StepTwo
            @next="(n) => (next[1] = n)"
            :width="width"
            :outerwidth="outerwidth"
            v-else-if="store.step == 2 && seen"
          />
          <Stephree
            @next="(n) => (next[2] = n)"
            :width="width"
            :outerwidth="outerwidth"
            v-else-if="store.step == 3 && seen"
          />
          <StepFour
            @next="(n) => (next[3] = n)"
            :width="width"
            :outerwidth="outerwidth"
            v-else-if="store.step == 4 && seen"
          />
          <StepFive
            @next="(n) => (next[4] = n)"
            :width="width"
            :outerwidth="outerwidth"
            v-else-if="store.step == 5 && seen"
          />
        </Transition>
      </n-scrollbar>
    </n-space>
    <n-space>
      <n-button
        v-if="store.step == 2 && store.part[2] == undefined"
        class="next"
        @click="back"
        :disabled="isRunning"
        >返回</n-button
      >
      <n-button
        class="next"
        @click="nextFun"
        :disabled="isRunning"
        v-if="store.step != 3"
        >下一步</n-button
      ><n-spin v-else size="small"
    /></n-space>
  </div>
</template>
<script setup>
import { useMessage } from "naive-ui";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "../store/store.js";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import Stephree from "./StepThree.vue";
import StepFour from "./StepFour.vue";
import StepFive from "./StepFive.vue";
defineProps(["width", "height"]);
const next = ref(Array(5).fill(null));
const store = useStore();
const outer = ref(null);
const agent = ref(navigator.userAgent);
const outerwidth = ref(null);
const outerheight = ref(null);
const message = useMessage();
const mainheight = ref(0);
const seen = ref(false);

const isRunning = ref(false);
const detect = function () {
  if (outer.value != null && outer.value != undefined) {
    outerwidth.value = outer.value.$el.offsetWidth;
    outerheight.value = outer.value.$el.offsetHeight;
    mainheight.value = document.getElementById("maindiv").offsetHeight;
  }
};
const back = function () {
  let old = store.step;
  isRunning.value = true;
  store.part[old - 1] = undefined;
  setTimeout(() => {
    isRunning.value = false;
  }, 1100);
  store.step--;
};
const nextFun = function () {
  isRunning.value = true;

  setTimeout(() => {
    isRunning.value = false;
  }, 1100);

  next.value[store.step - 1](store, message);
};
onMounted(() => {
  const a = setInterval(() => {
    if (outer.value != null && outer.value != undefined) {
      detect();
      seen.value = true;
      clearInterval(a);
    }
  }, 10);
  window.addEventListener("resize", detect);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", detect);
});
</script>
<style scoped>
#maindiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.next {
  display: flex;
  margin-top: 12px;
  margin-bottom: 6px;
}
</style>
