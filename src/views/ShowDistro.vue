<template>
  <div class="outer">
    <div v-if="width > 660" :style="{ height: height - 60 - 73 + 'px' }">
      <n-space
        :style="{
          'justify-content': width > 600 ? 'center' : 'flex-start',
        }"
      >
        <n-steps
          v-if="width > 600"
          :size="width < 760 ? 'small' : 'medium'"
          :current="current"
          :status="currentStatus"
        >
          <n-step title="选择吃饭人" />
          <n-step title="决定拿饭人" />
          <n-step title="等待送达" />
          <n-step title="准备取餐" />
          <n-step title="完成" />
        </n-steps>
      </n-space>
      <StepSum class="acts" :current="current" />
    </div>
    <n-layout v-else has-sider>
      <n-layout-sider bordered width="115px"
        ><n-space :style="{ height: height - 60 - 73 + 'px' }"
          ><n-steps
            size="small"
            :current="current"
            :status="currentStatus"
            vertical
            class="fix"
          >
            <n-step title="选择吃饭人" />
            <n-step title="决定拿饭人" />
            <n-step title="等待送达" />
            <n-step title="准备取餐" />
            <n-step title="完成" /> </n-steps></n-space
      ></n-layout-sider>
      <n-layout-content :native-scrollbar="false" class="content">
        <StepSum :current="current" />
      </n-layout-content>
    </n-layout>
  </div>
</template>
<script setup>
import StepSum from "../components/StepSum.vue";
import { ref, watch, onMounted } from "vue";
const props = defineProps(["width", "height"]);
const current = ref(1);
const pos = ref("6%");
const currentStatus = ref("process");
watch(props, () => {
  console.log(props.width);
  if (props.width > 1024 && props.width < 1440) {
    pos.value = "15%";
  } else if (props.width >= 1440 && props.width < 1920) {
    pos.value = "23%";
  } else if (props.width >= 1920) {
    pos.value = "30%";
  } else {
    pos.value = "6%";
  }
});
onMounted(() => {
  if (props.width > 1024 && props.width < 1440) {
    pos.value = "15%";
  } else if (props.width >= 1440 && props.width < 1920) {
    pos.value = "23%";
  } else if (props.width >= 1920) {
    pos.value = "30%";
  } else {
    pos.value = "6%";
  }
});
</script>
<style>
.outer {
  height: 100%;
}
.n-layout .n-layout-sider {
  height: 100%;
}
.fix {
  padding-top: 5px;
  padding-left: 5px;
}
.content {
  padding-top: 5px;
  padding-left: 10px;
}
.n-step-splitor {
  width: 20px;
}
.acts {
  padding-top: 20px;
  padding-left: v-bind(pos);
  padding-right: v-bind(pos);
}
</style>
