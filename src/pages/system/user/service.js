import request from '@/utils/request';

export async function queryUser(params) {
  return request('/api/sys/user/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}
export async function removeUser(params) {
  return request('/api/sys/user/removeUser', {
    method: 'DELETE',
    data: { ...params },
  });
}
export async function addUser(params) {
  return request('/api/sys/user/addUser', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateUser(params) {
  return request('/api/sys/user/updateUser', {
    method: 'PUT',
    data: { ...params },
  });
}
