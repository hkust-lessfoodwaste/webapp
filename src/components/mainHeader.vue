<template>
  <div>
    <div class="flex justify-between header fixed w-full top-0 z-10">
      <span class="text-lg font-bold self-center" @click="handleToHomePage"
        >HKUST Food Minus</span
      >
      <div class="self-center" @click="handleToAboutPage">
        <question-icon class="w-6 h-6" />
      </div>
    </div>
    <div style="height: 12vw" />
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import questionIcon from "@/assets/question.svg"
const router = useRouter();
const handleToHomePage = () => {
  router.push({
    path: "/",
  });
};
const handleToAboutPage = () => {
  router.push({
    path: "/about",
  });
};
</script>
<style scoped>
.header {
  padding: 3vw;
  background-color: #2EA762;
  height: 12vw;
  color: white;
  box-shadow: 0px 2.5vw 2vw rgba(49, 49, 49, 0.102)
}
</style>