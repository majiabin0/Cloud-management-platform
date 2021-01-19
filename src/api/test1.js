import request from '@/utils/request'

// 按公司
export function getCompany(searchValue,groupId) {
  return request({
      url: `/system/dept/treeselect`,
      method: 'get',
      params:{
        searchValue:searchValue,
        groupId:groupId
    }
   
  })
}


//  按项目
export function getProject(searchValue,groupId) {
  return request({
      url: `/business/proj/treeselect`,
      method: 'get',
      params:{
          searchValue:searchValue,
          groupId:groupId
      }
})
}
