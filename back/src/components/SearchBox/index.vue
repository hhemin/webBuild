<template>
  <div class="SearchBox">
    <div id="SearchBoxSlot">
      <slot></slot>
      <el-row type="flex">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleOnSearch"
          v-show="BtnViewStatus('handleOnSearch')"
          size="small"
          >{{ $t("button.select") }}</el-button
        >
        <el-button
          icon="el-icon-refresh"
          @click="handleOnRefresh"
          v-show="BtnViewStatus('handleOnRefresh')"
          size="small"
          plain
          >{{ $t("button.renovate") }}</el-button
        >
        <el-button
          icon="el-icon-download"
          @click="handleOnExportExcel"
          v-show="BtnViewStatus('handleOnExportExcel')"
          size="small"
          plain
          >{{ $t("button.export") }}Excel</el-button
        >
        <template v-if="isChangle"
          ><el-button type="text" @click="handleChange" v-if="is_hide"
            >{{ $t("button.show") }} <i class="el-icon-arrow-down moreBtn"></i>
          </el-button>
          <el-button type="text" @click="handleChange" v-else>
            {{ $t("button.merge") }} <i class="el-icon-arrow-up moreBtn"></i> </el-button
        ></template>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { nextTick } from "process";
import { defineComponent, onMounted, ref, watch } from "vue";
const ISHide = false; // 默认展示所愿选项
export default defineComponent({
  name: "SearchBox",
  props: {
    // 开始默认展开
    ishide: {
      type: Boolean,
      default: ISHide,
    },
    // 第几个后面可以进行隐藏
    num_later: {
      type: Number,
      default: 3,
    },
  },
  setup(props, { emit, listeners }) {
    let is_hide = ref(ISHide);
    const isChangle = ref(false);
    watch(
      () => props.ishide,
      (newval: any) => {
        is_hide.value = newval;
      },
      {
        immediate: true,
      }
    );

    const getDomInfo = () => {
      const box = document.getElementById("SearchBoxSlot");
      const tagbox = box.getElementsByClassName("el-row")[0];
      const children_length = tagbox.children.length || 0; // 获取有多少个兄弟类
      return {
        tagbox,
        children_length,
      };
    };

    onMounted(() => {
      nextTick(() => {
        const { children_length } = getDomInfo();
        isChangle.value = children_length > props.num_later;
      });
    });

    const handleChange = () => {
      const { tagbox, children_length } = getDomInfo();
      if (children_length > props.num_later) {
        for (let i = props.num_later; i < children_length; i++) {
          tagbox.children[i].classList.toggle("none");
        }
      }
      is_hide.value = !is_hide.value;
    };
    // 搜索
    const handleOnSearch = () => {
      emit("handleOnSearch");
    };
    // 刷新
    const handleOnRefresh = () => {
      emit("handleOnRefresh");
    };
    // 导出
    const handleOnExportExcel = () => {
      emit("handleOnExportExcel");
    };
    // 控制按钮展示与隐藏
    const BtnViewStatus = (type: String): boolean => {
      return Boolean(listeners[String(type)]);
    };

    return {
      handleChange,
      handleOnSearch,
      handleOnRefresh,
      handleOnExportExcel,
      BtnViewStatus,
      is_hide,
      isChangle,
    };
  },
});
</script>
<style lang="scss" scoped>
.moreBtn {
  cursor: pointer;
  animation: jump 2s infinite;
}
@keyframes jump {
  0% {
    transform: translate(0px, -5px);
  }
  50% {
    transform: translate(0px, 10px);
  }
  100% {
    transform: translate(0px, -5px);
  }
}
</style>
