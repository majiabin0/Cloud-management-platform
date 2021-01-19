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
// 分页查询
export function groupList(query) {
  return request({
    url: '/business/projGroup/list',
    method: 'get',
    params: query
  })
}
// 查询质量管理模块列表
export function listQuality(query) {
  return request({
    url: '/system/quality/list',
    method: 'get',
    params: query
  })
}

// 查询质量管理模块详细
export function getQuality(userId) {
  return request({
    url: '/system/quality/' + userId,
    method: 'get'
  })
}

// 新增质量管理模块
export function addQuality(data) {
  return request({
    url: '/system/quality',
    method: 'post',
    data: data
  })
}

// 修改质量管理模块
export function updateQuality(data) {
  return request({
    url: '/system/quality',
    method: 'put',
    data: data
  })
}

// 删除质量管理模块
export function delQuality(userId) {
  return request({
    url: '/system/quality/' + userId,
    method: 'delete'
  })
}

// 导出质量管理模块
export function exportQuality(query) {
  return request({
    url: '/system/quality/export',
    method: 'get',
    params: query
  })
}
