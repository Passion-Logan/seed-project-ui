import request from '@/utils/request';

export async function getLogList(params) {
  return request('/api/sys/log/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}

export async function getLoginLogList(params) {
  return request('/api/sys/log/getPageLoginList', {
    method: 'POST',
    data: { ...params },
  });
}