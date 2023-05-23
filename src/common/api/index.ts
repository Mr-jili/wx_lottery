import http from "./request"

// 登录
export const setLogin = (params: Record<string, any>) => {
    return http.post("/login", params)
}

// 摇号
export const setLottery = (params: Record<string, any>) => {
    return http.get(`/lottery/${params.num}/${params.type}`)
}

// 历史记录
export const getHistoryList = (params: Record<string, any>) => {
    return http.get("/lottery/history/list", params)
}

// 查询公司列表
export const getCompanyList = (params: Record<string, any>) => {
    return http.get("/lottery/company/list", params)
}