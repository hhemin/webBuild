import request from "@/utils/request";

export const getTable = () =>
  request(
    {
      url: "/table",
      method: "get",
    },
    {
      screen_loading: true,
    }
  );
