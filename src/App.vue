<template>
  <n-layout :native-scrollbar="false">
    <n-layout-header bordered class="underline head" style="display: flex">
      <div
        class="line title"
        :style="{
          'font-size':
            width >= 768 ? 'large' : width > 360 ? 'medium' : 'small',
        }"
      >
        <n-gradient-text type="success">
          {{
            width > 512 ? "超级炫酷的外卖分配系统" : "外卖分配系统"
          }}</n-gradient-text
        >
      </div>
      <n-menu
        class="line menu"
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
    /></n-layout-header>
    <n-layout-content
      :style="{ height: height - 60 - 25 + 'px' }"
      :native-scrollbar="false"
      content-style="padding: 24px;"
      ><n-message-provider>
        <RouterView :width="width" :height="height"
      /></n-message-provider>
    </n-layout-content>
    <n-layout-footer>Copyright © 2022 </n-layout-footer>
  </n-layout>
</template>
<script setup>
import { h, ref, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
const route = useRoute();
// eslint-disable-next-line no-unused-vars
const router = useRouter();
const activeKey = ref("route.name");
const width = ref(document.documentElement.clientWidth);
const height = ref(document.body.offsetHeight);
window.addEventListener("resize", () => {
  width.value = document.documentElement.clientWidth;
  height.value = document.body.offsetHeight;
});
onMounted(() => {
  let a = setInterval(() => {
    if (route.name != undefined) {
      activeKey.value = route.name;
      clearInterval(a);
    }
  }, 10);
});
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
          style: {
            "line-height": "60px",
          },
        },
        { default: () => "主页" }
      ),
    key: "home",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "journal",
          },
          style: {
            "line-height": "60px",
          },
        },
        { default: () => "日志" }
      ),
    key: "journal",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "settings",
          },
          style: {
            "line-height": "60px",
          },
        },
        { default: () => "设置" }
      ),
    key: "settings",
  },
];
</script>
<style scoped>
.line {
  display: inline-flex;
  align-items: center;
}
.title {
  height: 58px;
  line-height: 58px;
  font-weight: bold;
  font-size: v-bind("small");
  padding-left: 7.5%;
}
.menu {
  margin: auto;
  margin-right: 7.5%;
}
.head {
  width: 100%;
}
.underline {
  border-bottom-width: 2px !important;
}
.n-layout-footer {
  display: flex;
  justify-content: center;
}
</style>
<style>
.n-menu-item {
  line-height: 60px;
  height: 60px !important;
}
</style>
