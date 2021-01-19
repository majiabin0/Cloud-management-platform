import request from '@/utils/request'
// 分页查询
export function workReportList(query) {
  return request({
    url: '/business/workReport/list',
    method: 'get',
    params: query
  })
}

// 权限
export function getRecentVisible(query) {
  return request({
    url: '/business/workReport/getRecentVisible',
    method: 'get',
    params: query
  })
}
// 详情
export function workReportDetail(guid) {
  return request({
    url: '/business/workReport/'+guid,
    method: 'get',
    // params: query
  })
}

// 删除
export function delItem(guids) {
  return request({
    url: '/business/workReport/'+guids,
    method: 'delete',
    // params: data
  })
}
// 锁定
export function lockItem(guids) {
  return request({
    url: '/business/workReport/lock/'+guids,
    method: 'get',
  })
}
// 解锁
export function unlockItem(guids) {
  return request({
    url: '/business/workReport/unlock/'+guids,
    method: 'get',
  })
}
// 用户
export function userListData(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}
// 组织
export function treeselect(query) {
  return request({
    url: '/system/dept/treeselect',
    method: 'get',
    params: query
  })
}
// 群组
export function roleList(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}
// search
export function search(query) {
  return request({
    url: '/business/workReport/searchAll',
    method: 'get',
    params: query
  })
}
// 群组
export function getNameById(query) {
  return request({
    url: '/business/workReport/getNameById',
    method: 'get',
    params: query
  })
}
// 群组
export function workReport(query) {
  return request({
    url: '/business/workReport',
    method: 'post',
    data: query
  })
}



