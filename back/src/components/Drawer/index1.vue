<template>
  <!--  :visible.sync="$attrs.visible" -->
  <el-drawer
    :title="title"
    :before-close="handleClose"
    :visible.sync="visible"
    :direction="direction"
    custom-class="demo-drawer"
    ref="drawer"
  >
    <!--  -->
    <slot></slot>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: "rtl",
    },
  },
  setup(props, { emit }) {
    const handleClose = () => {
      emit("update:visible", false);
      emit("handleClose");
    };
    return {
      handleClose,
    };
  },
});
</script>

<style lang="scss" scoped></style>
