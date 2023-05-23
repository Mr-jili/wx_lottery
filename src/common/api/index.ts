import http from "./request"

// 判断手机号是否是服务人员
export const queryPhoneIsVaild = (params: Record<string, any>) => {
    return http.get("ccs/applet/work-order-login/" + params.phone)
}