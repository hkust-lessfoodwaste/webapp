<template>
  <div>
    <div class="flex justify-between header fixed w-full top-0 z-10">
      <span class="text-white text-lg self-center" @click="handleToMainPage"
        >HKUST Food Minus</span
      >
      <img class="w-8 h-8 self-center" src="@/assets/setting.svg" />
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
</script>
<style scoped>
.header {
  padding: 3vw;
  background-color: #348b7b;
  height: 12vw;
}
</style>