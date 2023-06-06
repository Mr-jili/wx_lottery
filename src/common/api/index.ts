import http from "./request"

// 登录 source 1 是后台区分后台管理系统与小程序
export const setLogin = (params: Record<string, any>) => {
    return http.post("/login", { ...params, source: 1 })
}

// 注册用户
export const setRegister = (params: Record<string, any>) => {
    return http.post("/register", params)
}

// 修改用户信息
export const updateUserInfo = (params: Record<string, any>) => {
    return http.put("/system/user/profile", params)
}

// 修改密码
export const updatePassword = (params: Record<string, any>) => {
    return http.put("/system/user/profile/updatePwd", params)
}

// 摇号
export const setLottery = (params: Record<string, any>) => {
    return http.get(`/lottery/${params.num}/${params.type}/${params.customerName}`)
}

// 历史记录
export const getHistoryList = (params: Record<string, any>) => {
    return http.get("/lottery/history/list", params)
}

// 查询公司列表
export const getCompanyList = (params: Record<string, any>) => {
    return http.get("/lottery/company/list", { ...params, isDelete: 1 })
}
