import request from '@/utils/request'
// 分页查询
export function projectlist(query) {
  return request({
    url: '/business/proj/list',
    method: 'get',
    params: query
  })
}
// 取消收藏
export function cancleCollectProj(query) {
  return request({
    url: '/business/proj/cancleCollectProj',
    method: 'get',
    params: query
  })
}
// 收藏
export function collectProj(query) {
  return request({
    url: '/business/proj/collectProj',
    method: 'get',
    params: query
  })
}
// 群收藏
export function collectGroup(query) {
  return request({
    url: '/business/projGroup/collectGroup',
    method: 'get',
    params: query
  })
}
// 群取消收藏
export function cancleCollectGroup(query) {
  return request({
    url: '/business/projGroup/cancleCollectGroup',
    method: 'get',
    params: query
  })
}
// 群取消收藏
export function groupAndProjList(query) {
  return request({
    url: '/business/projGroup/groupAndProjList',
    method: 'get',
    params: query
  })
}
// 新增项目群
export function projGroup(query) {
  return request({
    url: '/business/projGroup',
    method: 'post',
    data: query
  })
}
// 新增项目
export function proj(query) {
  return request({
    url: '/business/proj',
    method: 'post',
    data: query
  })
}
// 封存项目
export function sealedproject(query) {
  return request({
    url: '/business/proj/sealedproject',
    method: 'get',
    params: query
  })
}
// 删除项目群
export function delGroup(data) {
  return request({
    url: '/business/projGroup/'+data,
    method: 'put',
    // params: data
  })
}

// 删除项目群
export function delProj(data) {
  return request({
    url: '/business/proj/'+data,
    method: 'delete',
    // params: data
  })
}
// 分页查询
export function groupList(query) {
  return request({
    url: '/business/projGroup/list',
    method: 'get',
    params: query
  })
}
// 参建单位
export function corpList(query) {
  return request({
    url: '/system/dept/corplist',
    method: 'get',
    params: query
  })
}
// 参建单位
export function userList(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}
// 参建单位
export function listByCompany(query) {
  return request({
    url: '/system/user/listByCompany',
    method: 'get',
    params: query
  })
}
// 解封
export function unsealproject(query) {
  return request({
    url: '/business/proj/unsealproject',
    method: 'get',
    params: query
  })
}

