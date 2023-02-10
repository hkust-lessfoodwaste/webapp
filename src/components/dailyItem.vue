<template>
  <div>
    <div class="flex justify-between items-center daily-item my-2">
      <div class="flex items-center">
        <img
          class="food-image"
          :src="props.data.pic"
          @click="handlePreviewImage(true)"
        />
        <div class="m-4">
          <div class="font_2">{{ props.data.overall }}% complete</div>
          <div class="font_3">
            {{ timestampToStr(props.data.timestamp * 1000) }}
          </div>
        </div>
      </div>
      <div class="ring-chart">
        <ring-chart :summary="props.data" />
      </div>
    </div>
    <div
      v-if="previewImage"
      class="preview-image"
      @click="handlePreviewImage(false)"
    >
      <img :src="previewImage" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps(["data"]);
import timestampToStr from "@/utils/utils";
import ringChart from "@/components/ringChart.vue";
const previewImage = ref(null);
const handlePreviewImage = (flag) => {
  if (flag) {
    previewImage.value = props.data.pic;
  } else {
    previewImage.value = null;
  }
};
</script>
<style scoped>
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
  object-fit: cover;
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
.ring-chart {
  width: 22vw;
  height: 22vw;
}
.preview-image {
  position: fixed;
  background: black;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
}
.preview-image img {
  height: 100vh;
  object-fit: contain;
}
</style>