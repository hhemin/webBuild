import request from "@/utils/request/request";

export const GetProjectList = () => {
  return request({
     url:'/project/list',
     method:'GET',
  },
  // {
  //   baseURL:'https://www.baidu.com'
  // }
  )
}

export const GetProjectError = () => {
  return request({
     url:'/project/list/error',
     method:'GET',
  })
}