<template>
  <div>
    <div class="flex justify-between header fixed w-full top-0 z-10">
      <span class="text-lg font-bold self-center" v-if="routerPath === '/'"
        >HKUST Food Minus</span
      >
      <span v-else @click="handleToHomePage">
        <back-icon class="w-6 h-6" />
      </span>
      <span class="text-lg font-bold self-center" v-if="routerPath !== '/'"
        >{{routerTitleMapper[routerPath]}}</span
      >
      <div class="self-center" @click="handleToAboutPage">
        <question-icon class="w-6 h-6" />
      </div>
    </div>
    <div style="height: 12vw" />
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import questionIcon from "@/assets/question.svg";
import backIcon from "@/assets/back.svg";

const routerTitleMapper = {
  "/create": "Record daily meal",
  "/about": "About this app",
  "/history": "My history",
  "/badge": "My badge wall"
}

const router = useRouter();
const routerPath = computed(() => {
  console.log(router.currentRoute.value.path);
  return router.currentRoute.value.path;
});
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
  background-color: #2ea762;
  height: 12vw;
  color: white;
  box-shadow: 0px 2.5vw 2vw rgba(49, 49, 49, 0.102);
}
</style>