<template>
  <div class="page">
    <main-header />
    <a-spin :spinning="mealList == null" tip="loading">
      <div class="w-full h-screen mt-4">
        <div
          class="flex justify-between items-center"
          :key="i"
          v-for="(item, i) in mealList"
        >
          <daily-item :data="item" />
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import dailyItem from "@/components/dailyItem.vue";
import mainHeader from "@/components/mainHeader.vue";
import axiosRequest from "@/utils/request";
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
</style>