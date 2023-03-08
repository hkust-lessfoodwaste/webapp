<template>
  <div class="page">
    <a-spin :spinning="isLoading" tip="Verifying">
      <div class="header flex text-center items-center">
        <div class="w-full text-3xl font-bold text-white">HKUST Food Wise</div>
      </div>
      <div class="text-center text-2xl font-bold my-8">Reset Password</div>
      <div class="w-10/12 text-gray-600 m-auto">
        An email with secure code was sent to
        <span class="font-bold">{{ itsc }}@connect.ust.hk</span>. Please check
        your spams if you didn't receive the email.
      </div>
      <input
        type="text"
        class="input"
        placeholder="Secure Code"
        v-model="secureCode"
      />
      <input
        type="password"
        class="input"
        placeholder="New password"
        v-model="password"
      />
      <input
        type="password"
        class="input"
        placeholder="Confirm password"
        v-model="password2"
      />
      <div class="btn-group">
        <div
          class="btn primary-btn bg-color-primary font-bold"
          @click="handleReset"
        >
          Reset password
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axiosRequest from "@/utils/request";
import { message } from "ant-design-vue";
const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const itsc = ref("");
const secureCode = ref("");
const password = ref("");
const password2 = ref("");

onMounted(() => {
  if (!route.query || !route.query.itsc) {
    router.push({ name: "Login" });
  } else {
    itsc.value = route.query.itsc;
  }
});

const handleReset = async () => {
  if (
    itsc.value.length === 0 ||
    secureCode.value.length === 0 ||
    password.value.length === 0 ||
    password2.value.length === 0
  ) {
    message.error("Please complete all fields");
    return;
  }
  if (password.value !== password2.value) {
    message.error("Passwords are not consistent");
    return;
  }
  isLoading.value = true;
  let data = await axiosRequest("post", "reset", {
    itsc: itsc.value,
    code: secureCode.value,
    password: password.value,
  });
  isLoading.value = false;
  if (data.error === false) {
    message.success("password successfully changed!")
    router.push({
      name: "Login",
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