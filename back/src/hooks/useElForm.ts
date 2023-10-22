import { ref, reactive, nextTick } from "vue";
import router from "@/router";
import { Form as ElForm } from "element-ui";
import { cloneDeep } from "lodash";

interface Props {
  [key: string]: any;
}

export function usePageParams() {
  const { meta, query } = router.currentRoute;
  // location
  const isView = query.id && query.type === "view"; // 查看详情，整个表单处于关闭状态
  const isEdit = query.id && query.type === "edit"; // 编辑详情，部分输入框不可编辑
  const isHidden = isView || isEdit; // 查看、编辑，输入框不显示

  // 返回页面，默认是activeMenu
  function backPage(query?: Record<string, any>, path?: string) {
    router.push({
      path: path || meta.activeMenu,
      query: query ? { ...query } : {},
    });
  }

  // 跳转页面
  function skipPage(path: string, query: Record<string, any>) {
    router.push({
      path,
      query: { ...query },
    });
  }

  return {
    meta,
    query,
    isView,
    isEdit,
    isHidden,
    backPage,
    skipPage,
  };
}

export function useElForm(model: Props, rules = {}) {
  // Form
  const elForm = ref<ElForm | null>(null);

  const initalModel = cloneDeep(model);
  const formModel = ref(initalModel);
  const formRules = reactive(rules);

  const isSubmitLoading = ref(false);

  // 校验表单
  function validate() {
    return new Promise((resolve, reject) => {
      // (elForm.value as ElForm).validate((valid) => {
      elForm.value.validate((valid) => {
        resolve(valid);
      });
    });
  }

  // 移除表单校验结果
  function clearValidate() {
    // @ts-ignore 注释忽略
    nextTick(() => {
      elForm.value.clearValidate();
    });
  }

  // 重置表单
  function resetFields(keepModel?: Props) {
    if (elForm.value) {
      elForm.value.resetFields();
    }
    if (keepModel) {
      return Object.assign(formModel, {
        ...initalModel,
        ...keepModel,
      });
    }
  }

  return { elForm, formModel, formRules, isSubmitLoading, validate, clearValidate, resetFields };
}
