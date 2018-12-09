import { get, post } from "@/utils/request"

const api = {}
const baseUrl = 'https://feedback.wentianlin.cn/api.php'

// 获取问题分类
api.getTags = (params) => get(`${baseUrl}/feedback/gettags`, params)
// 获取所有反馈
api.getFeedback = (params) => get(`${baseUrl}/feedback/getFeedbacks`, params)
// (取消)支持
api.changeSupport = (params) => get(`${baseUrl}/feedback/support`, params)
// 获取某个反馈的所有评论
api.getComments = (params) => get(`${baseUrl}/feedback/getComments`, params)
// 添加评论
api.addComment = (params) => post(`${baseUrl}/feedback/addComment`, params)
// 搜索
api.search = (params) => get(`${baseUrl}/search/search`, params)


export default api