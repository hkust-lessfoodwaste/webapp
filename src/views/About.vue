<template>
  <div class="page">
    <main-header />
    <div class="m-4">
      <div class="text-lg font-bold">What is this website for?</div>
      <div class="ml-2">
        The website is built for the campaign that promotes behavioural change
        for food waste reduction. HKUST members who persist recording "clean
        plate" on the website during the campaign will receive rewards.
      </div>
      <div class="text-lg font-bold">
        How to use this website and get my reward?
      </div>
      <div class="ml-2">
        <div>1. Make sure you register with your own ITSC.</div>
        <div>
          2. Everytime finishing your food, press the camera button, take a
          photo of the clean plate, and use the sliders to input how much you
          finish. Finally, press the submit button.
        </div>
        <div>
          3. Your inputs and photo will be shown on your main page if it is
          successfully submitted.
        </div>
        <div>
          4. <b>Persist for two weeks!</b> When the campaign is over, we will
          contact the qualified participants with quality inputs through email.
        </div>
      </div>
      <div class="text-lg font-bold">Privacy Policies</div>
      <div class="ml-2">TBD</div>
    </div>
    <div class="btn primary-btn font-bold" @click="handleLogout">Logout</div>
  </div>
</template>
<script setup>
import mainHeader from "@/components/mainHeader.vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();
const handleLogout = () => {
  message.success("logged out");
  localStorage.removeItem("food_minus_app");
  router.push({
    path: "/login",
  });
};
</script>
<style scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20vw;
}
.btn {
  width: 90vw;
  margin: 5vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  border-radius: 4.5vw;
}
.primary-btn {
  background: #348b7b;
  color: white;
}
</style>