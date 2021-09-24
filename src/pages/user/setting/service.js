import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/accountSettingCurrentUser');
}
export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
export async function getUserInfo() {
  return request('/api/auth/user/getInfo');
}

export async function updateUserInfo(params) {
  return request('/api/auth/user/updateUser', {
    method: 'POST',
    data: params,
  });
}

export async function uploadAvatar(params) {
  return request('/api/auth/user/uploadAvatar', {
    method: 'POST',
    body: params,
  });
}

export async function updatePwd(params) {
  return request('/api/auth/user/updatePwd', {
    method: 'POST',
    body: params,
  });
}