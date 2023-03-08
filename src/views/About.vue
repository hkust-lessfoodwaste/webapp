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
          photo of the clean plate, and input how much you complete. Finally,
          press the submit button.
        </div>
        <div>
          3. Your inputs and photo will be shown on your main page if it is
          successfully submitted.
        </div>
        <div>
          4. <b>Try to get all badges on the badge wall!</b> If you get the
          "Final award" badge, you will receive the final reward after the
          campaign.
        </div>
      </div>
      <div class="text-lg font-bold">Contact us</div>
      <div class="ml-2">
        <a href="mailto: smartcanteen@ust.hk">smartcanteen@ust.hk</a>
      </div>
    </div>
    <div class="flex justify-around">
      <a href="https://ssc.ust.hk/" class="w-5/12 self-center" target="_blank"
        ><img class="w-full object-contain" src="@/assets/SSC_logo.png"
      /></a>
      <a href="http://vis.cse.ust.hk/" class="w-5/12 self-center" target="_blank"
        ><img class="w-full object-contain" src="@/assets/vislab_logo.png"
      /></a>
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
  background: #258d52;
  color: white;
}
</style>