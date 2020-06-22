import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function getUserNav() {
  return request('/api/auth/user/nav');
}

export async function getUserInfo() {
  return request('/api/auth/user/info');
}