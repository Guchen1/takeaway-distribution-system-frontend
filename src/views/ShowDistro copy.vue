<template>
  <n-config-provider
    :breakpoints="{ xs: 0, s: 720, m: 1024, l: 1280, xl: 1536, xxl: 1920 }"
    ><div class="outer">
      <n-grid cols="xs:1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="吃饭"> 卡片内容 </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </n-config-provider>
</template>
<script setup></script>
<style>
.outer {
  padding-left: 5%;
  padding-right: 6%;
}
</style>
