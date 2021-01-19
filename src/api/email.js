import request from '@/utils/request' 

export function email (data) {
    return request({
      url: '/system/getPass/checkResetLink',
      method: 'get',
      params: data
    })
  }