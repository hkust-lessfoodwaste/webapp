<template>
  <div class="page">
    <a-spin :spinning="isLoading" tip="Logging in">
      <div class="header flex text-center items-center">
        <div class="w-full text-3xl font-bold text-white">HKUST Food Wise</div>
      </div>
      <div class="text-center text-2xl font-bold my-8">Login</div>
      <input type="text" class="input" placeholder="ITSC" v-model="itsc" />
      <input
        type="password"
        class="input"
        placeholder="password"
        v-model="password"
      />
      <span class="text-btn color-primary" @click="handleToRecover"
        >Forget password?</span
      >
      <div class="btn-group">
        <div
          class="btn primary-btn bg-color-primary font-bold"
          @click="handleLogin"
        >
          Login
        </div>
        <div
          class="btn secondary-btn color-primary font-bold"
          @click="handleToRegister"
        >
          Signup
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosRequest from "@/utils/request";
import { message } from "ant-design-vue";
const itsc = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);
const handleLogin = async () => {
  if (itsc.value.length === 0 || password.value.length === 0) {
    message.error("Please complete all fields");
    return;
  }
  isLoading.value = true;
  let data = await axiosRequest("post", "login", {
    itsc: itsc.value,
    password: password.value,
  });
  isLoading.value = false;
  if (data.error === false) {
    let token = data.result;
    localStorage.setItem(
      "food_minus_app",
      JSON.stringify({ token: token, itsc: itsc.value })
    );
    router.push({
      name: "Home",
      params: { needReload: true },
    });
  }
};
const handleToRegister = () => {
  router.push({
    path: "/register",
  });
};
const handleToRecover = () => {
  router.push({
    path: "/forget-password",
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
