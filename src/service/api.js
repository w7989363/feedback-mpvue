import { get, post } from "@/utils/request"

const api = {}
const baseUrl = 'https://feedback.wentianlin.cn/api.php'

api.getTags = (params) => get(`${baseUrl}/feedback/gettags`, params)
api.getFeedback = (params) => get(`${baseUrl}/feedback/getFeedbacks`, params)
api.changeSupport = (params) => get(`${baseUrl}/feedback/support`, params)
api.getComments = (params) => get(`${baseUrl}/feedback/getComments`, params)
api.addComment = (params) => post(`${baseUrl}/feedback/addComment`, params)


export default api