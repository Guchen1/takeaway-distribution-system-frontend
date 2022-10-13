<template>
  <n-space>
    <n-space>
      <n-card title="本页面指定" hoverable>
        <n-space vertical>
          <n-checkbox-group v-model:value="selected">
            <n-space>
              <n-checkbox
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
              type="tertiary"
              @click="
                selected.length == 4
                  ? (selected = [])
                  : (selected = ['wlk', 'cjk', 'wzy', 'gc'])
              "
              >{{ selected.length != 4 ? "全选" : "全不选" }}</n-button
            >
            <n-button
              type="primary"
              :style="{ left: selected.length != 4 ? '14px' : '0px' }"
              >提交</n-button
            >
          </n-space>
        </n-space>
      </n-card>
    </n-space>
    <n-card title="经APP收集" hoverable>
      <n-space></n-space>
      <n-space>
        <n-button
          :type="running ? 'error' : 'primary'"
          @click="running = !running"
          >{{ running ? "停止" : "开始" }}</n-button
        >
        <n-button :disabled="subenabled && running">提交</n-button>
      </n-space>
    </n-card>
  </n-space>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
const names = reactive([
  { name: "吴刘康", value: "wlk" },
  { name: "曹骏凯", value: "cjk" },
  { name: "魏子炎", value: "wzy" },
  { name: "顾晨", value: "gc" },
]);
const running = ref(false);
const subenabled = ref(false);
const selected = ref([]);
watch(running, () => {
  if (running.value) {
    subenabled.value = true;
  }
});
</script>
<style scoped>
.blank {
  padding-top: 10px;
}
</style>
