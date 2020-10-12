import request from '@/utils/request';

export async function queryRole(params) {
  return request('/api/sys/role/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}
// export async function removeUser(params) {
//   return request('/api/sys/user/removeUser', {
//     method: 'DELETE',
//     data: { ...params },
//   });
// }
// export async function addUser(params) {
//   return request('/api/sys/user/addUser', {
//     method: 'POST',
//     data: { ...params },
//   });
// }
// export async function updateUser(params) {
//   return request('/api/sys/user/updateUser', {
//     method: 'PUT',
//     data: { ...params },
//   });
// }
// export async function updatePassword(params) {
//   return request('/api/sys/user/updatePassword', {
//     params,
//   });
// }
