<template>
  <div class="page">
    <main-header />
    <a-spin :spinning="isLoading" tip="submitting">
      <input
        ref="uploadFile"
        type="file"
        style="display: none"
        accept="image/*"
        capture="camera"
        name="file"
        @change="handleGetFile"
      />
      <img
        class="pic-preview"
        v-if="picUrl"
        :src="picUrl"
        @click="handleTakePic"
      />
      <div
        class="pic-placehoder flex place-content-center"
        v-else
        @click="handleTakePic"
      >
        <camera-icon class="camera-image place-self-center" />
      </div>
      <div class="input-section">
        <div class="my-1 flex">
          <tableware-icon class="input-icon" fill="" /><span
            >How much food did you finish overall?</span
          >
        </div>
        <div class="w-full text-center">
          <a-radio-group
            v-model:value="percentOverall"
            button-style="solid"
            size="small"
          >
            <a-radio-button value="0">0%</a-radio-button>
            <a-radio-button value="20">20%</a-radio-button>
            <a-radio-button value="40">40%</a-radio-button>
            <a-radio-button value="60">60%</a-radio-button>
            <a-radio-button value="80">80%</a-radio-button>
            <a-radio-button value="100">100%</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="input-section">
        <div class="my-1 flex">
          <rice-icon class="input-icon" fill="#F39221" /><span
            >How much rice/noodle did you finish?</span
          >
        </div>
        <div class="w-full text-center">
          <a-radio-group
            v-model:value="percentRice"
            button-style="solid"
            size="small"
          >
            <a-radio-button value="0">0%</a-radio-button>
            <a-radio-button value="20">20%</a-radio-button>
            <a-radio-button value="40">40%</a-radio-button>
            <a-radio-button value="60">60%</a-radio-button>
            <a-radio-button value="80">80%</a-radio-button>
            <a-radio-button value="100">100%</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="input-section">
        <div class="my-1 flex">
          <vege-icon class="input-icon" fill="#68A885" /><span
            >How much vegetable did you finish?</span
          >
        </div>
        <div class="w-full text-center">
          <a-radio-group
            v-model:value="percentVegetable"
            button-style="solid"
            size="small"
          >
            <a-radio-button value="0">0%</a-radio-button>
            <a-radio-button value="20">20%</a-radio-button>
            <a-radio-button value="40">40%</a-radio-button>
            <a-radio-button value="60">60%</a-radio-button>
            <a-radio-button value="80">80%</a-radio-button>
            <a-radio-button value="100">100%</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="input-section">
        <div class="my-1 flex">
          <meat-icon class="input-icon" fill="#A81E2D" /><span
            >How much meat did you finish?</span
          >
        </div>
        <div class="w-full text-center">
          <a-radio-group
            v-model:value="percentMeat"
            button-style="solid"
            size="small"
          >
            <a-radio-button value="0">0%</a-radio-button>
            <a-radio-button value="20">20%</a-radio-button>
            <a-radio-button value="40">40%</a-radio-button>
            <a-radio-button value="60">60%</a-radio-button>
            <a-radio-button value="80">80%</a-radio-button>
            <a-radio-button value="100">100%</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="text-gray-400 text-sm mx-6">
        * For Not Applicable food type (i.e., not in your meal), please select
        100%
      </div>
      <div
        class="btn m-auto text-white text-center font-bold"
        @click="handleSubmit"
      >
        Submit
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import mainHeader from "@/components/mainHeader.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosRequest from "@/utils/request";
import { message } from "ant-design-vue";
import cameraIcon from "@/assets/camera.svg";
import riceIcon from "@/assets/rice_icon.svg";
import meatIcon from "@/assets/meat_icon.svg";
import vegeIcon from "@/assets/vege_icon.svg";
import tablewareIcon from "@/assets/tableware_icon.svg";
const percentOverall = ref();
const percentRice = ref();
const percentVegetable = ref();
const percentMeat = ref();
const picUrl = ref();
let compressedPic = null;
const uploadFile = ref(null);
const isLoading = ref(false);
const handleTakePic = () => {
  uploadFile.value.click();
};
const handleGetFile = async (e) => {
  let file = e.target.files[0];
  const compressedFile = await compressImage(file, {
    quality: 1,
    type: "image/jpeg",
  });
  picUrl.value = URL.createObjectURL(file);
  compressedPic = compressedFile;
};

const compressImage = async (file, { quality = 1, type = file.type }) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();

    fileReader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.style.imageOrientation = "from-image";
      image.onload = async function (ev) {
        let { width, height } = image;
        let maxWidth = 400,
          maxHeight = 400;
        let targetWidth = width,
          targetHeight = height;
        // 图片尺寸超过400x400的限制
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            //更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (height / width));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (width / height));
          }
        }
        var canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, type, quality)
        );
        resolve(
          new File([blob], file.name, {
            type: blob.type,
          })
        );
      };
    };
    fileReader.readAsDataURL(file);
  });
};
const router = useRouter();
const handleSubmit = async () => {
  if (compressedPic === null) {
    message.error("Please take a photo first");
    return;
  }
  if (
    !percentRice.value ||
    !percentVegetable.value ||
    !percentMeat.value ||
    !percentOverall.value
  ) {
    message.error("Please input your completeness");
    return;
  }
  isLoading.value = true;
  let bodyFormData = new FormData();
  bodyFormData.append("pic", compressedPic);
  bodyFormData.append("rice", Number(percentRice.value));
  bodyFormData.append("vegetable", Number(percentVegetable.value));
  bodyFormData.append("meat", Number(percentMeat.value));
  bodyFormData.append("overall", Number(percentOverall.value));
  let data = await axiosRequest("post", "feedback", bodyFormData, true, {
    "Content-Type": "multipart/form-data",
  });
  isLoading.value = false;
  if (data.error === false) {
    message.success("successfully submitted!");
    if (data.result.new_badge) {
      message.success("🎉You got new a badge!🎉", 10);
    }
    router.push({
      name: "Home",
      params: { needReload: true },
    });
    percentOverall.value = null;
    percentRice.value = null;
    percentVegetable.value = null;
    percentMeat.value = null;
    picUrl.value = null;
    compressedPic = null;
  }
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
}
.pic-preview {
  width: 90vw;
  height: 90vw;
  margin: 5vw;
  border-radius: 5vw;
  object-fit: cover;
}
.pic-placehoder {
  width: 90vw;
  height: 90vw;
  margin: 5vw;
  background-color: #d8d8d8;
  border-radius: 5vw;
}
.btn {
  width: 90vw;
  height: 12vw;
  line-height: 12vw;
  margin: 10vw 5vw;
  border-radius: 5vw;
  background-color: #258d52;
}
.camera-image {
  width: 16vw;
  height: 16vw;
}
.input-section {
  width: 90vw;
  margin: 2vw 5vw;
}
.input-icon {
  width: 1rem;
  height: 1rem;
  margin: 0.5vw 1vw;
  align-self: center;
}
</style>
