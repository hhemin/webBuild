<template>
  <ElDrawer :title="drawerProps.title" :visible.sync="visible" size="500px">
    <el-form
      ref="elForm"
      :model="formModel"
      :rules="formRules"
      size="medium"
      slot="main"
      :hide-required-asterisk="drawerProps.isView"
      label-width="120px"
      v-infinite-scroll
    >
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入姓名" clearable> </el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="formModel.phone" placeholder="请输入联系方式" clearable> </el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="handleOnResetForm">取消</el-button>
      <el-button type="primary" @click="handleOnSubmitForm" :loading="isSubmitLoading"
        >确定</el-button
      >
    </template>
  </ElDrawer>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, watch, ref } from "vue";
import ElDrawer from "@/components/Drawer/index.vue";
import { useElForm } from "@/hooks/index";
import { Message } from "element-ui";

interface FormProps {
  title: string;
  isView: boolean; // 是否查看详情[true]or编辑[false]
  rowData?: any; // 表单数据
  getTableList?: () => Promise<any>; // 重新请求列表
}

// 初始表单
const initialForm = {
  name: "",
  phone: "",
};

// 表单规则
const initalFormRules = {
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "change",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入电话",
      trigger: "change",
    },
  ],
};

export default defineComponent({
  name: "PageForm",
  components: {
    ElDrawer,
  },
  setup() {
    // 控制对话框
    const visible = ref(false);
    const drawerProps = ref<FormProps>({
      isView: false,
      title: "", // 弹出框标题
      rowData: initialForm, // 表单数据
    });
    // 表单
    const { elForm, formModel, formRules, validate, resetFields, isSubmitLoading, clearValidate } =
      useElForm(initialForm, initalFormRules);
    // 接收父组件传过来的参数
    const acceptParams = (params: FormProps): void => {
      drawerProps.value = params;
      visible.value = true;
    };

    // 提交表单
    const handleOnSubmitForm = async () => {
      // 表单校验通过
      if (await validate()) {
        //  TODO
        isSubmitLoading.value = true; // 提交
        let _form = {
          ...formModel.value,
        };
        // updatePrizeConfig 是更新函数，createPrizeConfig 是创建函数
        // Promise.all([_form.id ? updatePrizeConfig(_form) : createPrizeConfig(_form)])
        //   .then((res: IProps) => {
        //     Message.success(res[0].message);
        //     handleCloseDialog(); // 关闭对话框
        //     emit("handleOnRefresh"); // 刷新列表
        //   })
        //   .catch((err) => {
        //     Message.error(res[0].message);
        //   })
        //   .finally(() => {
        //     isSubmitLoading.value = false;
        //   });
      }
    };

    // 重置表单
    const handleOnResetForm = () => {
      // TODO
      visible.value = false;
      resetFields();
    };

    watch(
      () => visible.value,
      (newvalue) => {
        if (newvalue) {
          formModel.value = {
            ...initialForm,
            ...drawerProps.value.rowData, // 传过来的数据
          };
          clearValidate();
          console.log("formModel.value: ", formModel.value);
        }
      },
      { immediate: true }
    );

    return {
      drawerProps,
      acceptParams,
      elForm,
      formModel,
      formRules,
      initalFormRules,
      isSubmitLoading,
      visible,

      handleOnSubmitForm,
      handleOnResetForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
