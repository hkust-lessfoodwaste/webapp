<template>
  <div class="page">
    <main-header />
    <a-spin :spinning="mealList === null" tip="loading">
      <div class="section flex flex-col">
        <div class="flex justify-between my-1">
          <div class="ring-chart">
            <ring-chart :summary="weeklyHKUST" />
          </div>
          <div class="w-3/5 self-center">
            <div class="font_1 text-lg font-bold">This week’s HKUST:</div>
            <div class="font_1 text-lg">
              {{ weeklyHKUST.overall }}% complete
            </div>
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="ring-chart">
            <ring-chart :summary="weeklyUser" />
          </div>
          <div class="w-3/5 self-center">
            <div class="font_1 text-lg font-bold">This week’s you:</div>
            <div class="font_1 text-lg">{{ weeklyUser.overall }}% complete</div>
          </div>
        </div>
      </div>
      <div class="text-xl font-bold mx-6 my-4">Daily meals</div>
      <div
        class="flex justify-between items-center daily-item my-4"
        :key="i"
        v-for="(item, i) in mealList"
      >
        <div class="flex items-center">
          <img class="food-image" :src="item.pic" />
          <div class="m-4">
            <div class="font_2">{{ item.overall }}% complete</div>
            <div class="font_3">
              {{ timestampToStr(item.timestamp * 1000) }}
            </div>
          </div>
        </div>
        <div class="ring-chart">
          <ring-chart :summary="item" />
        </div>
      </div>
      <div class="fixed bottom-5 right-3 flex-col image-wrapper pos">
        <img
          class="camera-image"
          src="@/assets/camera.svg"
          @click="handleToCreatePage"
        />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import mainHeader from "@/components/mainHeader.vue";
import ringChart from "@/components/ringChart.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import RingChart from "@/components/ringChart.vue";

import axiosRequest from "@/utils/request";
import timestampToStr from "@/utils/utils";
const ringChartPic =
  "https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/63b6ffdc5a7e3f0310ed5cbb/63b7001e5c976b00115e5363/16729375932489265136.png";
const weeklyHKUST = {
  overall: 81,
  vegetable: 88,
  meat: 77,
  rice: 77,
};
const weeklyUser = {
  overall: 87,
  vegetable: 75,
  meat: 88,
  rice: 55,
};
const mealList = ref(null);
const fetchData = async () => {
  let data = await axiosRequest("get", "history", {}, true);
  if (data.error === false) {
    mealList.value = data.result;
  }
};
onMounted(() => {
  fetchData();
});
const router = useRouter();
const handleToCreatePage = () => {
  router.push({
    path: "/create",
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.setting-image {
  width: 7vw;
  height: 7vw;
}
.group {
  padding: 5.128vw 0;
  overflow-y: auto;
}
.section {
  width: 90vw;
  margin: 5vw;
  padding: 3vw 5vw;
  background-color: #ebf4f3;
  border-radius: 5vw;
}
.ring-chart {
  width: 22vw;
  height: 22vw;
}
.font_1 {
  color: #348b7b;
}
.daily-item {
  padding: 1vw 3vw;
  width: 90vw;
  margin-left: 5vw;
  background-color: #ffffff;
  border-radius: 5vw;
  box-shadow: 0px 2.5vw 12vw #0000001a;
}
.food-image {
  border-radius: 2.5vw;
  width: 17vw;
  height: 17vw;
}
.font_2 {
  font-size: 4vw;
  font-weight: bold;
  color: #000000;
}
.font_3 {
  font-size: 3.5vw;
  color: #8f8f8f;
}
.image-wrapper {
  padding: 2vw;
  filter: drop-shadow(0px 1vw 2.5vw #00000040);
  background-color: #348b7b;
  border-radius: 50%;
  width: 20vw;
}
.camera-image {
  width: 16vw;
  height: 16vw;
}
</style>
