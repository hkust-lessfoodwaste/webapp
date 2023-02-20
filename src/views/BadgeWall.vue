<template>
  <div class="page">
    <main-header />
    <a-spin :spinning="badgeList == null" tip="loading">
      <div class="flex w-screen flex-wrap justify-between">
        <div v-for="item in badgeList" :key="item.id" class="badge my-2">
          <a-popover :title="item.name" placement="bottom">
            <template #content>
              <p>{{ item.desc }}</p>
            </template>
            <img
              class="image m-auto"
              :src="
                badgePrefix +
                item.id +
                (item.progress === 100 ? '_active.png' : '_inactive.png')
              "
            />
            <div class="name text-center text-xs font-bold">
              {{ item.name }}
            </div>
            <div class="progress-bar-outer mx-auto">
              <div
                class="progress"
                :style="
                  'width:' +
                  item.progress * 0.01 * 20 +
                  'vw; background: ' +
                  progressColor(item.progress)
                "
              />
            </div>
            <div class="progress text-center text-xs">
              {{ item.owner_num }} people got this!
            </div>
          </a-popover>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import mainHeader from "@/components/mainHeader.vue";
import axiosRequest from "@/utils/request";
const badgePrefix =
  "https://fyp-smart-canteen.s3.ap-northeast-1.amazonaws.com/badges/";
const badgeList = ref(null);
const fetchData = async () => {
  let badgeData = await axiosRequest("get", "badge", {}, true);
  if (badgeData.error === false) {
    badgeList.value = badgeData.result;
  }
};

onMounted(() => {
  fetchData();
});

const progressColor = (progress) => {
  if (progress === 100) {
    return "#258d52";
  } else if (progress > 80) {
    return "#4ed88a";
  } else if (progress > 60) {
    return "#6dffac";
  } else if (progress > 40) {
    return "#ffaf6d";
  } else if (progress > 20) {
    return "#ff7300";
  } else {
    return "#ff5100";
  }
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
.badge {
  width: 33vw;
}
.badge .image {
  width: 25vw;
  height: 25vw;
}
.badge .progress-bar-outer {
  width: 20vw;
  height: 2.4vw;
  border-radius: 1.2vw;
  background: rgb(238, 238, 238);
  position: relative;
}
.badge .progress-bar-outer .progress {
  background: black;
  position: absolute;
  height: 100%;
  border-radius: 1.2vw;
  bottom: 0;
  left: 0;
}
.badge .name {
  width: 33vw;
}
.badge .progress {
  width: 33vw;
}
</style>