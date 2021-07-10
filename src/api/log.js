import request from '@/utils/request'

// 查看所有日志记录
export function getAllLogs() {
  return request('/log')
}

// 模糊搜素日志记录
export function findLog(search, pageNum = 1, pageSize = 10) {
  return request.post('/log?content=' + search + '&pageNum=' + pageNum + '&pageSize=' + pageSize)
}

// 根据操作员搜素日志记录
export function findLogByOperatorId(uid, pageNum = 1, pageSize = 10) {
  return request.post('/log/' + uid + '?pageNum=' + pageNum + '&pageSize=' + pageSize)
}
