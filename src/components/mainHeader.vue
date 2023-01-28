<template>
  <div>
    <div class="flex justify-between header fixed w-full top-0 z-10">
      <span class="text-white text-lg self-center" @click="handleToMainPage"
        >HKUST Food Minus</span
      >
      <div class="self-center" @click="handleToAboutPage">
        <img class="w-6 h-6" src="@/assets/question.svg" />
      </div>
    </div>
    <div style="height: 12vw" />
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const handleToMainPage = () => {
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
  background-color: #348b7b;
  height: 12vw;
}
</style>