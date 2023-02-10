<template>
  <div class="page">
    <main-header />
    <div class="flex justify-between mx-6 mt-4 mb-2">
      <div class="text-lg font-bold">Community overview</div>
    </div>
    <div class="section flex flex-col mx-auto">
      <div class="flex justify-between my-1">
        <div class="ring-chart">
          <ring-chart :summary="weeklyHKUST" :legend="true"/>
        </div>
        <div class="self-center" style="width: 45vw">
          <div class="color-primary text-lg font-bold">This week’s HKUST:</div>
          <div class="color-primary text-lg">
            {{ weeklyHKUST.overall }}% complete
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mx-6 mt-4 mb-2">
      <div class="text-lg font-bold">My badge wall</div>
      <div class="color-primary self-center" @click="handleToBadgePage">
        show more
      </div>
    </div>

    <a-spin :spinning="badgeList === null" tip="loading">
      <div class="section mx-auto">
        <div class="flex">
          <img
            class="badge-image mx-2"
            v-for="item in badgeList"
            :key="item.id"
            :src="
              badgePrefix +
              item.id +
              (item.progress === 100 ? '_active.png' : '_inactive.png')
            "
          />
        </div>
      </div>
    </a-spin>
    <a-spin :spinning="mealList === null" tip="loading">
      <div class="flex justify-between mx-6 mt-4">
        <div class="text-lg font-bold">My history</div>
        <div
          class="color-primary self-center"
          @click="handleToHistoryPage"
          v-if="mealList && mealList.length > mealListLenLimit"
        >
          show more
        </div>
      </div>
      <div v-if="mealList && mealList.length">
        <div
          class="flex justify-between items-center"
          :key="i"
          v-for="(item, i) in mealList.slice(0, mealListLenLimit)"
        >
          <daily-item :data="item" />
        </div>
      </div>
      <div v-else class="m-4 text-center">
        Share your action and earn badges now 💪
      </div>
    </a-spin>
    <div class="fixed bottom-5 right-3 flex-col image-wrapper pos">
      <camera-icon
        class="camera-image"
        @click="handleToCreatePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dailyItem from "@/components/dailyItem.vue";
import mainHeader from "@/components/mainHeader.vue";
import ringChart from "@/components/ringChart.vue";
import axiosRequest from "@/utils/request";
import cameraIcon from "@/assets/camera.svg"

const weeklyHKUST = {
  overall: 81,
  vegetable: 88,
  meat: 77,
  rice: 77,
};

const badgePrefix =
  "https://fyp-smart-canteen.s3.ap-northeast-1.amazonaws.com/badges/";
const badgeList = ref(null);
const mealList = ref(null);
const mealListLenLimit = 3;
const fetchData = async () => {
  let mealData = await axiosRequest("get", "history", {}, true);
  if (mealData.error === false) {
    mealList.value = mealData.result;
  }
  let badgeData = await axiosRequest("get", "badge", {}, true);
  if (badgeData.error === false) {
    badgeList.value = badgeData.result;
  }
};

onMounted(() => {
  fetchData();
});
const router = useRouter();
const handleToHistoryPage = () => {
  router.push({
    name: "History",
  });
};
const handleToCreatePage = () => {
  router.push({
    name: "Create",
  });
};
const handleToBadgePage = () => {
  router.push({
    name: "BadgeWall",
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
  background: #fafafa;
}
.setting-image {
  width: 7vw;
  height: 7vw;
}
.section {
  width: 90vw;
  padding: 3vw;
  background-color: #ebf4f3;
  border-radius: 5vw;
  overflow: scroll;
}
.ring-chart {
  width: 25vw;
  height: 22vw;
}
.badge-image {
  width: 12vw;
  height: 12vw;
}
.image-wrapper {
  padding: 2vw;
  filter: drop-shadow(0px 1vw 2.5vw #00000040);
  background-color: #258d52;
  border-radius: 50%;
  width: 20vw;
}
.camera-image {
  width: 16vw;
  height: 16vw;
}
</style>
