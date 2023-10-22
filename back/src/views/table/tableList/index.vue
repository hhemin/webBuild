<template>
  <div class="common-container">
    <div class="table-box">
      <SearchBox
        class="card table-search"
        @handleOnSearch="handleOnSearch"
        @handleOnExportExcel="handleOnExportExcel"
        @handleOnRefresh="handleOnRefresh"
        :num_later="2"
      >
        <el-form ref="searchForm" :model="searchFormModel" size="medium" label-width="100px">
          <el-row :gutter="30">
            <el-col :span="8" :xs="24">
              <el-form-item label="商户号：" prop="merchantNo">
                <el-input v-model="searchFormModel.merchantNo" placeholder="请输入商户号" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :xs="24">
              <el-form-item label="商户号2：" prop="merchantNo">
                <el-input v-model="searchFormModel.merchantNo" placeholder="请输入商户号" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :xs="24">
              <el-form-item label="商户号3：" prop="merchantNo">
                <el-input v-model="searchFormModel.merchantNo" placeholder="请输入商户号" clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </SearchBox>
      <div class="table-main card">
        <template>
          <div class="table-wrapper">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              @click="OpenForm($t('button.create'))"
              >{{ $t("button.create") }}</el-button
            >

            <el-button type="primary" size="small" @click="skipPageMap('home')"
              >路由字典跳转【首页】</el-button
            >
          </div>
          <el-table v-loading="loading" :data="list" border>
            <el-table-column fixed type="index" label="序号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名字" width="150" align="center"> </el-table-column>
            <el-table-column prop="phone" label="手机号码" min-width="150" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150" align="center">
            </el-table-column>
            <el-table-column fixed="right" :label="$t('table.operate')" width="200" align="center">
              <template slot-scope="{ row }">
                <div class="table-action">
                  <span @click="handleOnAction(row, 'view')">{{ $t("button.view") }}</span>
                  <span @click="handleOnAction(row, 'edit')">{{ $t("button.edit") }}</span>
                  <el-popconfirm
                    :title="$t('table.deleteInfo')"
                    icon="el-icon-info"
                    icon-color="red"
                    @confirm="handleOnDelete(row.id)"
                  >
                    <span slot="reference">{{ $t("button.delete") }}</span>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="pagination-main">
          <Pagination :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" :total="total" />
        </div>
      </div>
    </div>
    <PageForm ref="CreateEditForm"></PageForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from "vue";
import { getUserInfo, getUserInfoTest } from "@/api/users";
import { getTable } from "@/api/table";

import { useElTable, useElForm, useRouter, PageLang } from "@/hooks/index";
import SearchBox from "@/components/SearchBox/index.vue";
import Pagination from "@/components/Pagination/index.vue";
// import ElDrawer from "@/components/Drawer/index.vue";
import PageForm from "./components/form.vue";

// 初始表单
const searchInitialForm = {
  businessId: "",
  merchantNo: "",
  isEnable: "",
  dateRange: ["", ""],
};

export default defineComponent({
  name: "Table",
  components: {
    SearchBox,
    Pagination,
    PageForm,
  },
  setup() {
    // 页面信息
    const { skipPageMap } = useRouter();
    // 翻译
    const { Lang } = PageLang();
    // 表单搜索
    const {
      elForm: searchForm,
      formModel: searchFormModel,
      resetFields: searchResetFields,
    } = useElForm(searchInitialForm);
    const { state, getTableListData, resetState } = useElTable(
      () =>
        new Promise((resolve, reject) => {
          getTable()
            .then((res) => {
              resolve({
                count:2,
                ...res.data
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
    );

    // 搜索参数
    const searchFormvalue = () => {
      return {};
    };

    // const enter;
    onMounted(async () => {
      // getPageviews();
      await getTableListData();
    });

    // 表单搜索
    const handleOnSearch = () => {
      getTableListData();
    };
    // 刷新
    const handleOnRefresh = () => {
      searchResetFields();
      resetState();
    };
    const handleOnExportExcel = () => {
      // TODO 表格导出
    };

    // 打开 表单(新增、查看、编辑)
    const CreateEditForm: IProps = ref();
    const OpenForm = (title: string, rowData: Partial<any> = {}) => {
      let params = {
        title,
        rowData: { ...rowData },
        isView: title === Lang("button.view"), //"查看",
        // getTableList: CreateEditForm.value.getTableList,
      };
      console.log("PAGEparams: ", params);

      CreateEditForm.value.acceptParams(params);
    };
    const handleOnAction = (row: IProps, type: string) => {
      if (type === "edit") {
        OpenForm(String(Lang("button.edit")), row);
      }
    };
    return {
      searchForm,
      searchFormModel,
      searchResetFields,
      handleOnSearch,
      handleOnRefresh,
      handleOnExportExcel,
      ...toRefs(state),
      CreateEditForm,
      OpenForm,
      handleOnAction,
      skipPageMap,
    };
  },
});
</script>

<style lang="scss" scoped></style>
