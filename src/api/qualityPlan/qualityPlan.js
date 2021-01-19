import request from '@/utils/request'
// 分页查询
export function planList(query) {
  return request({
    url: '/business/plan/list',
    method: 'get',
    params: query
  })
}
// 新增
export function addPlan(query) {
  return request({
    url: '/business/plan',
    method: 'post',
    data: query
  })
}
// 修改
export function changePlan(query) {
  return request({
    url: '/business/plan',
    method: 'put',
    data: query
  })
}
// 详情页数据
export function qualityPlanDetail(data) {
  console.log(data,'data')
  return request({
    url: '/business/plan/'+data,
    method: 'get',
  })
}
// 删除
export function delItem(guids) {
  return request({
    url: 'business/plan/'+guids,
    method: 'delete',
    // params: data
  })
}
// 处理任务
export function complete(query) {
  return request({
    url: '/business/plan/complete',
    method: 'post',
    data: query
  })
}
// // 多图上传
// export function addAttachs(query) {
//   console.log(query,'query')
//   return request({
//     url: '/system/sysAttach/addAttachs',
//     method: 'post',
//     data: query,
//   })
// }
// // 获取新增数据
// export function getRecentPerson(query) {
//   return request({
//     url: '/business/quality/getRecentPerson',
//     method: 'get',
//     params: query
//   })
// }
// // 获取新增数据
// export function userList(query) {
//   return request({
//     url: '/system/user/list',
//     method: 'get',
//     params: query
//   })
// }
//
