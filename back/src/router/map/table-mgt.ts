const CommonIndex = () => import("@/views/table/index.vue");

// 加油卡充值配置
const TableMap = {
  TableSetUp: CommonIndex,
  TableList: () => import("@/views/table/tableList/index.vue"),
};

// 商品管理菜单路由映射
const TableRouterMap = {
  tableManagement: () => import("@/layout/index.vue"),
  ...TableMap,
};

export default TableRouterMap;
