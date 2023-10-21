import request from "@/utils/request/request";

export const GetMyInfo = () => {
  return request({
     url:'/myinfo',
     method:'GET',
  })
}