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
// 添加反馈
api.addFeedback = (params) => post(`${baseUrl}/feedback/addFeedback`, params)
// 上传图片
api.uploadImg = (params) => post(`${baseUrl}/feedback/uploadimg`, params)
// 删除反馈
api.deleteFeedback = (params) => post(`${baseUrl}/feedback/deleteFeedback`, params)

export default api