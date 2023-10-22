<template>
  <!--  :visible.sync="$attrs.visible" -->
  <el-drawer
    :title="title"
    :before-close="handleClose"
    :visible.sync="visible"
    :direction="direction"
    ref="drawer"
    :size="size"
  >
    <div class="main">
      <slot name="main"></slot>
    </div>
    <div class="el-drawer__footer">
      <slot name="footer"></slot>
    </div>
    <!-- <template #footer> 123123 </template> -->
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
type TDirection = "ltr" | "rtl" | "ttb" | "btt";
export default defineComponent({
  name: "Drawer",
  // inheritAttrs: false,
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
      type: String as PropType<TDirection>,
      default: "rtl",
    },
    // 默认宽度
    size: {
      type: String || Number,
      default: "30%",
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
