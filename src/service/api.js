import { get, post } from "@/utils/request"

const api = {}
const baseUrl = 'https://feedback.wentianlin.cn/api.php'

api.getTags = (params) => get(`${baseUrl}/feedback/gettags`, params)
api.getFeedback = (params) => get(`${baseUrl}/feedback/getfeedback`, params)


export default api