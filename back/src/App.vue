<template>
  <div id="app">
    <router-view />
    <service-worker-update-popup />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ServiceWorkerUpdatePopup from "@/pwa/components/ServiceWorkerUpdatePopup.vue";
export default defineComponent({
  name: "App",
  components: {
    ServiceWorkerUpdatePopup,
  },
  // setup() {
  //   onMounted(() => {});
  // },
});
</script>
