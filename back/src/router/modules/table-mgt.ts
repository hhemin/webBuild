import routesMap from "@/router/map";
import { IRouter } from "../types";

const tableRouter: IRouter = {
  path: "/table-mgt",
  component: routesMap["tableManagement"],
  name: "tableManagement",
  redirect: "/table-mgt/table/list",
  meta: {
    title: "table",
    icon: "table",
    noCache: true,
  },
  children: [
    {
      path: "table",
      component: routesMap["TableSetUp"],
      redirect: "/table-mgt/table/list",
      name: "TableSetUp",
      children: [
        {
          path: "list",
          component: routesMap["TableList"],
          name: "TableList",
          meta: {
            title: "表格",
            noCache: true,
          },
        },
      ],
    },
  ],
};

export default tableRouter;
