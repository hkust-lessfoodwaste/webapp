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
      <div class="slider-section">
        <div>How much food did you finish overall?</div>
        <div class="flex justify-between">
          <input
            type="range"
            min="1"
            max="100"
            v-model="percentOverall"
            class="slider overall place-self-center"
          />
          <div>{{ percentOverall }}%</div>
        </div>
      </div>
      <div class="slider-section">
        <div>How much rice/noodle did you finish?</div>
        <div class="flex justify-between">
          <input
            type="range"
            min="1"
            max="100"
            v-model="percentRice"
            class="slider rice place-self-center"
          />
          <div>{{ percentRice }}%</div>
        </div>
      </div>
      <div class="slider-section">
        <div>How much vegetable did you finish?</div>
        <div class="flex justify-between">
          <input
            type="range"
            min="1"
            max="100"
            v-model="percentVegetable"
            class="slider vegetable place-self-center"
          />
          <div>{{ percentVegetable }}%</div>
        </div>
      </div>
      <div class="slider-section">
        <div>How much meat did you finish?</div>
        <div class="flex justify-between">
          <input
            type="range"
            min="1"
            max="100"
            v-model="percentMeat"
            class="slider meat place-self-center"
          />
          <div>{{ percentMeat }}%</div>
        </div>
      </div>
      <div class="text-gray-400 text-xs mx-6">
        * For not applicable food type, please select 100%
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
import cameraIcon from "@/assets/camera.svg"
const percentOverall = ref(80);
const percentRice = ref(80);
const percentVegetable = ref(80);
const percentMeat = ref(80);
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
      message.success("🎉You got new a badge!🎉");
    }
    router.push({
      path: "/",
    });
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
  background-color: #258D52;
}
.camera-image {
  width: 16vw;
  height: 16vw;
}
.slider-section {
  width: 90vw;
  margin: 5vw;
}
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 85%; /* Full-width */
  height: 0.8rem; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 1rem; /* Set a specific slider handle width */
  height: 1rem; /* Slider handle height */
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 0.8rem; /* Set a specific slider handle width */
  height: 0.8rem; /* Slider handle height */
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
.overall::-webkit-slider-thumb {
  background: #000000;
}
.overall::-moz-range-thumb {
  background: #000000;
}
.rice::-webkit-slider-thumb {
  background: #f48f22;
}
.rice::-moz-range-thumb {
  background: #f48f22;
}
.vegetable::-webkit-slider-thumb {
  background: #67a784;
}
.vegetable::-moz-range-thumb {
  background: #67a784;
}
.meat::-webkit-slider-thumb {
  background: #a81e2d;
}
.meat::-moz-range-thumb {
  background: #a81e2d;
}
</style>
