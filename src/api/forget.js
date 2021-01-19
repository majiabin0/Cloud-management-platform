import request from '@/utils/request'

export function forgetPassword(data) {
    return request({
      url: '/system/getPass/SendMail',
      method: 'get',
      params: data
    })
  }
