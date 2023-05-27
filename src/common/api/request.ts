import baseUrl from './config'
import Taro from '@tarojs/taro'

type Method = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined

const HTTP_STATUS = {
  SUCCESS: 200,
  ERROR_MESSAGE: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  NO_AUT: 401 // token失效
}

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams
  Taro.showLoading({
    title: '加载中',
  })
  return chain.proceed(requestParams).then(res => {
    Taro.hideLoading()
    const { code, msg } = res.data 
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (code !== HTTP_STATUS.SUCCESS) {
      Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    }
    if (code === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject({ desc: '请求资源不存在' })
    } else if (code === HTTP_STATUS.ERROR_MESSAGE) {
      return Promise.reject({ desc: "请求错误" })
    } else if (code === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject({ desc: "服务端出现了问题" })
    } else if (code === HTTP_STATUS.SERVER_ERROR) {
      return Promise.reject({ desc: "服务器错误" });
    } else if (code === HTTP_STATUS.SUCCESS) {
      return res
    } else if (code === HTTP_STATUS.NO_AUT) {
      Taro.redirectTo({
        url: '/pages/login/index'
      })
      return Promise.reject({ desc: "token失效" });
    }
  }, error => {
    Taro.hideLoading()
    Taro.showToast({
      title: '哎呀～出现问题了',
      icon: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  })
}
Taro.addInterceptor(customInterceptor)

class Request {
  public headers: Set<Record<string, string>> = new Set()

  option(url: string, method: Method, params?: Record<string, any>) {
    // 通过在这里增加this.headers 来增加一些固定的header 例如 token 之类的数据
    const token = Taro.getStorageSync('token')
    if (token) {
      this.headers.add({
        Authorization: 'Bearer' + ' ' + token
      })
    }
    let header = {
      'content-type': 'application/json'
    }
    if (this.headers) {
      // 动态增加header 可以在这里增加
      this.headers.forEach(head => {
        header = { ...header, ...head }
      })
    }
    return Taro.request({
      url: baseUrl + url,
      data: params,
      method: method,
      timeout: 50000, // 超时时间
      header
    })
  }

  get(url: string, params?: Record<string, any>) {
    return this.option(url, 'GET', params)
  }

  post(url: string, params?: Record<string, any>) {
    return this.option(url, 'POST', params)
  }

  put(url: string, params?: Record<string, any>) {
    this.option(url, 'PUT', params)
  }

  delete(url: string, params?: Record<string, any>) {
    this.option(url, 'DELETE', params)
  }
}

export default new Request
