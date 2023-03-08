<template>
  <div class="page">
    <a-spin :spinning="isLoading" tip="Sending email">
      <div class="header flex text-center items-center">
        <div class="w-full text-3xl font-bold text-white">HKUST Food Wise</div>
      </div>
      <div class="text-center text-2xl font-bold my-8">Forget Password</div>
      <input type="text" class="input" placeholder="ITSC" v-model="itsc" />
      <div class="btn-group">
        <div
          class="btn primary-btn bg-color-primary font-bold"
          @click="handleSendEmail"
        >
          Verify Email
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const isLoading = ref(false);
const itsc = ref("");
const router = useRouter();
import axiosRequest from "@/utils/request";
import { message } from "ant-design-vue";
const handleSendEmail = async () => {
  if (itsc.value.length === 0) {
    message.error("Please complete all fields");
    return;
  }
  isLoading.value = true;
  let data = await axiosRequest("get", "forget", {
    itsc: itsc.value,
  });
  isLoading.value = false;
  if (data.error === false) {
    router.push({
      path: "/reset-password",
      query: { itsc: itsc.value },
    });
  }
};
</script>

<style>
.page {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.header {
  height: 20vh;
  background: #68b984;
}
.input {
  background: #efefef;
  width: 90vw;
  height: 12vw;
  padding: 0 5vw;
  margin: 2.5vw 5vw;
  border-radius: 4vw;
}
.text-btn {
  margin: 2.5vw 5vw;
}
.btn-group {
  margin-top: 10vw;
}
.btn-group .btn {
  width: 90vw;
  margin: 5vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  border-radius: 4.5vw;
}
.btn-group .primary-btn {
  color: white;
}
.btn-group .secondary-btn {
  background: #ebf4f3;
  color: #68b984;
}
</style>