<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <div
    class="dark-mode-switcher cursor-pointer fixed top-0 right-0 box border rounded-full flex items-center justify-center z-50 mt-8 mr-10"
    @click="switchMode"
  >
    <!-- <div>Dark Mode</div> -->
    <div
      :class="{ 'dark-mode-switcher__toggle--active': darkMode }"
      class="dark-mode-switcher__toggle border"
    ></div>
  </div>
  <!-- END: Dark Mode Switcher-->
</template>

<script setup>
import { computed } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import dom from "@left4code/tw-starter/dist/js/dom";

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

const setDarkModeClass = () => {
  darkMode.value
    ? dom("html").addClass("dark")
    : dom("html").removeClass("dark");
};

const switchMode = () => {
  darkModeStore.setDarkMode(!darkMode.value);
  setDarkModeClass();
};

setDarkModeClass();
</script>
