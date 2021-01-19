import request from '@/utils/request'
// 分页查询
export function qualityList(query) {
  return request({
    url: '/business/quality/list',
    method: 'get',
    params: query
  })
}
// 新增项目群
export function quality(query) {
  return request({
    url: '/business/quality',
    method: 'post',
    data: query
  })
}
// 详情页数据
export function qualityDetail(data) {
  console.log(data,'data')
  return request({
    url: '/business/quality/'+data,
    method: 'get',
  })
}
// 删除
export function delItem(projId,guids) {
  return request({
    url: 'business/quality/'+projId+'/'+guids,
    method: 'delete',
    // params: data
  })
}
// 处理任务
export function complete(query) {
  return request({
    url: '/business/quality/complete',
    method: 'post',
    data: query
  })
}
// 多图上传
export function addAttachs(query) {
  console.log(query,'query')
  return request({
    url: '/system/sysAttach/addAttachs',
    method: 'post',
    data: query,
  })
}
// 获取新增数据
export function getRecentPerson(query) {
  return request({
    url: '/business/quality/getRecentPerson',
    method: 'get',
    params: query
  })
}
// 获取新增数据
export function userList(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}
// echarts
export function getCountByType(query) {
  return request({
    url: '/business/quality/getCountByType',
    method: 'get',
    params: query
  })
}
// echarts
export function getCountByLevel(query) {
  return request({
    url: '/business/quality/getCountByLevel',
    method: 'get',
    params: query
  })
}
// echarts
export function getCountByWeek(query) {
  return request({
    url: '/business/quality/getCountByWeek',
    method: 'get',
    params: query
  })
}
// echarts
export function getCountByMonth(query) {
  return request({
    url: '/business/quality/getCountByMonth',
    method: 'get',
    params: query
  })
}
// 事件数量
export function getQualityCount(query) {
  return request({
    url: '/business/quality/getQualityCount',
    method: 'get',
    params: query
  })
}


