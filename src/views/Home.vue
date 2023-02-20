<template>
  <div class="page">
    <main-header />
    <div class="flex justify-between mx-6 mt-4 mb-2">
      <div class="text-lg font-bold">Overview</div>
    </div>
    <div class="section flex flex-col mx-auto">
      <div class="flex justify-between">
        <div class="ring-chart" style="width: 30%">
          <ring-chart :summary="overviewAvgData" />
        </div>
        <div style="width: 70%" class="flex flex-col justify-around">
          <div class="flex justify-between">
            <div>
              <div class="flex">
                <tableware-icon class="summary-icon" />
                <span>Overall</span>
              </div>
              <div class="text-center">
                <span class="font-bold text-xl" v-if="overviewAvgData">{{
                  overviewAvgData.overall
                }}</span
                ><span class="font-bold text-xl" v-else>--</span>
                <span>%</span>
              </div>
            </div>
            <div>
              <div class="flex">
                <rice-icon class="summary-icon" fill="#F39221" />
                <span>Rice</span>
              </div>
              <div class="text-center">
                <span class="font-bold text-xl" v-if="overviewAvgData">{{
                  overviewAvgData.rice
                }}</span
                ><span class="font-bold text-xl" v-else>--</span>
                <span>%</span>
              </div>
            </div>
            <div>
              <div class="flex">
                <vege-icon class="summary-icon" fill="#68A885" /> Vege
              </div>
              <div class="text-center">
                <span class="font-bold text-xl" v-if="overviewAvgData">{{
                  overviewAvgData.vegetable
                }}</span
                ><span class="font-bold text-xl" v-else>--</span>
                <span>%</span>
              </div>
            </div>
            <div>
              <div class="flex">
                <meat-icon class="summary-icon" fill="#A81E2D" /> Meat
              </div>
              <div class="text-center">
                <span class="font-bold text-xl" v-if="overviewAvgData">{{
                  overviewAvgData.meat
                }}</span
                ><span class="font-bold text-xl" v-else>--</span>
                <span>%</span>
              </div>
            </div>
          </div>
          <div class="desc text-xs" v-if="overviewAvgData">
            Average data from
            {{ timestampToShortDateStr(overviewTime.earliest) }} to
            {{ timestampToShortDateStr(overviewTime.latest) }}
          </div>
        </div>
      </div>
      <div class="text-xs text-center compare" v-if="overviewRelativeData">
        You're saving {{ Math.abs(overviewRelativeData.overall) }}%
        {{ overviewRelativeData.overall < 0 ? "below" : "above" }} the average
        of HKUST {{ overviewRelativeData.overall < 0 ? "🥺" : "🥳" }}
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
      <camera-icon class="camera-image" @click="handleToCreatePage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,onUpdated, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import dailyItem from "@/components/dailyItem.vue";
import mainHeader from "@/components/mainHeader.vue";
import ringChart from "@/components/ringChart.vue";
import axiosRequest from "@/utils/request";
import cameraIcon from "@/assets/camera.svg";
import riceIcon from "@/assets/rice_icon.svg";
import meatIcon from "@/assets/meat_icon.svg";
import vegeIcon from "@/assets/vege_icon.svg";
import tablewareIcon from "@/assets/tableware_icon.svg";
import { timestampToShortDateStr } from "@/utils/utils";
const overviewAvgData = ref(null);
const overviewRelativeData = ref(null);
const overviewTime = ref(null);

const badgePrefix =
  "https://fyp-smart-canteen.s3.ap-northeast-1.amazonaws.com/badges/";
const badgeList = ref(null);
const mealList = ref(null);
const mealListLenLimit = 3;

const fetchData = async () => {
  let overviewData = await axiosRequest("get", "overview", {}, true);
  if (overviewData.error === false) {
    overviewAvgData.value = overviewData.result.curr_average;
    overviewRelativeData.value = overviewData.result.relative_average;
    overviewTime.value = overviewData.result.time;
  }
  let mealData = await axiosRequest("get", "history", {}, true);
  if (mealData.error === false) {
    mealList.value = mealData.result;
  }
  let badgeData = await axiosRequest("get", "badge", {}, true);
  if (badgeData.error === false) {
    badgeList.value = badgeData.result;
  }
};

const router = useRouter();
const route = useRoute()
onMounted(() => {
  fetchData();
});
watch(
  () => route.params.needReload,
  async (needReload) => {
    if (needReload) {
      fetchData()
    }
  }
);

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
.summary-icon {
  width: 1rem;
  height: 1rem;
  margin: 0.5vw;
  align-self: center;
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
  position: relative;
}
.section .desc {
  color: gray;
  text-align: right;
  font-style: italic;
}
.section .compare {
  color: #258d52;
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
