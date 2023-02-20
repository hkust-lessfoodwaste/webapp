<template>
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" :key="$route.fullPath"></component>
  </keep-alive>
</router-view>
</template>

<script setup>
import { Spin } from "ant-design-vue";
import { message } from "ant-design-vue";
import { Slider } from "ant-design-vue";
import { Popover } from "ant-design-vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.color-primary {
  color: #258D52;
}
.bg-color-primary {
  background-color: #258D52;
}
</style>
