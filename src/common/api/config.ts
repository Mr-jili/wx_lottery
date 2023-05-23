

// 图片上传地址
// 正式
export const ccpBaseUrl = 'https://ccp.hosjoy.com/'
// 测试
// export const ccpBaseUrl = 'https://ccp-test.hosjoy.com/'


let baseUrl: string = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://iot-test.hosjoy.com/'
    // baseUrl = 'https://iot.hosjoy.com/'
    break;
  case 'test':
    baseUrl = 'https://iot-test.hosjoy.com/'
    break;
  case 'production':
    baseUrl = 'https://iot.hosjoy.com/'
    // baseUrl = 'https://iot-test.hosjoy.com/'
    break;
  default:
    baseUrl = 'https://iot-test.hosjoy.com/'
    break;
}

export default baseUrl
