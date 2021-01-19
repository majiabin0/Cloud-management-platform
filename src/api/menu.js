import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}
// 获取路由
export function selectMenuList(query) {
  return request({
    url: '/system/menu/selectMenuList',
    method: 'get',
    params: query
  })
}
// 获取路由
export function selectFirstMenuList(query) {
  return request({
    url: '/system/menu/selectFirstMenuList',
    method: 'get',
    params: query
  })
}
