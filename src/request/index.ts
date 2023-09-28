import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './http_status'

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ContentType =
  | 'application/json;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=UTF-8'
  | 'multipart/form-data'

interface IParams {
  /**
   * 请求接口
   */
  url: string
  /**
   * 传递数据
   */
  data?: object
  /**
   * 数据类型
   */
  contentType?: ContentType
  /**
   * 是否显示loading
   */
  showLoading?: boolean
}

const baseUrlPrefix = process.env.TARO_APP_API
const DEFAULT_CONTENT_TYPE = 'application/json;charset=utf-8'

const request = <T = any>(params: IParams, method: MethodType) => {
  const { url, data, contentType, showLoading } = params
  return new Promise<T>((resolve, reject) => {
    // 请求参数
    const options = { url, data: { ...data }, method, header: {} }

    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = `${baseUrlPrefix}${params.url}`
    }
    // 2. 请求超时, 默认 60s
    options['timeout'] = 5000
    // 3. 添加小程序端请求头标识
    options.header = { 'content-type': contentType || DEFAULT_CONTENT_TYPE }
    // 4. 添加 token 请求头标识
    const token = Taro.getStorageSync('Authorization')
    if (token) {
      options.header['Authorization'] = token
    }

    showLoading &&
      Taro.showLoading({
        title: '正在加载',
      })

    Taro.request({
      url: options.url,
      data: options.data,
      method: options.method,
      header: options.header,
      success: res => {
        // 只要请求成功，不管返回什么状态码，都走这个回调

        console.log('从接口获取到的数据', res)
        showLoading && Taro.hideLoading()

        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return resolve(res.data)
        } else if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return reject({ desc: '请求资源不存在' })
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return reject({ desc: '服务端出现了问题' })
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          // 403禁止访问错误是由于网站内容资源的不可用而导致的
          Taro.setStorageSync('Authorization', '')
          // todo 根据自身业务修改
          Taro.navigateTo({ url: '/pages/login/index' })
          return reject({ desc: '没有权限访问' })
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.setStorageSync('Authorization', '')
          Taro.navigateTo({ url: '/pages/login/index' })
          return reject({ desc: '需要鉴权' })
        } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
          return reject({ desc: '服务器错误' })
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          reject('数据请求错误,请检查')
        }
      },
      // 响应失败
      fail(err) {
        Taro.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

export default request
