<template>
  <div>
    <StepOne v-if="current == 1" />
    <StepTwo v-if="current == 2" />
    <Stephree v-if="current == 3" />
    <StepFour v-if="current == 4" />
    <StepFive v-if="current == 5" />
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import Stephree from "./StepThree.vue";
import StepFour from "./StepFour.vue";
import StepFive from "./StepFive.vue";
defineProps(["current"]);
</script>
<style></style>
