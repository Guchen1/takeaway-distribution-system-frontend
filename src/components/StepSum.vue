<template>
  <div id="maindiv">
    <n-space style="width: 100%" ref="outer">
      <Transition
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
        mode="out-in"
      >
        <StepOne
          @next="(n) => (next = n)"
          :width="width"
          :outerwidth="outerwidth"
          v-if="store.step == 1 && seen"
        />
        <StepTwo
          @next="(n) => (next = n)"
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 2 && seen"
        />
        <Stephree
          @next="(n) => (next = n)"
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 3 && seen"
        />
        <StepFour
          @next="(n) => (next = n)"
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 4 && seen"
        />
        <StepFive
          @next="(n) => (next = n)"
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 5 && seen"
        />
      </Transition>
    </n-space>
    <n-button class="next" @click="next != null ? next(store, message) : null"
      >下一步</n-button
    >
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
defineProps(["width"]);
const next = ref(null);
const store = useStore();
const outer = ref(null);
const outerwidth = ref(null);
const message = useMessage();
const seen = ref(false);
const detect = function () {
  if (outer.value != null && outer.value != undefined)
    outerwidth.value = outer.value.$el.offsetWidth;
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
