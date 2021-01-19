import request from '@/utils/request'

export function resetPassword(data) {
    return request({
      url: '/system/getPass/resetPass',
      method: 'get',
      params: data
    })
  }