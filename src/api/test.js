import request from '@/utils/request'

// 按公司
export function getCompany(searchValue) {
    
    return request({
      url: `/system/dept/treeselect?searchValue=${searchValue}`,
      method: 'get',
     
    })
}


//  按项目
export function getProject(searchValue) {
    
  return request({
    url: `/business/proj/treeselect?searchValue=${searchValue}`,
    method: 'get',
   
  })
}



