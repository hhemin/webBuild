import { reactive, watch } from "vue";
import router from "@/router";
import { Message } from "element-ui";
import Sortable from "sortablejs";
export function useElTable(requestFn?: Function) {
  const state = reactive<IProps>({
    loading: false,
    list: [],
    total: 0,
    listQuery: {
      pageNum: 1,
      pageSize: 10,
    },
    notResetState: false, // 是否 禁止“重置页码”刷新，false页码重置，true不重置
  });

  // 获取表格列表数据
  async function getTableListData() {
    if (requestFn && typeof requestFn === "function") {
      state.loading = true;

      requestFn()
        .then(({ count, items }: IProps) => {
          state.total = count;
          state.list = items;
        })
        .catch(({ code, message }: IProps) => {
          state.total = 0;
          state.list = [];

          code && message && Message.error(message);
        })
        .finally(() => {
          setTimeout(() => {
            state.loading = false;
          }, 800);
        });
    }
  }

  watch(state.listQuery, () => {
    getTableListData();
  });

  // 处理刷新列表特殊问题
  function onRefreshList(notResetState?: boolean) {
    // notResetState：默认为false，作用是否需要刷新时候重新加载
    // notResetState 需要为true，则resetState() 方法不能调用，则不会重置到第一页，只刷新当前页码
    state.notResetState = notResetState || false;
    /**
     * 目的解决watch监听执行getTableListData方法出现2次加载和不加载问题
     * 原因：
     * state.listQuery.pageNum === 2时候，上面watch监听“state.listQuery”会执行；以前写法会出现连续执行2次加载"getTableListData"方法；
     * 当tate.listQuery.pageNum === 1时候，watch监听里面方法不执行，导致“getTableListData”方法没执行
     * */
    if (state.listQuery.pageNum === 1 || state.notResetState) {
      setTimeout(() => {
        getTableListData();
      }, 0);
    }
  }

  /**
   * 重置状态刷新列表
   * notResetState 为true则页码不重置，false重置，默认false
   * */
  function resetState(notResetState?: boolean) {
    onRefreshList(notResetState); // 处理特殊情况刷新
    if (!state.notResetState) {
      state.listQuery.pageNum = 1;
      state.listQuery.pageSize = 10;
    }
  }

  // 更新启用状态，isEnable存在Boolean类型或者Number类型
  function switchEnableStatus(requestFn: Function, { id, isEnable, index, msg = "启用" }: IProps) {
    const status = isEnable ? 1 : 0;

    requestFn(id, status)
      .then(() => {
        const message = isEnable ? `${msg}状态已开启` : `${msg}状态已禁用`;
        Message.success(message);
      })
      .catch((err: any) => {
        setTimeout(() => {
          Message.error(err.message || "启用状态更新失败，请重试！");

          // 回滚状态
          if (typeof isEnable === "boolean") {
            state.list[index].isEnable = !isEnable;
          } else if (typeof isEnable === "number") {
            if (isEnable === 1) {
              state.list[index].isEnable = 0;
            }

            if (isEnable === 0) {
              state.list[index].isEnable = 1;
            }
          }
        }, 300);
      });
  }

  // 行拖拽，排序
  function rowDrop(requestFn: Function, el?: HTMLElement) {
    el = el || (document.querySelector(".el-table__body-wrapper tbody") as HTMLElement);
    Sortable.create(el, {
      animation: 150,
      onEnd({ newIndex, oldIndex }: any) {
        if (newIndex === oldIndex) return;
        // 拖拽完成
        requestFn({
          sourceId: (state.list[oldIndex] as any).id,
          targetId: (state.list[newIndex] as any).id,
        }).finally(() => {
          const currRow = state.list.splice(oldIndex, 1)[0];
          state.list.splice(newIndex, 0, currRow);

          getTableListData();
        });
      },
    });
  }

  return {
    state,
    getTableListData,
    resetState,
    switchEnableStatus,
    rowDrop,
  };
}
