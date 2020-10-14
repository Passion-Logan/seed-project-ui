import request from '@/utils/request';

export async function queryRole(params) {
  return request('/api/sys/role/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}
export async function removeRole(params) {
  return request('/api/sys/role/removeRole', {
    method: 'DELETE',
    data: { ...params },
  });
}
export async function addRole(params) {
  return request('/api/sys/role/addRole', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateRole(params) {
  return request('/api/sys/role/updateRole', {
    method: 'PUT',
    data: { ...params },
  });
}
// export async function updatePassword(params) {
//   return request('/api/sys/user/updatePassword', {
//     params,
//   });
// }
