<template>
  <div id="maindiv">
    <n-space style="width: 100%" ref="outer">
      <Transition>
        <StepOne
          :width="width"
          :outerwidth="outerwidth"
          v-if="store.step == 1"
        />
        <StepTwo
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 2"
        />
        <Stephree
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 3"
        />
        <StepFour
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 4"
        />
        <StepFive
          :width="width"
          :outerwidth="outerwidth"
          v-else-if="store.step == 5"
        />
      </Transition>
    </n-space>
    <n-button class="next" @click="store.step++">下一步</n-button>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "../store/store.js";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import Stephree from "./StepThree.vue";
import StepFour from "./StepFour.vue";
import StepFive from "./StepFive.vue";
defineProps(["width"]);
const store = useStore();
const outer = ref(null);
const outerwidth = ref(null);
const detect = function () {
  if (outer.value != null && outer.value != undefined)
    outerwidth.value = outer.value.$el.offsetWidth;
};
onMounted(() => {
  const a = setInterval(() => {
    if (outer.value != null && outer.value != undefined) {
      detect();
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
