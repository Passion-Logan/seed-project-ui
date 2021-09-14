import request from '@/utils/request';

export async function getLogList(params) {
  return request('/api/sys/log/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}